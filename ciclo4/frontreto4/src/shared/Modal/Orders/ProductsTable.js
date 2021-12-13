import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsToSell,
  getQuantitiesToSell,
  setProductsToSell,
  setQuantitiesToSell
} from "../../../utils/localStorage";
import "./Orders.css";

const ProductsTable = ({
  setOrderProducts,
  setOrderQuantities,
  orderProducts,
  orderQuantities
}) => {
  const products = getProducts();
  const [numberRows, setNumberRows] = useState(1);
  const [rowsList, setRows] = useState([]);
  const tableRef = React.createRef();

  const addProductToList = (event) => {
    setProductsToSell(
      JSON.parse(event.target.value),
      parseInt(event.target.id)
    );
    productsBody();
  };

  const addQuantitiesToList = (event) => {
    setQuantitiesToSell(
      parseInt(event.target.value),
      parseInt(event.target.id)
    );
    quantitiesBody();
  };

  const productsBody = () => {
    let productsObject = {};
    let productsSell = getProductsToSell();
    productsSell.forEach((product) => {
      productsObject[product.value.reference] = product.value;
    });

    setOrderProducts(productsObject);
  };

  const quantitiesBody = () => {
    let quantitiesObject = {};
    let productsSell = getProductsToSell();
    let quantitiesSell = getQuantitiesToSell();

    productsSell = quantitiesSell.forEach((quantity, idx) => {
      quantitiesObject[productsSell[idx].value.reference] = quantity.value;
    });

    setOrderQuantities(quantitiesObject);
  };

  const addLine = (event) => {
    event.preventDefault();
    setNumberRows(numberRows + 1);
    addRow();
    tableRef.current.className = "table table-dark";
  };

  const addRow = () => {
    let rows = [];
    for (let i = 0; i < numberRows; i++) {
      let row = (
        <tr key={i}>
          <td>
            <select id={i} defaultValue="" onChange={addProductToList}>
              <option value="">Producto a agregar</option>
              {products.map((product) => (
                <option key={product.reference} value={JSON.stringify(product)}>
                  {product.reference}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="number"
              id={i}
              placeholder="Cantidad"
              defaultValue=""
              onChange={addQuantitiesToList}
            ></input>
          </td>
        </tr>
      );
      rows.push(row);
    }
    setRows(rows);
  };

  return (
    <div className="inventory table-responsive">
      <button
        type="button"
        className="btn btn-success addButton"
        onClick={addLine}
      >
        Añadir Producto +
      </button>
      <table className="hidden table table-dark" ref={tableRef}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody className="orders">
          {numberRows > 0 ? rowsList.map((row) => row) : null}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
