import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { Link } from "react-router";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

export function OrderSummary({ cart, deliveryOptions, getCartItems }) {
  return (
    <div class="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find(
          (option) => option.id === cartItem.deliveryOptionId,
        );
        
        const deleteCartItem = async () => {
          await axios.delete(`/api/cart-items/${cartItem.productId}`);
          await getCartItems();
        };

        const updateQuantity = async (newQuantity) => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: newQuantity,
          });
          await getCartItems();
        };

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
                    <select
                      class="quantity-selector"
                      value={cartItem.quantity}
                      onChange={(e) => updateQuantity(Number(e.target.value))}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </span>

                  <div
                    class="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                  >
                  Delete Item
                  </div>

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