import { useEffect, useState } from "react";
import { Product } from "../Interfaces/Products.tsx";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

function ProductDB() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) console.error("Error loading products:", error.message);
      else setProducts(data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>🛒 LIST OF PRODUCTS</h1>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          backgroundColor: "#0d0df3",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Go Back
      </button>
      {loading ? <p>Loading...</p> : products.length === 0 ? <p>No products available.</p> : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>Name:</strong> {product.product_name} <br />
              <strong>Description:</strong> {product.product_description || "N/A"} <br />
              <strong>Price:</strong> ${product.product_price} <br />
              <strong>Created At:</strong> {product.created_at} <br />
              <strong>Deleted At:</strong> {product.deleted_at ? product.deleted_at : "Not deleted"} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductDB;
