$(document).ready(initializeEvents);

function initializeEvents() {
  $("#create-category").on("click", createFormCategory);
  $("#list-category").on("click", listCategorys);
  $(".close").on("click", hideModal);
  $(".navbar-toggler-icon").on("click", openNavbar);
}

function createFormCategory() {
  const categoryForm = `
    <form class="categoryForm">
      <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="name" placeholder="Nombre de categoría">
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Descripción</label>
        <input type="text" class="form-control" id="description" placeholder="Escribe una descripción">
      </div>
      <button type="submit" class="btn btn-success">Crear</button>
    </form>`;
  drawContent(categoryForm);
  $(".categoryForm").on("submit", createCategory);
}

function listCategorys() {
  const categoryTable = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
            </tr>
        </thead>
        <tbody class="categorysBody"></tbody>
    </table>`;
  drawContent(categoryTable);
  getCategorys();
}

function drawContent(element) {
  $(".canvas").html(element);
}

function drawCategorys(data) {
  let categorysBody = $(".categorysBody");
  categorysBody.html("");

  let categorys = data;
  categorys.forEach((category) => {
    let dato = `
      <tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
      </tr>
    `;
    {
      /* <td class="actionButtons">
          <button id="edit-${category.id}" class="btn btn-warning">Editar</button>
          <button id="delete-${category.id}" class="btn btn-danger deleteCategory">Eliminar</button>
        </td> */
    }
    categorysBody.append(dato);
    /* addEvents(category); */
  });
}

function addEvents(category) {
  buttonEdit = document.getElementById("edit-" + category.id);
  buttonDelete = document.getElementById("delete-" + category.id);
  buttonEdit.addEventListener("click", drawEdit);
  buttonDelete.addEventListener("click", deleteCategory);
}

async function drawEdit(event) {
  let id = event.srcElement.id.split("-")[1];
  let modal = $(".modal");
  modal.css("display", "contents");
  let dataCategory = await getCategory(id);
  let modalBody = $(".modal-body");
  let bodyCategory = `
    <form class="updateCategoryForm">
      <div class="form-group">
        <label for="updatedBrand" class="form-label">Marca</label>
        <input type="text" class="form-control" id="updatedBrand" value="${dataCategory.brand}">
      </div>
      <div class="form-group">
        <label for="updatedModel" class="form-label">Modelo</label>
        <input type="number" class="form-control" id="updatedModel" value="${dataCategory.model}">
      </div>
      <div class="form-group">
        <label for="updatedCategory" class="form-label">Category Id</label>
        <input type="number" class="form-control" id="updatedCategory" value="${dataCategory.category_id}">
      </div>
      <div class="form-group">
        <label for="updatedName" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="updatedName" value="${dataCategory.name}">
      </div>
      <button id="${dataCategory.id}" type="submit" class="btn btn-success">Actualizar</button>
    </form>`;
  modalBody.html(bodyCategory);
  $(".updateCategoryForm").on("submit", updateCategory);
}

function hideModal() {
  $(".modal").css("display", "none");
}
