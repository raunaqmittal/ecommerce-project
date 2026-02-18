import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../../components/Header";
import './trackingPage.css';

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [orderProduct, setOrderProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific order
    axios
      .get(`/api/orders/${orderId}?expand=products`)
      .then((response) => {
        const order = response.data;
        // Find the specific product in the order
        const product = order.products.find(p => p.productId === productId);
        setOrderProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setLoading(false);
      });
  }, [orderId, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderProduct) {
    return <div>Order not found</div>;
  }

  // Calculate delivery status based on estimatedDeliveryTimeMs
  const currentTime = Date.now();
  const deliveryTime = orderProduct.estimatedDeliveryTimeMs;
  const orderTime = currentTime - (7 * 24 * 60 * 60 * 1000); // Assume order was 7 days ago
  const totalTime = deliveryTime - orderTime;
  const elapsedTime = currentTime - orderTime;
  const progress = Math.min((elapsedTime / totalTime) * 100, 100);

  let currentStatus = "Preparing";
  if (progress >= 50 && progress < 100) {
    currentStatus = "Shipped";
  } else if (progress >= 100) {
    currentStatus = "Delivered";
  }

  return (
    <>
      <title>Tracking-Page</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${currentStatus === "Preparing" ? "current-status" : ""}`}>
              Preparing
            </div>
            <div className={`progress-label ${currentStatus === "Shipped" ? "current-status" : ""}`}>
              Shipped
            </div>
            <div className={`progress-label ${currentStatus === "Delivered" ? "current-status" : ""}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}