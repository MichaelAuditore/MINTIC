import React, { useEffect, useState } from "react";
import "./Form.css";
import logo from "../../assets/images/logo.png";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";

export default function Form() {
    const SIGNIN_BUTTON_CLASS = "signin";
    const signUpRef = React.createRef();
    const signInRef = React.createRef();
    const signUpBody = React.createRef();
    const signInBody = React.createRef();
    const [activeSignup, setActiveSignup] = useState(true);
    const [activeSignin, setActiveSignin] = useState(false);

    useEffect(() => {
        let tab = {
            target: {
                className: ""
            }
        };
        if (activeSignup) {
            tab.target.className = "signup"
        } else {
            tab.target.className = "signin"
        }
        changeTab(tab);
    });

    const changeTab = (event) => {
        if (event.target.className === SIGNIN_BUTTON_CLASS) {
            signUpRef.current.className = "signup";
            signInRef.current.className = " active signin";
            setActiveSignup(false);
            setActiveSignin(true);
        } else {
            setActiveSignin(false);
            setActiveSignup(true);
            signInRef.current.className = "signin";
            signUpRef.current.className = " active signup";
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                <div className="container-fluid">
                    <img src={logo} alt="ZorrilloLogo" width="50px" />
                    <span className="navbar-brand-dark mb-0 h1">Zorrillo Fragance</span>
                </div>
            </nav>
            <div className="form">
                <div className="tab-header">
                    <div className="active signup" ref={signUpRef} onClick={changeTab}>
                        Registrate
                    </div>
                    <div className="signin" ref={signInRef} onClick={changeTab}>
                        Inicia sesión
                    </div>
                </div>
                <div className="tab-content">
                    <Signup
                        active={activeSignup}
                        updateSigninState={setActiveSignin}
                        updateSignupState={setActiveSignup}
                        signUpRef={signUpBody}
                    />
                    <Signin
                        active={activeSignin}
                        updateSigninState={setActiveSignin}
                        updateSignupState={setActiveSignup}
                        signUpRef={signInBody}
                    />
                </div>
            </div>
        </>
    );
}
