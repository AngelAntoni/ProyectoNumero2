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
        <ul>
          {consumers.map((consumer) => (
            <li key={consumer.consumer_id}>
              <strong>Name of consumer:</strong> {consumer.name} <br />
              <strong>Email:</strong> {consumer.email || "N/A"} <br />
              <strong>Telephone:</strong> {consumer.telephone} <br />
              <strong>Address:</strong> {consumer.address} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConsumerBD;
