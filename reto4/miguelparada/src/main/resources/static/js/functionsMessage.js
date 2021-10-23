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
        <label for="computerSelect" class="form-label">Computador</label>
        <select id="computerSelect" class="form-select"></select>
      </div>
      <div class="form-group">
        <label for="message" class="form-label">Mensaje</label>
        <textarea cols="2" rows="2" maxlength="250" minlength="1" class="form-control" id="message" placeholder="Escribe algo"></textarea>
      </div>
      <div class="form-group">
        <label for="clientSelect" class="form-label">Cliente</label>
        <select id="clientSelect" class="form-select"></select>
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(messageForm);
  getComputerOptions();
  getClientOptions();
  $(".messageForm").on("submit", createMessage);
}

function drawClientOptions(data) {
  let clientSelect = $("#clientSelect");
  clientSelect.html("");

  if (data.length !== 0) {
    clientSelect.append("<option value=''>Seleccione un cliente</option>");
    data.forEach((client) => {
      let dato = `
        <option value="${client.idClient}">${client.name}</option>
      `;
      clientSelect.append(dato);
    });
  } else {
    clientSelect.append(
      "<option value=''>Es necesario crear un cliente</option>"
    );
  }
  clientSelect.val(clientSelect.attr("value"));
}

function drawComputerOptions(data) {
  let computerSelect = $("#computerSelect");
  computerSelect.html("");

  if (data.length !== 0) {
    computerSelect.append("<option value=''>Seleccione un computador</option>");
    data.forEach((computer) => {
      let dato = `
        <option value="${computer.id}">${
        computer.brand + " " + computer.name
      }</option>
      `;
      computerSelect.append(dato);
    });
  } else {
    computerSelect.append(
      "<option value=''>Es necesario crear un computador</option>"
    );
  }
}

function listMessages() {
  const messageTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Mensaje</th>
                <th scope="col">Computador</th>
                <th scope="col">Cliente</th>
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

  data.forEach((message) => {
    let dato = `
      <tr>
        <td>${message.messageText}</td>
        <td>${message.computer.brand + " " + message.computer.name}</td>
        <td>${message.client.name}</td>
        <td class="actionButtons">
          <button id="edit-${
            message.idMessage
          }" class="btn btn-warning">Editar</button>
          <button id="delete-${
            message.idMessage
          }" class="btn btn-danger deleteMessage">Eliminar</button>
        </td>
      </tr>
    `;
    messagesBody.append(dato);
    addEvents(message);
  });
}

function addEvents(message) {
  buttonEdit = document.getElementById("edit-" + message.idMessage);
  buttonDelete = document.getElementById("delete-" + message.idMessage);
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
        <textarea cols="2" rows="2" maxlength="4000" minlength="1" class="form-control" id="updatedMessage">${dataMessage.messageText}</textarea>
      </div>
      <div class="form-group">
        <label for="clientSelect" class="form-label">Cliente</label>
        <select id="clientSelect" class="form-select" value="${dataMessage.client.idClient}"></select>
      </div>
      <button id="${dataMessage.idMessage}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyMessage);
  getClientOptions();
  $(".updateMessageForm").on("submit", updateMessage);
}

function hideModal() {
  $(".modal").css("display", "none");
}
