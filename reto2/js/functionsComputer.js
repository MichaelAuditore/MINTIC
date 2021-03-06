$(document).ready(initializeEvents);

function initializeEvents() {
  $("#create-computer").on("click", createFormComputer);
  $("#list-computer").on("click", listComputers);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function createFormComputer() {
  const computerForm = `
    <form class="computerForm">
      <div class="form-group">
        <label for="brand" class="form-label">Marca</label>
        <input type="text" class="form-control" id="brand" placeholder="Lenovo">
      </div>
      <div class="form-group">
        <label for="model" class="form-label">Modelo</label>
        <input type="number" class="form-control" id="model" placeholder="1">
      </div>
      <div class="form-group">
        <label for="category" class="form-label">Category Id</label>
        <input type="number" class="form-control" id="category" placeholder="12">
      </div>
      <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="name" placeholder="Thinkpad">
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(computerForm);
  $(".computerForm").on("submit", createComputer);
}

function listComputers() {
  const computerTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Categoría</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody class="computersBody"></tbody>
    </table>`;
  drawContent(computerTable);
  getComputers();
}

function drawContent(element) {
  $(".canvas").html(element);
}

function drawComputers(data) {
  let computersBody = $(".computersBody");
  computersBody.html("");

  let computers = data.items;
  computers.forEach((computer) => {
    let dato = `
      <tr>
        <td>${computer.id}</td>
        <td>${computer.brand}</td>
        <td>${computer.model}</td>
        <td>${computer.category_id}</td>
        <td>${computer.name}</td>
        <td class="actionButtons">
          <button id="edit-${computer.id}" class="btn btn-warning">Editar</button>
          <button id="delete-${computer.id}" class="btn btn-danger deleteComputer">Eliminar</button>
        </td>
      </tr>
    `;
    computersBody.append(dato);
    addEvents(computer);
  });
}

function addEvents(computer) {
  buttonEdit = document.getElementById("edit-" + computer.id);
  buttonDelete = document.getElementById("delete-" + computer.id);
  buttonEdit.addEventListener("click", drawEdit);
  buttonDelete.addEventListener("click", deleteComputer);
}

async function drawEdit(event) {
  let id = event.srcElement.id.split("-")[1];
  let modal = $(".modal");
  modal.css("display", "contents");
  let dataComputer = await getComputer(id);
  let modalBody = $(".modal-body");
  let bodyComputer = `
    <form class="updateComputerForm">
      <div class="form-group">
        <label for="updatedBrand" class="form-label">Marca</label>
        <input type="text" class="form-control" id="updatedBrand" value="${dataComputer.brand}">
      </div>
      <div class="form-group">
        <label for="updatedModel" class="form-label">Modelo</label>
        <input type="number" class="form-control" id="updatedModel" value="${dataComputer.model}">
      </div>
      <div class="form-group">
        <label for="updatedCategory" class="form-label">Category Id</label>
        <input type="number" class="form-control" id="updatedCategory" value="${dataComputer.category_id}">
      </div>
      <div class="form-group">
        <label for="updatedName" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="updatedName" value="${dataComputer.name}">
      </div>
      <button id="${dataComputer.id}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyComputer);
  $(".updateComputerForm").on("submit", updateComputer);
}

function hideModal() {
  $(".modal").css("display", "none");
}
