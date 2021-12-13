import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import logo from "../../assets/images/logo.png";
import userLogo from "../../assets/images/usericon.png";
import { closeSession, getSession } from "../../utils/localStorage";

const Navbar = (props) => {
  const [session, setSession] = useState({});

  useEffect(() => {
    function initialize() {
      let sessionData = getSession();
      if (sessionData.name) setSession(sessionData);
    }
    initialize();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <img src={logo} alt="ZorrilloLogo" width="50px" />
          <span className="navbar-brand-dark mb-0 h6">Zorrillo Fragance</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <Link
                className={
                  props.fraganceActive ? "nav-link active" : "nav-link"
                }
                to="/fragances"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className={props.userActive ? "nav-link active" : "nav-link"}
                to="/users"
              >
                Usuarios
              </Link>
            </li>
            <li>
              {session.zone ? (
                <Link
                  className={props.orderActive ? "nav-link active" : "nav-link"}
                  to="/orders"
                >
                  Pedidos
                </Link>
              ) : null}
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={userLogo} width="30px" alt="userIcon" />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={closeSession}>
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
