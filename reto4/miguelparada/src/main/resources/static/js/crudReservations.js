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

  if ($("#dateSelect").val() > $("#devolutionDateSelect").val()) {
    alert("La fecha de devolución no puede ser inferior a la de inicio");
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
    .then((response) => response);
}

async function updateReservation(event) {
  event.preventDefault();

  if (
    $("#updatedDateSelect").val() == "" ||
    $("#updatedDevolutionDateSelect").val() == "" ||
    $("#updatedStatus").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  if ($("#updatedDateSelect").val() > $("#updatedDevolutionDateSelect").val()) {
    alert("La fecha de devolución no puede ser inferior a la de inicio");
    return;
  }

  const data = {
    idReservation: event.currentTarget[3].id,
    status: $("#updatedStatus").val(),
    startDate: $("#updatedDateSelect").val(),
    devolutionDate: $("#updatedDevolutionDateSelect").val()
  };

  console.log(data);

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
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(deleteDataURL("reservation", id), requestObject);
  getReservations();
}
