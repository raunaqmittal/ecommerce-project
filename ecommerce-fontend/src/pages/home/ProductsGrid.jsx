
import { Product } from "./Product";

export function ProductsGrid({ products, getCartItems }) {

  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          < Product key={product.id} product={product} getCartItems={getCartItems} />
        );
      })}
    </div>
  );
}
