import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { userRequests } from "../../utils/requests";
import {
  CreateUserModal,
  UpdateUserModal
} from "../../shared/Modal/Users/Users";
import { useLocation } from "wouter";
import { getSession } from "../../utils/localStorage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [, setLocation] = useLocation();
  const [userModify, setUserModify] = useState({});

  useEffect(() => {
    const user = getSession();
    if (user.name) {
      getZorrilloUsers();
    } else {
      setLocation("/");
    }
  }, []);

  const getZorrilloUsers = async () => {
    let userData = await userRequests.getUsers();
    setUsers(userData);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    let userData = await userRequests.getUsers();
    let user = userData.filter((user) => user.id === parseInt(event.target.id));
    setUserModify(user[0]);
  };

  const deleteUser = async (idUser) => {
    await userRequests.removeUser(idUser);
    getZorrilloUsers();
  };

  const updateData = (dataObject) => {
    const userData = { ...userModify, ...dataObject };
    setUserModify(userData);
  };

  return (
    <div>
      <Navbar userActive={true} />
      <div className="container text-center">
        <h2 className="mt-5">Usuarios</h2>
        <div className="mt-5">
          <h4>Acciones</h4>
          <button
            type="button"
            className="btn btn-primary"
            id="createUser"
            data-bs-toggle="modal"
            data-bs-target="#createUserModal"
          >
            Crear usuario
          </button>
        </div>
        <div className="mt-5 inventory table-responsive">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Fecha de nacimiento</th>
                <th>Mes de nacimiento</th>
                <th>Dirección</th>
                <th>Número telefónico</th>
                <th>Email</th>
                <th>Zona</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="table_content">
              {!!users
                ? users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.identification}</td>
                      <td>{user.name}</td>
                      <td>{user.birthtDay}</td>
                      <td>{user.monthBirthtDay}</td>
                      <td>{user.address}</td>
                      <td>{user.cellPhone}</td>
                      <td>{user.email}</td>
                      <td>{user.zone}</td>
                      <td>{user.type}</td>
                      <td>
                        <button
                          id={`${user.id}`}
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#userUpdateModal"
                          onClick={(e) => updateUser(e)}
                        >
                          Actualizar
                        </button>
                        <button
                          id={`${user.id}`}
                          className="btn btn-danger"
                          onClick={(e) => deleteUser(e.target.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserModal render={getZorrilloUsers} />
      <UpdateUserModal
        userData={userModify}
        updateUserData={updateData}
        render={getZorrilloUsers}
      />
    </div>
  );
};

export default Users;
