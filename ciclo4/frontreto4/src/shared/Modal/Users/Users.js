import React, { useState } from "react";
import { userRequests, signupRequests } from "../../../utils/requests";

export const UpdateUserModal = (props) => {
  const modalRef = React.createRef();

  const updateUser = async () => {
    const body = {
      id: props.userData.id,
      name: props.userData.name,
      email: props.userData.email,
      identification: props.userData.identification,
      address: props.userData.address,
      zone: props.userData.zone,
      cellPhone: props.userData.cellPhone,
      type: props.userData.type
    };
    console.log(props.userData);
    if (
      !!props.userData.name &&
      !!props.userData.email &&
      !!props.userData.identification &&
      !!props.userData.address &&
      !!props.userData.cellPhone &&
      !!props.userData.zone &&
      !!props.userData.type
    ) {
      await userRequests.updateUserRequest(body);
      props.render(props.userData);
    } else {
      alert("No puede dejar campos vacios");
    }
  };

  return (
    <div
      className="modal fade"
      id="userUpdateModal"
      tabIndex="-1"
      aria-labelledby="userModalLabel"
      aria-modal="true"
      role="dialog"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userModalLabel">
              Actualizar información
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form">
            <div className="container-fluid tab-content">
              <div className="tab-body active">
                <div className="form-element">
                  <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    defaultValue={props.userData.email}
                    onChange={(e) =>
                      props.updateUserData({
                        email: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    id="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    defaultValue={props.userData.name}
                    onChange={(e) =>
                      props.updateUserData({
                        name: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="identification"
                    id="identification"
                    placeholder="N° identificacion"
                    defaultValue={props.userData.identification}
                    onChange={(e) =>
                      props.updateUserData({
                        identification: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Dirección"
                    defaultValue={props.userData.address}
                    onChange={(e) =>
                      props.updateUserData({
                        address: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="cellPhone"
                    id="cellPhone"
                    placeholder="Celular"
                    defaultValue={props.userData.cellPhone}
                    onChange={(e) =>
                      props.updateUserData({
                        cellPhone: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="zone"
                    id="zone"
                    placeholder="Zona"
                    defaultValue={props.userData.zone}
                    onChange={(e) =>
                      props.updateUserData({
                        zone: e.target.value
                      })
                    }
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="type"
                    id="typeRol"
                    placeholder="Tipo"
                    defaultValue={props.userData.type}
                    onChange={(e) =>
                      props.updateUserData({
                        type: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={updateUser}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateUserModal = (props) => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthtDay, setBirthDay] = useState("");
  const [monthBirthtDay, setMonthBirthDay] = useState("");
  const [identification, setIdentification] = useState("");
  const [address, setAddress] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [zone, setZone] = useState("");
  const [type, setRol] = useState("");

  const createUser = async () => {
    await validateData();
  };

  const validateData = async () => {
    let existsEmail;
    if (
      !!name &&
      !!email &&
      !!birthtDay &&
      !!monthBirthtDay &&
      !!identification &&
      !!address &&
      !!cellPhone &&
      !!zone &&
      !!type
    ) {
      if (isValidEmail(email)) {
        existsEmail = await validateEmail(email);
        if (!existsEmail) {
          const body = {
            name,
            email,
            birthtDay,
            monthBirthtDay,
            identification,
            address,
            cellPhone,
            zone,
            type
          };
          await signupRequests.signupRequest(body);
          props.render();
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
    <div
      className="modal fade"
      id="createUserModal"
      tabIndex="-1"
      aria-labelledby="createUserLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createUserLabel">
              Crear Fragancia
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form">
            <div className="container-fluid tab-content">
              <div className="tab-body active">
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
                    id="birthDay"
                    type="date"
                    placeholder="Fecha de nacimiento"
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    id="monthBirthDay"
                    type="text"
                    maxLength={2}
                    max="2"
                    placeholder="Mes de nacimiento"
                    onChange={(e) => setMonthBirthDay(e.target.value)}
                  />
                </div>
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
                    type="text"
                    name="identification"
                    id="identification"
                    placeholder="N° identificacion"
                    onChange={(e) => setIdentification(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Dirección"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="cellPhone"
                    id="cellPhone"
                    placeholder="Celular"
                    onChange={(e) => setCellPhone(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="zone"
                    id="zone"
                    placeholder="Zona"
                    onChange={(e) => setZone(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="type"
                    id="typeRol"
                    placeholder="Tipo"
                    onChange={(e) => setRol(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={createUser}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
