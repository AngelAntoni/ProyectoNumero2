import { useEffect, useState } from "react";
import { Sale } from "../Interfaces/Sale.tsx";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

function SaleBD() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("sales").select("*");

      if (error) console.error("Error loading sales:", error.message);
      else setSales(data);

      setLoading(false);
    };

    fetchSales();
  }, []);

  return (
    <div>
      <h1>🏷️ LIST OF SALES</h1>
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
      {loading ? <p>Loading...</p> : sales.length === 0 ? <p>No sales available.</p> : (
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              <strong>Sale Date:</strong> {sale.sale_date} <br />
              <strong>Total:</strong> ${sale.total} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SaleBD;
