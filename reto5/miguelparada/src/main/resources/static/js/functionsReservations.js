$(document).ready(initializeEvents);

function initializeEvents() {
  $("#create-reservation").on("click", createFormReservation);
  $("#list-reservation").on("click", listReservations);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function createFormReservation() {
  const reservationForm = `
    <form class="reservationForm">
      <div class="form-group">
        <label for="dateSelect" class="form-label">Fecha Inicio</label>
        <input type="date" id="dateSelect" class="form-select"/>
      </div>
      <div class="form-group">
        <label for="devolutionDateSelect" class="form-label">Fecha Devolución</label>
        <input type="date" id="devolutionDateSelect" class="form-select"/>
      </div>
      <div class="form-group">
        <label for="clientSelect" class="form-label">Cliente</label>
        <select id="clientSelect" class="form-select"></select>
      </div>
      <div class="form-group">
        <label for="computerSelect" class="form-label">Computador</label>
        <select id="computerSelect" class="form-select"></select>
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(reservationForm);
  getComputerOptions();
  getClientOptions();
  $(".reservationForm").on("submit", createReservation);
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

function listReservations() {
  const reservationTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha Inicio</th>
                <th scope="col">Fecha Devolución</th>
                <th scope="col">Computador</th>
                <th scope="col">Categoría Computador</th>
                <th scope="col">Cliente</th>
                <th scope="col">Mensajes Cliente</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody class="reservationsBody"></tbody>
    </table>`;
  drawContent(reservationTable);
  getReservations();
}

function drawContent(element) {
  $(".canvas").html(element);
}

function drawReservations(data) {
  let reservationsBody = $(".reservationsBody");
  reservationsBody.html("");

  data.forEach((reservation) => {
    let dato = `
      <tr>
        <td>${reservation.idReservation}</td>
        <td>${reservation.startDate}</td>
        <td>${reservation.devolutionDate}</td>
        <td>${reservation.computer.brand + " " + reservation.computer.name}</td>
        <td>${reservation.computer.category.name}</td>
        <td>${reservation.client.name}</td>
        <td id="computerMessages"></td>
        <td>${reservation.status}</td>
        <td class="actionButtons">
          <button id="edit-${
            reservation.idReservation
          }" class="btn btn-warning">Editar</button>
          <button id="delete-${
            reservation.idReservation
          }" class="btn btn-danger deleteReservation">Eliminar</button>
        </td>
      </tr>
    `;
    reservationsBody.append(dato);
    addComputerMessages(reservation.computer.messages);
    addEvents(reservation);
  });
}

function addComputerMessages(messages) {
  let computerMessages = $("#computerMessages");
  if (messages.length > 0) {
    messages.forEach((message) => {
      computerMessages.append(message.messageText);
    });
  } else {
    computerMessages.append("No hay mensajes asociados");
  }
}

function addEvents(reservation) {
  buttonEdit = document.getElementById("edit-" + reservation.idReservation);
  buttonDelete = document.getElementById("delete-" + reservation.idReservation);
  buttonEdit.addEventListener("click", drawEdit);
  buttonDelete.addEventListener("click", deleteReservation);
}

async function drawEdit(event) {
  let id = event.srcElement.id.split("-")[1];
  let modal = $(".modal");
  modal.css("display", "contents");
  let dataReservation = await getReservation(id);
  dataReservation.startDate = dataReservation.startDate.split("T")[0];
  dataReservation.devolutionDate = dataReservation.devolutionDate.split("T")[0];

  let modalBody = $(".modal-body");
  let bodyReservation = `
    <form class="updateReservationForm">
      <div class="form-group">
        <label for="updatedDateSelect" class="form-label">Fecha Inicio</label>
        <input type="date" id="updatedDateSelect" class="form-select" value="${dataReservation.startDate}"/>
      </div>
      <div class="form-group">
        <label for="updatedDevolutionDateSelect" class="form-label">Fecha Devolución</label>
        <input type="date" id="updatedDevolutionDateSelect" class="form-select" value="${dataReservation.devolutionDate}"/>
      </div>
      <div class="form-group">
        <label for="updatedStatus" class="form-label">Estado</label>
        <select type="date" id="updatedStatus" class="form-select">
          <option value="Programado">Programado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Realizado">Realizado</option>
        </select>
      </div>
      <button id="${dataReservation.idReservation}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyReservation);
  $(".updateReservationForm").on("submit", updateReservation);
}

function hideModal() {
  $(".modal").css("display", "none");
}
