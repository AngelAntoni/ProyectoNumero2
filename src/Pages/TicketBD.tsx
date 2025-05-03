import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

interface Ticket {
  id: number;
  fecha_emision: string;
  contenido: string;
}

function TicketBD() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("tickets").select("*");

      if (error) {
        console.error("Error loading tickets:", error.message);
      } else {
        setTickets(data as Ticket[]);
      }
      setLoading(false);
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>📑 LIST OF TICKETS</h1>
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
      ) : tickets.length === 0 ? (
        <p>There are no tickets.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#17202a" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Issue Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Content</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ticket.fecha_emision}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ticket.contenido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TicketBD;
