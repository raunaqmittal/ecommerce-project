import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";


import "./HomePage.css";

export function HomePage({ cart }) {

  const [products, setProductsData] = useState([]);
  

  useEffect(() => {
    axios.get("/api/products")
      .then((response)=>{
        setProductsData(response.data);
      })
    
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
