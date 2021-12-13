import React, { useEffect, useState } from "react";
import { fraganceRequests } from "../../../utils/requests";

export const UpdateFraganceModal = (props) => {
  const [availability, setAvailability] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [presentation, setPresentation] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [photography, setPhotography] = useState("");

  useEffect(() => {
    function initValues() {
      setAvailability(props.fraganceData.availability);
      setBrand(props.fraganceData.brand);
      setCategory(props.fraganceData.category);
      setDescription(props.fraganceData.description);
      setPresentation(props.fraganceData.presentation);
      setPrice(props.fraganceData.price);
      setQuantity(props.fraganceData.quantity);
      setPhotography(props.fraganceData.photography);
    }
    initValues();
  }, [props.fraganceData]);

  const updateFragance = async () => {
    const body = {
      reference: props.fraganceData.reference,
      availability,
      brand,
      category,
      description,
      presentation,
      price,
      quantity,
      photography
    };

    await fraganceRequests.updateFragance(body);
    props.render();
  };

  return (
    <div
      className="modal fade"
      id="updateModal"
      tabIndex="-1"
      aria-labelledby="updateModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateModalLabel">
              Actualizar Fragancia
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
                    id="brand"
                    type="text"
                    placeholder="Marca"
                    defaultValue={props.fraganceData.brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Categoría"
                    defaultValue={props.fraganceData.category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="presentation"
                    id="presentation"
                    placeholder="Presentación"
                    defaultValue={props.fraganceData.presentation}
                    onChange={(e) => setPresentation(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    defaultValue={props.fraganceData.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-element">
                  <select
                    name="availability"
                    id="availability"
                    defaultValue={props.fraganceData.availability ? "SI" : "NO"}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="">Disponibilidad</option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="form-element">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Precio"
                    defaultValue={props.fraganceData.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Cantidad"
                    defaultValue={props.fraganceData.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="photography"
                    id="photography"
                    placeholder="URL Imagen"
                    defaultValue={props.fraganceData.photography}
                    onChange={(e) => setPhotography(e.target.value)}
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
              onClick={updateFragance}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Actualizar Fragancia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateFraganceModal = (props) => {
  const [reference, setReference] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [presentation, setPresentation] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [photography, setPhotography] = useState("");

  const createFragance = async () => {
    if (
      !!reference &&
      !!brand &&
      !!category &&
      !!presentation &&
      !!description &&
      !!availability &&
      !!price &&
      !!quantity &&
      !!photography
    ) {
      const body = {
        reference,
        brand,
        category,
        presentation,
        description,
        price,
        quantity,
        photography,
        availability: availability === "SI" ? true : false
      };
      await fraganceRequests.saveFragance(body);
      props.render();
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createModalLabel">
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
                    id="reference"
                    type="text"
                    placeholder="Referencia"
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    id="brand"
                    type="text"
                    placeholder="Marca"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Categoría"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="presentation"
                    id="presentation"
                    placeholder="Presentación"
                    onChange={(e) => setPresentation(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-element">
                  <select
                    name="availability"
                    id="availability"
                    defaultValue={""}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="">Disponibilidad</option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="form-element">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Precio"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Cantidad"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <input
                    type="text"
                    name="photography"
                    id="photography"
                    placeholder="URL Imagen"
                    onChange={(e) => setPhotography(e.target.value)}
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
              onClick={createFragance}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Crear Fragancia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
