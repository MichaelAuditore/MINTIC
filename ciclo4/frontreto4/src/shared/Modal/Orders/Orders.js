import React, { useState } from "react";
import { clearProductsAndQuantities } from "../../../utils/localStorage";
import { orderRequests } from "../../../utils/requests";
import ModalBody from "./ModalBody";
import "./Orders.css";

export const CreateOrderModal = ({ render, session }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [products, setOrderProducts] = useState({});
  const [quantities, setOrderQuantities] = useState({});

  const createOrder = async () => {
    const body = {
      registerDay: date,
      status,
      salesMan: session,
      products,
      quantities
    };

    if (
      !!date &&
      !!status &&
      !!Object.keys(products).length > 0 &&
      !!Object.keys(quantities).length > 0
    ) {
      await orderRequests.saveOrder(body);
      clearProductsAndQuantities();
      render();
    } else {
      alert(
        "Debe llenar todos los campos requeridos para la orden, no olvide añadir productos"
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="createOrderModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="createOrderModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createOrderModalTitle">
              Crear Orden
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={clearProductsAndQuantities}
            ></button>
          </div>
          <ModalBody
            date={setDate}
            status={setStatus}
            products={setOrderProducts}
            quantities={setOrderQuantities}
          />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={clearProductsAndQuantities}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={createOrder}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
