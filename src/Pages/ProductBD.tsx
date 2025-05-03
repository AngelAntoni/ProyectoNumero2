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

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#17202a" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Created At</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Deleted At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.product_name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.product_description || "N/A"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>${product.product_price}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.created_at}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.deleted_at ? product.deleted_at : "Not deleted"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductDB;
