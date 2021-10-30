const BASE_URL = "http://localhost:8080/api/";

const urlRequests = {
  client: `${BASE_URL}Client`,
  message: `${BASE_URL}Message`,
  computer: `${BASE_URL}Computer`,
  category: `${BASE_URL}Category`,
  reservation: `${BASE_URL}Reservation`,
};

function getDataURL(name) {
  return urlRequests[name] + "/all";
}

function saveDataURL(name) {
  return urlRequests[name] + "/save";
}

function updateDataURL(name) {
  return urlRequests[name] + "/update";
}

function deleteDataURL(name, id) {
  return urlRequests[name] + `/${id}`;
}

function openNavbar() {
  if ($("#navbarSupportedContent").hasClass("collapse")) {
    $("#navbarSupportedContent").removeClass("collapse");
  } else {
    $("#navbarSupportedContent").addClass("collapse");
  }
}
