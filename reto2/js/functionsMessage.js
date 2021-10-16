$(document).ready(initializeEvents);

function initializeEvents() {
  $("#create-message").on("click", createFormMessage);
  $("#list-message").on("click", listMessages);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function createFormMessage() {
  const messageForm = `
    <form class="messageForm">
      <div class="form-group">
        <label for="message" class="form-label">Mensaje</label>
        <textarea cols="2" rows="2" maxlength="4000" minlength="1" class="form-control" id="message" placeholder="Escribe algo"></textarea>
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(messageForm);
  $(".messageForm").on("submit", createMessage);
}

function listMessages() {
  const messageTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Mensaje</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody class="messagesBody"></tbody>
    </table>`;
  drawContent(messageTable);
  getMessages();
}

function drawContent(element) {
  $(".canvas").html(element);
}

function drawMessages(data) {
  let messagesBody = $(".messagesBody");
  messagesBody.html("");

  let messages = data.items;
  messages.forEach((message) => {
    let dato = `
      <tr>
        <td>${message.id}</td>
        <td>${message.messagetext}</td>
        <td class="actionButtons">
          <button id="edit-${message.id}" class="btn btn-warning">Editar</button>
          <button id="delete-${message.id}" class="btn btn-danger deleteMessage">Eliminar</button>
        </td>
      </tr>
    `;
    messagesBody.append(dato);
    addEvents(message);
  });
}

function addEvents(message) {
  buttonEdit = document.getElementById("edit-" + message.id);
  buttonDelete = document.getElementById("delete-" + message.id);
  buttonEdit.addEventListener("click", drawEdit);
  buttonDelete.addEventListener("click", deleteMessage);
}

async function drawEdit(event) {
  let id = event.srcElement.id.split("-")[1];
  let modal = $(".modal");
  modal.css("display", "contents");
  let dataMessage = await getMessage(id);
  let modalBody = $(".modal-body");
  let bodyMessage = `
    <form class="updateMessageForm">
      <div class="form-group">
        <label for="updatedMessage" class="form-label">Mensaje</label>
        <textarea cols="2" rows="2" maxlength="4000" minlength="1" class="form-control" id="updatedMessage">${dataMessage.messagetext}</textarea>
      </div>
      <button id="${dataMessage.id}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyMessage);
  $(".updateMessageForm").on("submit", updateMessage);
}

function hideModal() {
  $(".modal").css("display", "none");
}
