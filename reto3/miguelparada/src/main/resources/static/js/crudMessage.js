async function createMessage(event) {
  event.preventDefault();

  if ($("#message").val() == "") {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    messagetext: $("#message").val(),
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

async function getMessages() {
  await fetch(saveDataURL("message"))
    .then((response) => response.json())
    .then((response) => drawMessages(response));
}

async function getMessage(id) {
  return await fetch(`${urlRequests["message"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response.items[0]);
}

async function updateMessage(event) {
  console.log(event);
  event.preventDefault();

  if ($("#updatedMessage").val() == "") {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    id: event.currentTarget[1].id,
    messagetext: $("#updatedMessage").val(),
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
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(deleteDataURL("message"), requestObject);
  getMessages();
}
