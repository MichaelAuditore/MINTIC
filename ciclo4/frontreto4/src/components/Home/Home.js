import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useLocation } from "wouter";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { getSession } from "../../utils/localStorage";

const Home = () => {
  const welcomeRef = React.createRef();
  const [, setLocation] = useLocation();

  useEffect(() => {
    let user = getSession();
    if (user.name) {
      console.log(welcomeRef);
      welcomeRef.current.innerHTML = "Bienvenido " + user.name;
    } else {
      setLocation("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="content">
        <h4 className="welcome" ref={welcomeRef}>
          Hola
        </h4>
        <img src={logo} alt="logoZorrillo" />
        <h5>Zorrillo LTDA - Webpage</h5>
      </div>
    </div>
  );
};

export default Home;
