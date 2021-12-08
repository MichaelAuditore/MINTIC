$(document).ready(initialize);

function initialize() {
  if (existsSession()) {
    let userButton = $(".user");
    userButton.addClass("active");
    getZorrilloUsers();
  } else {
    window.location.href = "./index.html";
  }
}

/**
 * getZorrilloUsers - creates a table with products info from MongoDB
 */
async function getZorrilloUsers() {
  let users = await getUsers();
  let userRows = [];

  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-dark");

  if (users.length > 0) {
    table.innerHTML = `
  <thead>
      <tr>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Celular</th>
          <th>Email</th>
          <th>Zona</th>
          <th>Rol</th>
          <th>Acciones</th>
      </tr>
  </thead>
  <tbody class="table_content">
  </tbody>
`;
  } else {
    table.innerHTML = `
  <td>Actualmente no hay registros</td>
  `;
  }
  $(".inventory").html(table);

  users.forEach((user) => {
    let userRow = `
      <tr>
          <td>
              <input disabled class="${user.id}" value="${user.name}"/>
          </td>
          <td>
              <input disabled class="${user.id}" value="${user.address}"/>
          </td>
          <td>
              <input disabled class="${user.id}" value="${user.cellPhone}"/>
          </td>
          <td>
              <input disabled class="${user.id}" value="${user.email}"/>
          </td>
          <td>
              <input disabled class="${user.id}" value="${user.zone}"/>
          </td>
          <td>
              <input disabled class="${user.id}" value="${user.type}"/>
          </td>
          <td>
            <button id="${user.id}"
                class="btn btn-warning editButton" onclick="enableEdit('${user.id}')">Actualizar</button>
            <button id="update${user.id}"
                class="btn btn-warning updateButton" onclick="updateUser('${user.id}')">Guardar</button>
            <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Eliminar</button>
          </td>
      </tr > `;
    userRows.push(userRow);
  });

  $(".table_content").html(userRows.join(""));
}

async function createUser() {
  await registerEvent();
}

function enableEdit(id) {
  $(`.${id}`).removeAttr("disabled");
  $(`#${id}`).hide();
  $(`#update${id}`).show();
}

function updateUser(id) {
  let updateFields = $(`.${id}`);

  let updatedBody = {
    id: id,
    name: $(updateFields[0]).val(),
    address: $(updateFields[1]).val(),
    cellPhone: $(updateFields[2]).val(),
    email: $(updateFields[3]).val(),
    zone: $(updateFields[4]).val(),
    type: $(updateFields[5]).val(),
  };

  updateUserRequest(updatedBody);
  $(`#${id}`).show();
  $(`#update${id}`).hide();
}

function deleteUser(reference) {
  removeUser(reference);
}