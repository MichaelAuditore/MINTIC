$(document).ready(function () {
  checkSession();
});

/**
 * @function checkSession
 * @description checks if a session is opened or not
 */
function checkSession() {
  if (existsSession()) {
    welcomeMessage();
  } else {
    window.location.href = "./index.html";
  }
}
/**
 * @function welcomeMessage
 * @description welcomeMessage shows a welcome message on dashboard screen
 */
function welcomeMessage() {
  let content = $(".welcome");
  let dataUser = getSession();

  content.html(`Bienvenido ${dataUser.name}`);
}
