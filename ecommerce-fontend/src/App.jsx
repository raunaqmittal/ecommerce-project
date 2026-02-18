import { useState, useEffect } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/trackingPage";
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  const [cartItems, setCartItemsData] = useState([]);

  const getCartItems = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCartItemsData(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cartItems} getCartItems={getCartItems} />} />
      <Route path="checkout" element={<CheckoutPage cart={cartItems} getCartItems={getCartItems} />} />
      <Route path="orders" element={<OrdersPage cart={cartItems} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cartItems} />} />
    </Routes>
  );
}

export default App;
