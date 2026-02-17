import { useState, useEffect } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  const [cartItems, setCartItemsData] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      console.log(response.data);
      setCartItemsData(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage cart={cartItems} />} />
      <Route path="orders" element={<OrdersPage cart={cartItems} />} />
    </Routes>
  );
}

export default App;
