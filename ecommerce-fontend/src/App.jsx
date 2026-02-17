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
    const getCartItems = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCartItemsData(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartItems();
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
