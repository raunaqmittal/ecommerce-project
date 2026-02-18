import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions, cartItem, getCartItems }) {
  return (
    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((option) => {
        let priceString = "FREE Shipping";
        if (option.priceCents > 0) {
          priceString = formatMoney(option.priceCents);
        }

        const deliveryOptionHandler = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: option.id
          });
          await getCartItems(); // Refresh cart items after updating delivery option
        };

        return (
          <div
            key={option.id}
            class="delivery-option"
            onClick={deliveryOptionHandler}
          >
            <input
              type="radio"
              checked={option.id === cartItem.deliveryOptionId}
              onChange = {()=>{}}
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
        );
      })}
    </div>
  );
}
