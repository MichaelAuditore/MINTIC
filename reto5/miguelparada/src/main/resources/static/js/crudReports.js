async function getReservationStatus() {
  fetch(`${urlRequests["reservation"]}/report-status`)
    .then((response) => response.json())
    .then((response) => drawStatus(response));
}

async function getClientsReport() {
  fetch(`${urlRequests["reservation"]}/report-clients`)
    .then((response) => response.json())
    .then((response) => drawTopClients(response));
}

async function getReservationsByDate(event) {
  event.preventDefault();
  startDate = $("#startDate").val();
  endDate = $("#endDate").val();
  fetch(`${urlRequests["reservation"]}/report-dates/${startDate}/${endDate}`)
    .then((response) => response.json())
    .then((response) => drawReservationsByDate(response));
}
