$(document).ready(initializeEvents);

function initializeEvents() {
  $("#create-client").on("click", createFormClient);
  $("#list-client").on("click", listClients);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function createFormClient() {
  const clientForm = `
    <form class="clientForm">
      <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" maxlength="250" class="form-control" id="name" placeholder="Miguel">
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" maxlength="45" pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}" class="form-control" id="email" placeholder="name@example.com">
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Escribe tu contraseña">
      </div>
      <div class="form-group">
        <label for="age" class="form-label">Edad</label>
        <input type="number" class="form-control" id="age" placeholder="22">
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(clientForm);
  $(".clientForm").on("submit", createClient);
}

function listClients() {
  const clientTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Edad</th>
                <th scope="col">Mensajes</th>
                <th scope="col">Reservaciones</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody class="clientsBody"></tbody>
    </table>`;
  drawContent(clientTable);
  getClients();
}

function drawContent(element) {
  $(".canvas").html(element);
}

function drawClients(data) {
  let clientsBody = $(".clientsBody");
  clientsBody.html("");

  let clients = data;
  clients.forEach((client) => {
    let dato = `
      <tr>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.age}</td>
        <td id="messagesList"></td>
        <td id="reservationList"></td>
        <td class="actionButtons">
          <button id="edit-${client.idClient}" class="btn btn-warning">Editar</button>
          <button id="delete-${client.idClient}" class="btn btn-danger deleteClient">Eliminar</button>
        </td>
      </tr>
    `;

    clientsBody.append(dato);
    drawClientMessageAndReservations(client);
    addEvents(client);
  });
}

function drawClientMessageAndReservations(client) {
  let messagesList = $("#messagesList");
  let reservationsList = $("#reservationList");
  if (client.messages.length > 0) {
    client.messages.forEach((message) => {
      messagesList.append(message.messageText);
    });
  } else {
    messagesList.append("No hay mensajes asociados");
  }

  if (client.reservations.length > 0) {
    client.reservations.forEach((reservation) => {
      console.log(reservation);
      reservationsList.append(
        client.name +
          "<br/>" +
          reservation.computer.brand +
          " " +
          reservation.computer.name
      );
    });
  } else {
    reservationsList.append("No hay reservas asociados");
  }
}

function addEvents(client) {
  buttonEdit = document.getElementById("edit-" + client.idClient);
  buttonDelete = document.getElementById("delete-" + client.idClient);
  buttonEdit.addEventListener("click", drawEdit);
  buttonDelete.addEventListener("click", deleteClient);
}

async function drawEdit(event) {
  let id = event.srcElement.id.split("-")[1];
  let modal = $(".modal");
  modal.css("display", "contents");
  let dataClient = await getClient(id);
  let modalBody = $(".modal-body");
  let bodyClient = `
    <form class="updateClientForm">
      <div class="form-group">
        <label for="updatedName" class="form-label">Nombre</label>
        <input type="text" maxlength="250" class="form-control" id="updatedName" value="${dataClient.name}">
      </div>
      <div class="form-group">
        <label for="updatedPassword" class="form-label">Contraseña</label>
        <input type="password" maxlength="45" class="form-control" id="updatedPassword" value="${dataClient.password}">
      </div>
      <div class="form-group">
        <label for="updatedAge" class="form-label">Edad</label>
        <input type="number" class="form-control" id="updatedAge" value="${dataClient.age}">
      </div>
      <button id="${dataClient.idClient}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyClient);
  $(".updateClientForm").on("submit", updateClient);
}

function hideModal() {
  $(".modal").css("display", "none");
}
