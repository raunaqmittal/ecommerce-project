import "./CheckoutPage.css";
import "./checkout-header.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { PaymentSummary } from "./PaymentSummary";
import {Link} from "react-router";
import { OrderSummary } from "./OrderSummary";

export function CheckoutPage({ cart }) {
  // Calculate total number of items in the cart
  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      <title>Checkout-Page</title>

      <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <Link to="/">
              <img class="logo" src="images/logo.png" />
              <img class="mobile-logo" src="images/mobile-logo.png" />
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
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />

        </div>
      </div>
    </>
  );
}
