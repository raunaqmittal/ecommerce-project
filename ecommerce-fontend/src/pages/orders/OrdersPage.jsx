import { Header } from "../../components/Header";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router";
import { OrdersGrid } from "./OrdersGrid";

import "./OrdersPage.css";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders?expand=products")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
