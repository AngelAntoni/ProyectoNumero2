import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Table, Divider, Space, message } from 'antd';
import { PrinterOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface TicketProduct {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface TicketData {
  client: {
    name: string;
    id: string;
  };
  products: TicketProduct[];
  total: number;
  date: string;
  saleId: string;
}

const TicketFinal = () => {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('currentTicket');
    if (data) {
      setTicketData(JSON.parse(data));
    } else {
      navigate('/');
      message.warning('No hay datos de ticket para mostrar');
    }
  }, [navigate]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (ticketRef.current) {
      printWindow?.document.write(`
        <html>
          <head>
            <title>Ticket ${ticketData?.saleId || ''}</title>
            <style>
              @page { size: 80mm 100mm; margin: 0; }
              body { padding: 10px; font-size: 12px; }
            </style>
          </head>
          <body>
            ${ticketRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      setTimeout(() => {
        printWindow?.print();
      }, 500);
    }
  };

  if (!ticketData) return <div>Cargando ticket...</div>;

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (subtotal: number) => `$${subtotal.toFixed(2)}`
    },
  ];

  return (
<div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
  <div ref={ticketRef} style={{ padding: '20px', border: '1px dashed #ddd', background: 'black' }}>
    <Title level={4} style={{ textAlign: 'center', color: '#4CAF50' }}>TICKET DE VENTA</Title>
    <Text strong style={{ color: '#0000FF' }}>No. Ticket: </Text>{ticketData.saleId}<br />
    <Text strong style={{ color: '#FF5733' }}>Fecha: </Text>{ticketData.date}<br />
    <Text strong style={{ color: '#8A2BE2' }}>Cliente: </Text>{ticketData.client.name || 'Consumidor final'}<br />
    <Divider orientation="left" style={{ color: '#008080', borderColor: '#008080' }}>
    Detalles
    </Divider>

        <Table 
          columns={columns} 
          dataSource={ticketData.products} 
          pagination={false}
          size="small"
          rowKey="name"
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3} align="right">
                <Text strong>Total:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong>${ticketData.total.toFixed(2)}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
        
        <Divider />
        <Text type="secondary" style={{ textAlign: 'center', display: 'block', color: '#FF6347' }}>
        ¡Gracias por su compra!
      </Text>

      </div>

      <Space className="no-print" style={{ marginTop: '20px', justifyContent: 'center', width: '100%' }}>
        <Button 
          type="primary" 
          icon={<PrinterOutlined />} 
          onClick={() => handlePrint()} 
        >
          Imprimir Ticket
        </Button>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </Space>
    </div>
  );
};

export default TicketFinal;