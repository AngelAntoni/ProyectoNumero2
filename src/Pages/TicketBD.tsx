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
      ) : (
        <>
          {tickets.length === 0 ? (
            <p>There are no tickets.</p>
          ) : (
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <strong>Issue date:</strong> {ticket.fecha_emision} <br />
                  <strong>Content:</strong> {ticket.contenido} <br />
                  <br />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default TicketBD;