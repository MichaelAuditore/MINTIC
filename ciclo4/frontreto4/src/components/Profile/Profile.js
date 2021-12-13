import React, { useEffect, useState } from "react";
import { getSession } from "../../utils/localStorage";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import userLogo from "../../assets/images/usericon.png";
import { useLocation } from "wouter";
import { UpdateUserModal } from "../../shared/Modal/Users/Users";

const Profile = () => {
  const bodyRef = React.createRef();
  const [user, setSession] = useState({});
  const [, setLocation] = useLocation();

  useEffect(() => {
    const user = getSession();
    if (user.name) {
      setSession(user);
      welcome(user);
    } else {
      setLocation("/");
    }
  }, []);

  const welcome = (user) => {
    bodyRef.current.innerHTML = `
        ${user.name}<br/>
        ${user.email}<br/>
        ${user.birthtDay.split("T")[0]}<br/>
        ${user.monthBirthtDay}<br/>
        ${user.identification}<br/>
        ${user.address}<br/>
        ${user.cellPhone}<br/>
        ${user.zone}<br/>
        ${user.type}`;
  };

  const updateData = (dataObject) => {
    const userData = { ...user, ...dataObject };
    setSession(userData);
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <div className="tab-content">
          <div className="card active">
            <img src={userLogo} className="card-img-top" alt="userImage" />
            <div className="card-body">
              <p className="card-text" ref={bodyRef}></p>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#userUpdateModal"
              >
                Actualizar información
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateUserModal
        userData={user}
        updateUserData={updateData}
        render={welcome}
      />
    </div>
  );
};

export default Profile;
