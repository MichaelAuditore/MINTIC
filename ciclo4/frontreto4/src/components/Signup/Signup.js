import React, { useEffect, useState } from "react";
import { signupRequests } from "../../utils/requests";

const Signup = (props) => {
  const bodyActive = React.createRef();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (props.active) {
      bodyActive.current.className = "tab-body active";
    } else {
      bodyActive.current.className = "tab-body";
    }
  }, [props.active, bodyActive]);

  const signUp = async (event) => {
    event.preventDefault();

    await registerEvent();
  };

  const goToSignIn = () => {
    props.updateSigninState(true);
    props.updateSignupState(false);
  };

  const registerEvent = async () => {
    await validateData();
    goToSignIn();
  };

  const validateData = async () => {
    let existsEmail;
    if (!!username && !!email && !!password && !!confirmPassword) {
      if (isValidEmail(email)) {
        existsEmail = await validateEmail(email);
        if (!existsEmail) {
          if (password === confirmPassword) {
            const body = {
              name: username,
              email: email,
              pawssword: password
            };
            await signupRequests.signupRequest(body);
          } else {
            alert("Email ya ha sido registrado");
          }
        } else {
          alert("Email ya ha sido registrado");
        }
      } else {
        alert("Email no es valido");
      }
    } else {
      alert("diligencia los campos");
    }
  };

  const validateEmail = async (email) => {
    let emailExists = await signupRequests.emailRequest(email);

    return emailExists;
  };

  const isValidEmail = (email) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <div className="tab-body" ref={bodyActive}>
      <div className="form-element">
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-element">
        <input
          id="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-element">
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-element">
        <input
          id="c_password"
          type="password"
          placeholder="Confirmar contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="form-element">
        <button onClick={(e) => signUp(e)}>Registrate</button>
      </div>
      <div className="form-element">
        <p>
          ¿Ya tienes cuenta?{" "}
          <button className="buttonTag" onClick={goToSignIn} href="#">
            Accede aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
