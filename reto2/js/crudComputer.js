async function createComputer(event) {
  event.preventDefault();

  if (
    $("#brand").val() == "" ||
    $("#model").val() == "" ||
    $("#category").val() == "" ||
    $("#name").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    brand: $("#brand").val(),
    model: $("#model").val(),
    category_id: $("#category").val(),
    name: $("#name").val(),
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(urlRequests["computer"], requestObject).then(
    alert("Se ha creado exitósamente el registro")
  );
}

async function getComputers() {
  await fetch(urlRequests["computer"])
    .then((response) => response.json())
    .then((response) => drawComputers(response));
}

async function getComputer(id) {
  return await fetch(`${urlRequests["computer"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response.items[0]);
}

async function updateComputer(event) {
  event.preventDefault();

  if (
    $("#updatedBrand").val() == "" ||
    $("#updatedModel").val() == "" ||
    $("#updatedCategory").val() == "" ||
    $("#updatedName").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    id: event.currentTarget[4].id,
    brand: $("#updatedBrand").val(),
    model: $("#updatedModel").val(),
    category_id: $("#updatedCategory").val(),
    name: $("#updatedName").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(urlRequests["computer"], requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getComputers();
}

async function deleteComputer(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
    success: async function () {
      alert("Se ha eliminado exitósamente el registro");
    },
  };

  await fetch(urlRequests["computer"], requestObject);
  getComputers();
}
