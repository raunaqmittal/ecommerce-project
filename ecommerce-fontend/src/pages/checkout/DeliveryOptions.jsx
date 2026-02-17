import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({
  deliveryOptions,
    cartItem
}) {
  return (
    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((option) => {
        let priceString = "FREE Shipping";
        if (option.priceCents > 0) {
          priceString = formatMoney(option.priceCents);
        }
        return (
          <div key={option.id} class="delivery-option">
            <input
              type="radio"
              checked={option.id === cartItem.deliveryOptionId}
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
