import "./CheckoutPage.css";
import "./checkout-header.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { PaymentSummary } from "./PaymentSummary";
import {Link} from "react-router";
import { OrderSummary } from "./OrderSummary";

export function CheckoutPage({ cart, getCartItems }) {
  // Calculate total number of items in the cart
  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {

    const getDeliveryOptions = async () => {
      try {
        const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Error fetching delivery options:", error);
      }
    };

    const getPaymentSummary = async () => {
      try {
        const response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Error fetching payment summary:", error);
      }
    };

    getDeliveryOptions();
    getPaymentSummary();

  }, [cart]);

  return (
    <>
      <title>Checkout-Page</title>

      <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <Link to="/">
              <span style={{ fontSize: '34px', fontWeight: '700', letterSpacing: '0.5px',color:"whitesmoke" }}>E-MART</span>
            </Link>
          </div>

          <div class="checkout-header-middle-section">
            Checkout (
            <Link class="return-to-home-link" to="/">
              {totalItems} items
            </Link>
            )
          </div>

          <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div class="checkout-page">
        <div class="page-title">Review your order</div>

        <div class="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} getCartItems={getCartItems} />
          <PaymentSummary paymentSummary={paymentSummary} getCartItems={getCartItems} />

        </div>
      </div>
    </>
  );
}
