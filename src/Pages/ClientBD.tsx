import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface Client {
  name: string;
  email: string;
  telephone: string;
  address: string;
}

function ClientBD() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("client").select("*");

      if (error) console.error("Error loading clients:", error.message);
      else setClients(data);

      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#1a1a1a", color: "white", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>👨🏻‍💼 LISTA DE CLIENTES</h1>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#0d0df3",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Volver
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : clients.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#2b2b2b" }}>
          <thead>
            <tr style={{ backgroundColor: "#444", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Nombre Completo</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{client.name}</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{client.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientBD;
