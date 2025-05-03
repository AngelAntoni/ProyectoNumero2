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

      {loading ? (
        <p>Loading...</p>
      ) : sales.length === 0 ? (
        <p>No sales available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#17202a" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sale Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{sale.sale_date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>${sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SaleBD;
