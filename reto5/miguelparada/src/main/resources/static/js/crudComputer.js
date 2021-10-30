async function createComputer(event) {
  event.preventDefault();

  if (
    $("#brand").val() == "" ||
    $("#year").val() == "" ||
    $("#categorySelect").val() == "" ||
    $("#name").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    brand: $("#brand").val(),
    year: parseInt($("#year").val()),
    category: { id: $("#categorySelect").val() },
    description: $("#description").val(),
    name: $("#name").val(),
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(saveDataURL("computer"), requestObject).then(
    alert("Se ha creado exitósamente el registro")
  );
}

async function getComputers() {
  await fetch(getDataURL("computer"))
    .then((response) => response.json())
    .then((response) => drawComputers(response));
}

async function getCategoryOptions() {
  await fetch(getDataURL("category"))
    .then((response) => response.json())
    .then((response) => drawCategorySelect(response));
}

async function getComputer(id) {
  return await fetch(`${urlRequests["computer"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response);
}

async function updateComputer(event) {
  event.preventDefault();

  if (
    $("#updatedBrand").val() == "" ||
    $("#updatedModel").val() == "" ||
    $("#updatedCategory").val() == "" ||
    $("#updatedDescription").val() == "" ||
    $("#updatedName").val() == ""
  ) {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    id: event.currentTarget[4].id,
    brand: $("#updatedBrand").val(),
    year: $("#updatedYear").val(),
    category: { id: $("#updatedCategory").val() },
    name: $("#updatedName").val(),
    description: $("#updatedDescription").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(updateDataURL("computer"), requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getComputers();
}

async function deleteComputer(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  };

  await fetch(deleteDataURL("computer", id), requestObject)
    .then((response) => response.json())
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      alert("Se ha eliminado exitósamente", response);
    })
    .catch((error) => {
      alert(
        "Error al eliminar la categoría, actualmente tiene asociada computadores",
        error
      );
    });
  getComputers();
}
