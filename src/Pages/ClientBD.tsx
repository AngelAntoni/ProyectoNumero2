import { useEffect, useState } from "react";
import { Client } from "../Interfaces/Client.tsx";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

function ClientBD() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("client").select("*");

      if (error) {
        console.error("Error loading clients:", error.message);
      } else {
        setClients(data);
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h1>👨🏻‍💼  LIST OF CLIENTS</h1>
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
      ) : clients.length === 0 ? (
        <p>There are no clients available.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.client_id}>
                  <strong>Name of client:</strong> {client.name} <br />
                  <strong>Last name client:</strong> {client.lastname || 'N/A'} <br />
                  <strong>Client Age:</strong> {client.age} <br />
                  <strong>Email:</strong> {client.email} <br />
                  <strong>Password:</strong> {client.password} <br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientBD;
