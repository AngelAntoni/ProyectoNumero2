import { useEffect, useState } from "react";
import { DetailsSale } from "../Interfaces/Details_sale.tsx";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

function DetailsDB() {
  const [detailsSale, setDetailsSale] = useState<DetailsSale[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchDetailsSale = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("details_sale").select("*");

      if (error) console.error("Error loading details sale:", error.message);
      else setDetailsSale(data);

      setLoading(false);
    };

    fetchDetailsSale();
  }, []);

  return (
    <div>
      <h1>📊 LIST OF SALE DETAILS</h1>

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

      {loading ? <p>Loading...</p> : detailsSale.length === 0 ? 
      <p>No sale details available.</p> : (
        <ul>
          {detailsSale.map((detail) => (
            <li key={detail.id}>
              <strong>Amount:</strong> {detail.amount} <br />
              <strong>Unit Price:</strong> ${detail.unit_price} <br />
              <strong>Subtotal:</strong> ${detail.subtotal} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DetailsDB;
