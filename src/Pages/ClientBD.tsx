import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface Client {
  client_id: string;
  name: string;
  lastname: string;
  age?: number | null;
  email: string;
  created_at?: string;
}

function ClientBD() {
  const [client, setClient] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("client")
          .select(`
            client_id,
            name,
            lastname,
            age,
            email,
            created_at
          `)
          .is("deleted_at", null);

        if (error) throw error;
        setClient(data || []);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
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
      ) : client.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#2b2b2b" }}>
          <thead>
            <tr style={{ backgroundColor: "#444", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #555" }}>ID Cliente</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Nombre Completo</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Edad</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Email</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Registrado</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {client.map((c) => (
              <tr key={c.client_id}>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{c.client_id.slice(0, 8)}...</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{c.name} {c.lastname}</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{c.age ?? "No especificado"}</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{c.email}</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>{c.created_at ? new Date(c.created_at).toLocaleDateString() : "N/A"}</td>
                <td style={{ padding: "10px", border: "1px solid #555" }}>
                  <button
                    onClick={() => navigate(`/TicketFinal?client_id=${c.client_id}`)}
                    style={{
                      backgroundColor: "#0d6efd",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientBD;
