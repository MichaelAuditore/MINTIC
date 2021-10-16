const BASE_URL =
  "https://ge294c7c78bc307-alquiler.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/";

const urlRequests = {
  client: `${BASE_URL}client/client`,
  message: `${BASE_URL}message/message`,
  computer: `${BASE_URL}computer/computer`,
};

function openNavbar() {
  if ($("#navbarSupportedContent").hasClass("collapse")) {
    $("#navbarSupportedContent").removeClass("collapse");
  } else {
    $("#navbarSupportedContent").addClass("collapse");
  }
}
