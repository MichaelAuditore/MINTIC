const API_BASE_URL = "http://127.0.0.1:8080/api";

async function emailRequest(email) {
  let existsEmail = await fetch(`${API_BASE_URL}/user/emailexist/${email}`)
    .then((response) => response.json())
    .then((value) => value);
  return existsEmail;
}

async function signupRequest(body) {
  return await fetch(`${API_BASE_URL}/user/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => alert("USUARIO CREADO EXITÓSAMENTE", response))
    .catch((error) => alert("ERROR AL REGISTRAR USUARIO", error));
}

async function signInRequest(email, password) {
  return await fetch(`${API_BASE_URL}/user/${email}/${password}`)
    .then((response) => response.json())
    .then((response) => {
      setSession(response);
      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 2000);
    })
    .catch((error) => alert("USUARIO NO EXISTE", error));
}

async function updateUserRequest(body) {
  return await fetch(`${API_BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      setSession(response);
      window.location.reload();
    })
    .catch((error) => console.error(error));
}

async function getProducts() {
  return await fetch(`${API_BASE_URL}/fragance/all`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.error(error));
}

async function getUsers() {
  return await fetch(`${API_BASE_URL}/user/all`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.error(error));
}


async function saveProduct(body) {
  return await fetch(`${API_BASE_URL}/fragance/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (response) => {
      alert("Producto creado exitósamente", response);
      getZorrilloProducts();
    })
    .catch((error) => alert("ERROR AL REGISTRAR PRODUCTO", error));
}

async function updateFragance(body) {
  return await fetch(`${API_BASE_URL}/fragance/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (response) => {
      alert("Producto actualizado exitósamente", response);
      getZorrilloProducts();
    })
    .catch((error) => alert("ERROR AL ACTUALIZAR PRODUCTO", error));
}

async function removeProduct(reference) {
  return await fetch(`${API_BASE_URL}/fragance/${reference}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      alert("Producto eliminado exitósamente", response);
    })
    .catch((error) => {
      console.error("ERROR AL ELIMINAR PRODUCTO", error)
    }).finally(getZorrilloProducts);
}

async function removeUser(id) {
  return await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      alert("Usuario eliminado exitósamente", response);
    })
    .catch((error) => {
      console.error("ERROR AL ELIMINAR Usuario", error)
    }).finally(getZorrilloUsers);
}