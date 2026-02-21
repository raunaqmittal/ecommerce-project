import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export function Product({ product, getCartItems }) {
  const [selectedQuantities, setSelectedQuantities] = useState(1);
  const [isAdded, setIsAdded] = useState(false); // Add this state
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: selectedQuantities,
    });
    await getCartItems(); // Refresh cart items after adding to cart

    // Show the "Added" message
    setIsAdded(true);

    // Optional: Hide it after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  const selectQuantity = (event) => {
    setSelectedQuantities(Number(event.target.value));
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={selectedQuantities} onChange={selectQuantity}>
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
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
