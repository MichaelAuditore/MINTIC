/**
 * @function setSession
 * @description setSession to mantain opened
 * @param {*} dataUser
 */
function setSession(dataUser) {
  localStorage.setItem("userSession", JSON.stringify(dataUser));
}

/**
 * @function existsSession
 * @description checks is session is active or not
 * @returns boolean value
 */
function existsSession() {
  let dataUser = JSON.parse(
    localStorage.getItem("userSession")
      ? localStorage.getItem("userSession")
      : "{}"
  );
  if (Object.keys(dataUser).length > 0) {
    return true;
  }
  return false;
}

/**
 * @function closeSession
 * @description closeSession deletes session from browser and redirect to Login page
 */
function closeSession() {
  localStorage.removeItem("userSession");
  window.location.href = "index.html";
}

/**
 * @function getSession
 * @description getSession get Session from localstorage
 * @returns object with session Data
 */
function getSession() {
  return JSON.parse(
    localStorage.getItem("userSession")
      ? localStorage.getItem("userSession")
      : "{}"
  );
}
