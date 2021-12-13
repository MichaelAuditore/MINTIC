import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getSession } from "../../utils/localStorage";
import { signinRequests } from "../../utils/requests";


const Signin = (props) => {
    const activeBody = React.createRef();
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (props.active) {
            activeBody.current.className = "tab-body active";
        } else {
            activeBody.current.className = "tab-body";
        }
    })

    const goToSignUp = () => {
        props.updateSigninState(false);
        props.updateSignupState(true);
    }

    const login = async () => {
        if (email && pwd) {
            await signinRequests.signInRequest(email, pwd);
            const user = getSession();
            if (user.name) {
                setLocation("/dashboard");
            } else {
                alert("Datos erroneos");
            }
        } else {
            alert("Digita tus credenciales");
        }
    }

    return (
        <div className="tab-body" ref={activeBody}>
            <div className="form-element">
                <input id="userData" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-element">
                <input id="userPassword" type="password" placeholder="Contraseña" onChange={(e) => setPwd(e.target.value)} />
            </div>
            <div className="form-element">
                <button className="loginButton" onClick={login}>Ingresar</button>
            </div>
            <div className="form-element">
                <p>¿No tienes cuenta? <button className="buttonTag" onClick={goToSignUp}>Crea tu cuenta aquí</button></p>
            </div>
        </div>
    )
}

export default Signin;