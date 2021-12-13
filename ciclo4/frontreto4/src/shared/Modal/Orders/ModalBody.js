import React from "react";
import ProductsTable from "./ProductsTable";

const ModalBody = ({ date, status, products, quantities }) => {
  return (
    <div className="modal-body form">
      <div className="container-fluid tab-content">
        <div className="tab-body active">
          <div className="form-element">
            <label htmlFor="registerDay">Fecha registro</label>
            <input
              id="registerDay"
              type="date"
              placeholder="Fecha registro"
              defaultValue=""
              onChange={(e) => {
                date(e.target.value);
              }}
            />
          </div>
          <div className="form-element">
            <input
              defaultValue=""
              onChange={(e) => status(e.target.value)}
              placeholder="Estado"
            />
          </div>
          <ProductsTable
            setOrderProducts={products}
            setOrderQuantities={quantities}
            setStatus={status}
            setDate={date}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
