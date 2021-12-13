import { setProducts, setSession } from "./localStorage";

const API_BASE_URL = "http://127.0.0.1:8080/api";

export const signinRequests = {};
export const signupRequests = {};
export const userRequests = {};
export const fraganceRequests = {};
export const orderRequests = {};

signupRequests.emailRequest = async (email) => {
  let existsEmail = await fetch(`${API_BASE_URL}/user/emailexist/${email}`)
    .then((response) => response.json())
    .then((value) => value);
  return existsEmail;
};

signupRequests.signupRequest = async (body) => {
  return await fetch(`${API_BASE_URL}/user/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((response) => alert("USUARIO CREADO EXITÓSAMENTE", response))
    .catch((error) => alert("ERROR AL REGISTRAR USUARIO", error));
};

signinRequests.signInRequest = async (email, password) => {
  return await fetch(`${API_BASE_URL}/user/${email}/${password}`)
    .then((response) => response.json())
    .then((response) => setSession(response))
    .catch((error) => alert("USUARIO NO EXISTE", error));
};

userRequests.updateUserRequest = async (body) => {
  return await fetch(`${API_BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((response) => {
      setSession(response);
    })
    .catch((error) => console.error(error));
};

userRequests.removeUser = async (id) => {
  return await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((response) => {
      alert("Usuario eliminado exitósamente", response);
    })
    .catch((error) => {
      console.error("ERROR AL ELIMINAR Usuario", error);
    });
};

userRequests.getUsers = async () => {
  return await fetch(`${API_BASE_URL}/user/all`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.error(error));
};

fraganceRequests.getFragances = async () => {
  return await fetch(`${API_BASE_URL}/fragance/all`)
    .then((response) => response.json())
    .then((response) => {
      setProducts(response);
      return response;
    })
    .catch((error) => console.error(error));
};

fraganceRequests.saveFragance = async (body) => {
  return await fetch(`${API_BASE_URL}/fragance/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then(async (response) => alert("Fragancia creado exitósamente", response))
    .catch((error) => alert("ERROR AL REGISTRAR FRAGANCIA", error));
};

fraganceRequests.updateFragance = async (body) => {
  return await fetch(`${API_BASE_URL}/fragance/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then(async (response) =>
      alert("Fragancia actualizada exitósamente", response)
    )
    .catch((error) => alert("ERROR AL ACTUALIZAR FRAGANCIA", error));
};

fraganceRequests.removeFragance = async (reference) => {
  return await fetch(`${API_BASE_URL}/fragance/${reference}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((response) => {
      alert("Fragancia eliminado exitósamente", response);
    })
    .catch((error) => {
      console.error("ERROR AL ELIMINAR Fragancia", error);
    });
};

orderRequests.getOrders = async () => {
  return await fetch(`${API_BASE_URL}/order/all`)
    .then((response) => response.json())
    .then(async (response) => response)
    .catch((error) => alert("ERROR AL OBTENER ORDENES", error));
};

orderRequests.saveOrder = async (body) => {
  return await fetch(`${API_BASE_URL}/order/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then(async (response) => alert("Orden creada exitósamente", response))
    .catch((error) => alert("ERROR AL REGISTRAR ORDEN", error));
};

orderRequests.updateOrder = async (body) => {
  return await fetch(`${API_BASE_URL}/order/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then(async (response) => alert("Orden actualizada exitósamente", response))
    .catch((error) => alert("ERROR AL ACTUALIZAR ORDEN", error));
};

orderRequests.getOrdersByZone = async (zone) => {
  return await fetch(`${API_BASE_URL}/order/zona/${zone}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.error(error));
};

orderRequests.removeOrder = async (id) => {
  return await fetch(`${API_BASE_URL}/order/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((response) => alert("Orden eliminada exitósamente", response))
    .catch((error) => console.error("ERROR AL ELIMINAR ORDEN", error));
};
