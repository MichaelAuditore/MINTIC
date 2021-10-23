async function createCategory(event) {
  event.preventDefault();
  event.preventDefault();

  if ($("#name").val() == "" || $("#description").val() == "") {
    alert("los valores no pueden ser nulos");
    return;
  }
  const data = {
    name: $("#name").val(),
    description: $("#description").val(),
  };

  const requestObject = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(saveDataURL("category"), requestObject).then(
    alert("Se ha creado exitósamente el registro")
  );
}

async function getCategorys() {
  await fetch(getDataURL("category"))
    .then((response) => response.json())
    .then((response) => drawCategorys(response));
}

async function getComputersCategories() {
  await fetch(getDataURL("computer"))
    .then((response) => response.json())
    .then((response) => drawComputersCategories(response));
}

async function getCategory(id) {
  return await fetch(`${urlRequests["category"]}/${id}`)
    .then((response) => response.json())
    .then((response) => response);
}

async function updateCategory(event) {
  event.preventDefault();
  console.log(event);

  if ($("#updatedName").val() == "" || $("#updatedDescription").val() == "") {
    alert("los valores no pueden ser nulos");
    return;
  }

  const data = {
    id: event.currentTarget[2].id,
    name: $("#updatedName").val(),
    description: $("#updatedDescription").val(),
  };

  const requestObject = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  await fetch(updateDataURL("category"), requestObject).then(
    alert("Se ha actualizado exitósamente el registro")
  );
  getCategorys();
}

async function deleteCategory(event) {
  let id = parseInt(event.srcElement.id.split("-")[1]);
  const requestObject = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  };

  await fetch(deleteDataURL("category", id), requestObject)
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

  getCategorys();
}
