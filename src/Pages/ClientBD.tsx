import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Table, Button, Spin, message, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface Client {
  client_id: string;
  name: string;
  lastname: string;
  age?: number | null;
  email: string;
  password?: string;
}

function ClientBD() {
  const [client, setClient] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("client")
          .select(`
            client_id,
            name,
            lastname,
            age,
            email,
            created_at
          `)
          .is('deleted_at', null); // Excluye clientes eliminados

        if (error) throw error;

        console.log("Datos recibidos:", data);
        setClient(data || []);
      } catch (error) {
        console.error("Error completo:", error);
        message.error("Error al cargar clientes");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const columns: ColumnsType<Client> = [
    {
      title: "ID Cliente",
      dataIndex: "client_id",
      key: "client_id",
      render: (id) => <Tag color="blue">{id.substring(0, 8)}...</Tag>,
    },
    {
      title: "Nombre Completo",
      key: "full_name",
      render: (_, record) => `${record.name} ${record.lastname}`,
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
      render: (age) => age ?? <Tag color="gray">No especificado</Tag>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registrado",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/TicketFinal?client_id=${record.client_id}`)}
        >
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>👨🏻‍💼 LISTA DE CLIENTES</h1>
      <Button
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
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : client.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <Table 
          dataSource={client} 
          columns={columns} 
          rowKey="client_id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      )}
    </div>
  );
}

export default ClientBD;
