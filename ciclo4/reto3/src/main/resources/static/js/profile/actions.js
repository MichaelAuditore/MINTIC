$(document).ready(setUserData);

/**
 * @function setUserData
 * @description displays userdata on profile screen
 */
function setUserData() {
  userData = getSession();
  $(".card-title").html(userData.name);
  $(".card-text").html(
    userData.email +
      "<br>" +
      userData.identification +
      "<br>" +
      userData.address +
      "<br>" +
      userData.cellPhone +
      "<br>" +
      userData.zone +
      "<br>" +
      userData.type
  );
  $("#email").val(userData.email);
  $("#username").val(userData.name);
  $("#identification").val(userData.identification);
  $("#cellPhone").val(userData.cellPhone);
  $("#zone").val(userData.zone);
  $("#typeRol").val(userData.type);
  $("#address").val(userData.address);
}

function updateUser() {
  let userData = getSession();
  let bodyUpdate = {
    id: userData.id,
    email: $("#email").val(),
    password: userData.password,
    name: $("#username").val(),
    identification: $("#identification").val(),
    address: $("#address").val(),
    cellPhone: $("#cellPhone").val(),
    zone: $("#zone").val(),
    type: $("#typeRol").val(),
  };
  updateUserRequest(bodyUpdate);
}
