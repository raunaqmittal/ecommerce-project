import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { Link } from "react-router";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({ cart, deliveryOptions, getCartItems }) {
  return (
    <div class="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find(
          (option) => option.id === cartItem.deliveryOptionId,
        );
        return (
          <div key={cartItem.productId} class="cart-item-container">
            <div class="delivery-date">
              Delivery date:{" "}
              {selectedDeliveryOption
                ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D",
                  )
                : "Not selected"}
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
                    <span class="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">Update</span>
                  <span class="delete-quantity-link link-primary">Delete</span>
                </div>
              </div>

              <DeliveryOptions
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                getCartItems={getCartItems}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
