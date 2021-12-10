function registerTab() {
  goToSignUp();
  changeTabStyles(0);
}

async function loginEvent() {
  let email = $("#userData").val();
  let password = $("#userPassword").val();

  await signInRequest(email, password);
}
