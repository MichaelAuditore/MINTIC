async function createClient(event) {
  event.preventDefault();

  if (
    $("#name").val() == "" ||
    $("#email").val() == "" ||
    $("#age").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(urlRequests["client"], requestObject).then(
    alert("Se ha creado exitósamente el registro")
  );
}

async function getClients() {
  await fetch(urlRequests["client"])
    .then((response) => response.json())
    .then((response) => drawClients(response));
}

async function getClient(id) {
  return await fetch(`${urlRequests["client"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response.items[0]);
}

async function updateClient(event) {
  event.preventDefault();

  if (
    $("#updatedName").val() == "" ||
    $("#updatedEmail").val() == "" ||
    $("#updatedAge").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    id: event.currentTarget[3].id,
    name: $("#updatedName").val(),
    email: $("#updatedEmail").val(),
    age: $("#updatedAge").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(urlRequests["client"], requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getClients();
}

async function deleteClient(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(urlRequests["client"], requestObject);
  getClients();
}
