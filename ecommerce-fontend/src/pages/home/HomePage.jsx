import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";


import "./HomePage.css";

export function HomePage({ cart }) {

  const [products, setProductsData] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
    
  }, []);

  return (
    <>
      <title>ecommerce-project</title>

      <Header cart = {cart} />


      <div className="home-page">
        < ProductsGrid products={products} />
      </div>
    </>
  );
}
