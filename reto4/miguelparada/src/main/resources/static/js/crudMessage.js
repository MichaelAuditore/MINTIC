async function createMessage(event) {
  event.preventDefault();

  if (
    $("#message").val() == "" ||
    $("#computerSelect").val() == "" ||
    $("#clientSelect").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    computer: { id: $("#computerSelect").val() },
    messageText: $("#message").val(),
    client: { idClient: $("#clientSelect").val() },
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(saveDataURL("message"), requestObject).then(
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

async function getMessages() {
  await fetch(getDataURL("message"))
    .then((response) => response.json())
    .then((response) => drawMessages(response));
}

async function getMessage(id) {
  return await fetch(`${urlRequests["message"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response);
}

async function updateMessage(event) {
  event.preventDefault();

  if ($("#updatedMessage").val() == "" || $("#clientSelect").val() == "") {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    idMessage: event.currentTarget[2].id,
    client: { idClient: $("#clientSelect").val() },
    messageText: $("#updatedMessage").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(updateDataURL("message"), requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getMessages();
}

async function deleteMessage(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(deleteDataURL("message", id), requestObject);
  getMessages();
}
