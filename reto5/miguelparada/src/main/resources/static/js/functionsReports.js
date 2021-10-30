$(document).ready(initializeEvents);

function initializeEvents() {
  getReservationStatus();
  $("#report-reservations").on("click", drawReports);
  $("#report-client").on("click", getTopClients);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function drawStatus(data) {
  $(".completedReservations").html(data.completed);
  $(".cancelledReservations").html(data.cancelled);
}

function drawReports() {
  const reservationForm = `
    <p>Aquí podrá realizar reportes de reservaciones por fechas</p>
    <form class="form-inline reservationForm">
      <div class="form-group">
        <label for="startDate" class="form-label sr-only">Fecha de Inicio</label>
        <input type="date" class="form-control" id="startDate">
      </div>
      <div class="form-group">
        <label for="endDate" class="form-label sr-only">Fecha Fin</label>
        <input type="date" class="form-control" id="endDate">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-success">Consultar</button>
      </div>
    </form>
    <div class="drawReservations"></div>`;
  drawContent(reservationForm);
  $(".reservationForm").on("submit", getReservationsByDate);
}

function drawReservationsByDate(data, scope = null) {
  if (data.length > 0) {
    const reportTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Fecha Inicio</th>
                <th scope="col">Fecha Devolución</th>
                <th scope="col">Estado</th>
                <th scope="col">Datos del Computador</th>
                <th scope="col">Datos del Cliente</th>
            </tr>
        </thead>
        <tbody class="reportsBody"></tbody>
    </table>`;
    $(".drawReservations").html(reportTable);
    data.map((report) => {
      let row = `
        <tr>
            <td>${report.startDate}</td>
            <td>${report.devolutionDate}</td>
            <td>${report.status}</td>
            <td>
                nombre: ${report.computer.name}
                <br>
                marca: ${report.computer.brand}
                <br>
                año: ${report.computer.year}
                <br>
                descripción: ${report.computer.description}
                <br>
                categoría: ${report.computer.category?.name ?? null}
            </td>
            <td>
                nombre: ${report.client.name}
                <br>
                email: ${report.client.email}
            </td>
        </tr>
        `;
      $(".reportsBody").append(row);
    });
  } else {
    $(".drawReservations").html(
      "No hay reservaciones entre las fechas seleccionadas"
    );
  }
}

function drawContent(element) {
  $(".canvas").html(element);
}

function getTopClients() {
  getClientsReport();
}

function drawTopClients(data) {
  if (data.length > 0) {
    const reportTable = `
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Total Reservas por cliente</th>
                    <th scope="col">Datos del Cliente</th>
                    <th scope="col">Datos de reservas</th>
                </tr>
            </thead>
            <tbody class="reportsClientBody"></tbody>
        </table>`;
    drawContent(reportTable);
    data.map((report) => {
      let row = `
        <tr>
            <td>${report.total}</td>
            <td>
                nombre: ${report.client.name}
                <br>
                email: ${report.client.email}
            </td>
            <td class="reservation-item-${report.total}">
            </td>
        </tr>
        `;
      $(".reportsClientBody").append(row);
      drawReservations(report.client.reservations);
    });
  } else {
    drawContent("<p>Los clientes aún no reservan</p>");
  }
}

function drawReservations(reservations) {
  reservations.map((reservation) => {
    let reserve = `
        <hr/>
        Fecha Inicio: ${reservation.startDate}
        <br>
        Fecha Devolución: ${reservation.devolutionDate}
        <br>
        Datos Computador: ${reservation.computer.name}, ${reservation.computer.brand}, ${reservation.computer.year}
        <br>
        Categoría Computador: ${reservation.computer.category?.name ?? null}
        <hr/>
    `;
    $(`.reservation-item-${reservations.length}`).append(reserve);
  });
}

function hideModal() {
  $(".modal").css("display", "none");
}
