import "./CheckoutPage.css";
import "./checkout-header.css";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatMoney } from "../utils/money";

export function CheckoutPage({ cart }) {

  // Calculate total number of items in the cart
  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
  }

  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

  return (
    <>
      <title>Checkout-Page</title>

      <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <a href="/">
              <img class="logo" src="images/logo.png" />
              <img class="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div class="checkout-header-middle-section">
            Checkout (
            <a class="return-to-home-link" href="/">
              {totalItems} items
            </a>
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
          <div class="order-summary">
            {cart.map((cartItem) => {

              const selectedDeliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
              return (
                <div key={cartItem.productId} class="cart-item-container">
                  <div class="delivery-date">
                    Delivery date: {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D") : "Not selected"}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image" src={cartItem.product.image} />

                    <div class="cart-item-details">
                      <div class="product-name">{cartItem.product.name}</div>
                      <div class="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span class="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      {deliveryOptions.map((option) => {

                        let priceString = "FREE Shipping";
                        if (option.priceCents > 0) {
                          priceString = formatMoney(option.priceCents);
                        }
                        return (
                          <div key={option.id} class="delivery-option">
                        <input
                          type="radio"
                          checked = {option.id === cartItem.deliveryOptionId}
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`}
                        />
                        <div>
                          <div class="delivery-option-date">
                            {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                          </div>
                          <div class="delivery-option-price">{priceString}</div>
                        </div>
                      </div>
                        )
                      })}
                    
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div class="payment-summary">
            <div class="payment-summary-title">Payment Summary</div>

            <div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
