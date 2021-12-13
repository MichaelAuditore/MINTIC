import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { fraganceRequests, orderRequests } from "../../utils/requests";
import {
  CreateOrderModal,
  UpdateOrderModal
} from "../../shared/Modal/Orders/Orders";
import { useLocation } from "wouter";
import { getSession } from "../../utils/localStorage";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [session, setSession] = useState({});
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    const sessionData = getSession();
    if (sessionData.name) {
      if (sessionData.type === "COORD") {
        getZorrilloOrdersByZone(sessionData.zone);
      } else {
        getZorrilloOrders();
      }
      setSession(sessionData);
      getZorrilloFragances();
    } else {
      setLocation("/");
    }
  }, []);

  const getZorrilloFragances = async () => {
    await fraganceRequests.getFragances();
  };

  const getZorrilloOrders = async () => {
    let orderData = await orderRequests.getOrders();
    setOrders(orderData);
  };

  const getZorrilloOrdersByZone = async (zone) => {
    let orderData = await orderRequests.getOrdersByZone(zone);
    setOrders(orderData);
  };

  const deleteOrder = async (idOrder) => {
    await orderRequests.removeOrder(idOrder);
    getZorrilloOrders();
  };

  return (
    <div>
      <Navbar orderActive={true} />
      <div className="container text-center">
        <h2 className="mt-5">Pedidos</h2>
        <div className="mt-5">
          <h4>Acciones</h4>
          <button
            type="button"
            className="btn btn-primary"
            id="createOrder"
            data-bs-toggle="modal"
            data-bs-target="#createOrderModal"
          >
            Crear pedido
          </button>
        </div>
        <div className="mt-5 inventory table-responsive">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Dia de registro</th>
                <th>Estado</th>
                <th>Vendedor</th>
                <th>Products</th>
                <th>Cantidades</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="table_content">
              {!!orders
                ? orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.registerDay}</td>
                      <td>{order.status}</td>
                      <td>
                        <pre>{JSON.stringify(order.salesMan, null, 2)}</pre>
                      </td>
                      <td>
                        <pre>{JSON.stringify(order.products, null, 2)}</pre>
                      </td>
                      <td>
                        <pre>{JSON.stringify(order.quantities, null, 2)}</pre>
                      </td>
                      <td>
                        <button
                          id={`${order.id}`}
                          className="btn btn-danger"
                          onClick={(e) => deleteOrder(parseInt(e.target.id))}
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

      <CreateOrderModal render={getZorrilloOrders} session={session} />
    </div>
  );
};

export default Orders;
