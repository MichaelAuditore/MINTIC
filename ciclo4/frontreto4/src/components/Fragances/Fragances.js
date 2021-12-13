import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { fraganceRequests } from "../../utils/requests";
import {
  CreateFraganceModal,
  UpdateFraganceModal
} from "../../shared/Modal/Fragances/Fragances";

const Fragances = () => {
  const [fragances, setFragances] = useState([]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    getZorrilloFragances();
  }, []);

  const getZorrilloFragances = async () => {
    let Fragances = await fraganceRequests.getFragances();
    setFragances(Fragances);
  };

  const updateFragance = async (event) => {
    event.preventDefault();

    let Fragances = await fraganceRequests.getFragances();

    let fragance = Fragances.filter(
      (fragance) => fragance.reference === event.target.id
    );

    setUpdateData(fragance[0]);
  };

  const deleteFragance = async (idFragance) => {
    await fraganceRequests.removeFragance(idFragance);
    getZorrilloFragances();
  };

  return (
    <div>
      <Navbar fraganceActive={true} />
      <div className="container text-center">
        <h2 className="mt-5">Inventario de Fragancias</h2>
        <div className="mt-5">
          <h4>Acciones</h4>
          <button
            type="button"
            className="btn btn-primary"
            id="createFragance"
            data-bs-toggle="modal"
            data-bs-target="#createModal"
          >
            Crear fragancia
          </button>
        </div>
        <div className="mt-5 inventory table-responsive">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Disponibilidad</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Presentación</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="table_content">
              {!!fragances
                ? fragances.map((fragance) => (
                    <tr key={fragance.reference}>
                      <td>{fragance.reference}</td>
                      <td>{fragance.availability ? "SI" : "NO"}</td>
                      <td>{fragance.brand}</td>
                      <td>{fragance.category}</td>
                      <td>{fragance.description}</td>
                      <td>{fragance.presentation}</td>
                      <td>{fragance.price}</td>
                      <td>{fragance.quantity}</td>
                      <td>
                        <img
                          src={fragance.photography}
                          alt={fragance.reference}
                        />
                      </td>
                      <td>
                        <button
                          id={`${fragance.reference}`}
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#updateModal"
                          onClick={(e) => updateFragance(e)}
                        >
                          Actualizar
                        </button>
                        <button
                          id={`${fragance.reference}`}
                          className="btn btn-danger"
                          onClick={(e) => deleteFragance(e.target.id)}
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

      <CreateFraganceModal render={getZorrilloFragances} />
      <UpdateFraganceModal
        fraganceData={updateData}
        render={getZorrilloFragances}
      />
    </div>
  );
};

export default Fragances;
