async function createReservation(event) {
  event.preventDefault();

  if (
    $("#dateSelect").val() == "" ||
    $("#devolutionDateSelect").val() == "" ||
    $("#clientSelect").val() == "" ||
    $("#computerSelect").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    startDate: $("#dateSelect").val(),
    devolutionDate: $("#devolutionDateSelect").val(),
    computer: { id: $("#clientSelect").val() },
    client: { idClient: $("#computerSelect").val() },
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(saveDataURL("reservation"), requestObject).then(
    alert("Se ha creado exitósamente el registro")
  );
}

async function getComputerOptions() {
  await fetch(getDataURL("computer"))
    .then((response) => response.json())
    .then((response) => drawComputerOptions(response));
}

async function getClientOptions() {
  await fetch(getDataURL("client"))
    .then((response) => response.json())
    .then((response) => drawClientOptions(response));
}

async function getReservations() {
  await fetch(getDataURL("reservation"))
    .then((response) => response.json())
    .then((response) => drawReservations(response));
}

async function getReservation(id) {
  return await fetch(`${urlRequests["reservation"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response.items[0]);
}

async function updateReservation(event) {
  console.log(event);
  event.preventDefault();

  if (
    $("#updatedReservation").val() == "" ||
    $("#updatedComputerSelect").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    id: event.currentTarget[1].id,
    computer: $("#updatedComputerSelect").val(),
    reservationtext: $("#updatedReservation").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(updateDataURL("reservation"), requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getReservations();
}

async function deleteReservation(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(deleteDataURL("reservation"), requestObject);
  getReservations();
}
