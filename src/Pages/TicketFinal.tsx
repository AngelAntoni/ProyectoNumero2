import React from "react";
import { Card, Typography, Divider } from "antd";

const { Title, Text } = Typography;

interface TicketFinalProps {
  client: {
    name: string;
    lastname: string;
    age: number;
    email: string;
  };
  consumer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  details: {
    amount: number;
    unit_price: number;
    subtotal: number;
  };
  product: {
    product_name: string;
    product_description: string;
    product_price: number;
    created_at: string;
    deleted_at: string;
  };
  sale: {
    client_id: string;
    sale_date: string;
    total: number;
  };
  ticket: {
    sale_id: string;
    fecha_emision: string;
    contenido: string;
  };
}

const TicketFinal: React.FC<TicketFinalProps> = ({
  client,
  consumer,
  details,
  product,
  sale,
  ticket,
}) => {
  return (
    <Card title="Ticket Final" style={{ width: 400, margin: "20px auto" }}>
      {/* Detalles del Cliente */}
      <Title level={4}>Información del Cliente</Title>
      <Text strong>Nombre: </Text>
      <Text>
        {client.name} {client.lastname}
      </Text>
      <br />
      <Text strong>Edad: </Text>
      <Text>{client.age}</Text>
      <br />
      <Text strong>Email: </Text>
      <Text>{client.email}</Text>
      <Divider />

      {/* Detalles del Consumidor */}
      <Title level={4}>Información del Consumidor</Title>
      <Text strong>Nombre: </Text>
      <Text>{consumer.name}</Text>
      <br />
      <Text strong>Email: </Text>
      <Text>{consumer.email}</Text>
      <br />
      <Text strong>Teléfono: </Text>
      <Text>{consumer.phone}</Text>
      <br />
      <Text strong>Dirección: </Text>
      <Text>{consumer.address}</Text>
      <Divider />

      {/* Detalles de la Venta */}
      <Title level={4}>Detalles de la Venta</Title>
      <Text strong>Cantidad: </Text>
      <Text>{details.amount}</Text>
      <br />
      <Text strong>Precio Unitario: </Text>
      <Text>${details.unit_price}</Text>
      <br />
      <Text strong>Subtotal: </Text>
      <Text>${details.subtotal}</Text>
      <Divider />

      {/* Detalles del Producto */}
      <Title level={4}>Información del Producto</Title>
      <Text strong>Nombre del Producto: </Text>
      <Text>{product.product_name}</Text>
      <br />
      <Text strong>Descripción: </Text>
      <Text>{product.product_description}</Text>
      <br />
      <Text strong>Precio: </Text>
      <Text>${product.product_price}</Text>
      <br />
      <Text strong>Fecha de Creación: </Text>
      <Text>{product.created_at}</Text>
      <br />
      <Text strong>Fecha de Eliminación: </Text>
      <Text>{product.deleted_at}</Text>
      <Divider />

      {/* Detalles de la Venta */}
      <Title level={4}>Información de la Venta</Title>
      <Text strong>ID del Cliente: </Text>
      <Text>{sale.client_id}</Text>
      <br />
      <Text strong>Fecha de Venta: </Text>
      <Text>{sale.sale_date}</Text>
      <br />
      <Text strong>Total: </Text>
      <Text>${sale.total}</Text>
      <Divider />

      {/* Detalles del Ticket */}
      <Title level={4}>Información del Ticket</Title>
      <Text strong>ID de Venta: </Text>
      <Text>{ticket.sale_id}</Text>
      <br />
      <Text strong>Fecha de Emisión: </Text>
      <Text>{ticket.fecha_emision}</Text>
      <br />
      <Text strong>Contenido: </Text>
      <Text>{ticket.contenido}</Text>
      <Divider />

      {/* Total */}
      <Title level={4}>Total</Title>
      <Text strong>Total a Pagar: </Text>
      <Text>${sale.total}</Text>
    </Card>
  );
};

export default TicketFinal;