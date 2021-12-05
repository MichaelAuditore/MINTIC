const API_BASE_URL = "http://127.0.0.1:8080/api/user";

const requests = {
  email: emailRequest,
  signup: signupRequest,
  signin: signInRequest,
};

async function emailRequest(email) {
  let existsEmail = await fetch(`${API_BASE_URL}/${email}`)
    .then((response) => response.json())
    .then((value) => value);
  return existsEmail;
}

async function signupRequest(body) {
  return await fetch(`${API_BASE_URL}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => alert("USUARIO CREADO EXITÓSAMENTE", response))
    .catch((error) => alert("ERROR AL REGISTRAR USUARIO", error));
}

async function signInRequest(email, password) {
  return await fetch(`${API_BASE_URL}/${email}/${password}`)
    .then((response) => response.json())
    .then((response) => alert(`Bienvenido ${response.name}`))
    .catch((error) => alert("USUARIO NO EXISTE", error));
}
