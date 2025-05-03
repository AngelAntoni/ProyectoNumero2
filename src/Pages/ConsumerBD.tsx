import { useEffect, useState } from "react";
import { Consumer } from "../Interfaces/Consumer.tsx";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

function ConsumerBD() {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchConsumers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("consumer").select("*");

      if (error) console.error("Error loading consumers:", error.message);
      else setConsumers(data);

      setLoading(false);
    };

    fetchConsumers();
  }, []);

  return (
    <div>
      <h1>🛍️ LIST OF CONSUMER</h1>
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
      ) : consumers.length === 0 ? (
        <p>No consumers available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#17202a" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Telephone</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((consumer) => (
              <tr key={consumer.consumer_id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{consumer.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{consumer.email || "N/A"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{consumer.telephone}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{consumer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ConsumerBD;
