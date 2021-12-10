let buttonPanes;
let tabContent;
let actionButtons = [goToSignUp, goToSignIn];

$(window).ready(function () {
  buttonPanes = $(".tab-header").children("div");
  tabContent = $(".tab-content");
  $(".registerButton").click(registerEvent);
  if (!existsSession()) {
    changeTab();
    goToSignUp();
  } else {
    window.location.href = "./dashboard.html";
  }
});

function changeTab() {
  for (let i = 0; i < buttonPanes.length; i++) {
    $(buttonPanes[i]).click(() => {
      changeTabStyles(i);
    });
  }
}

function changeTabStyles(posix) {
  $(".tab-header").children(".active").removeClass("active");
  $(buttonPanes[posix]).addClass("active");

  $(".tab-content").children(".active").removeClass("active");
  actionButtons[posix]();
  $(".tab-content").children($(".tab-body")[posix]).addClass("active");
}

function goToSignUp() {
  let signUpBody = `<div class="tab-body active">
    <div class="form-element">
      <input id="email" type="email" placeholder="Correo electrónico" />
    </div>
    <div class="form-element">
      <input id="username" type="text" placeholder="Nombre de usuario" />
    </div>
    <div class="form-element">
      <input id="password" type="password" placeholder="Contraseña" />
    </div>
    <div class="form-element">
      <input id="c_password" type="password" placeholder="Confirmar contraseña" />
    </div>
    <div class="form-element">
      <button class="registerButton">Registrate</button>
    </div>
  </div>`;
  $(".tab-content").html(signUpBody);

  $(".registerButton").click(registerEvent);
}

function goToSignIn() {
  let signInBody = `<div class="tab-body">
    <div class="form-element">
      <input id="userData" type="text" placeholder="Email" />
    </div>
    <div class="form-element">
      <input id="userPassword" type="password" placeholder="Contraseña" />
    </div>
    <div class="form-element">
      <button class="loginButton">Ingresar</button>
    </div>
    <div class="form-element">
        <p>¿No tienes cuenta? <a onclick=registerTab() href="#">Crea tu cuenta aquí</a></p>
    </div>
  </div>`;
  $(".tab-content").html(signInBody);
  $(".loginButton").click(loginEvent);
}
