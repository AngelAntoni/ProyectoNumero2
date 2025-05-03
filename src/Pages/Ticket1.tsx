import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  Button,
  Table,
  Typography,
  Divider,
  InputNumber,
  Space,
  message,
} from 'antd';
import { PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const { Title, Text } = Typography;

interface Client {
  id: string;
  name: string | null;
  lastname: string | null;
}

interface Product {
  id: number;
  product_name: string;
  product_price: number;
}

interface CartItem {
  id: number;
  description: string;
  price: number;
  quantity: number;
}

interface TicketData {
  client: {
    name: string;
    id: string;
  };
  products: Array<{
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  total: number;
  date: string;
  saleId: string;
}

const Ticket1 = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState({ clients: false, products: false });

  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading((prev) => ({ ...prev, clients: true }));
      const { data, error } = await supabase.from('client').select('*');
      
      if (error) throw error;
      if (!data) return;

      const validClients = data.map(client => ({
        id: client.client_id,
        name: client.name,
        lastname: client.lastname
      }));

      setClients(validClients);
    } catch (error) {
      message.error('Error al cargar clientes');
      console.error('Error al cargar clientes:', error);
    } finally {
      setLoading((prev) => ({ ...prev, clients: false }));
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, products: true }));
      const { data, error } = await supabase.from('products').select('id, product_name, product_price');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      message.error('Error al cargar productos');
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => [
      ...prev,
      { id: product.id, description: product.product_name, price: product.product_price, quantity: 1 },
    ]);
  };

  const updateQuantity = (id: number, value: number | null) => {
    if (value === null) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const generateTicket = async () => {
    if (!selectedClient) {
      message.warning('Selecciona un cliente primero');
      return;
    }
    if (cart.length === 0) {
      message.warning('Agrega productos al carrito');
      return;
    }
    try {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const selectedClientData = clients.find(c => c.id === selectedClient);
      
      
      const { data: saleData, error: saleError } = await supabase
        .from('sales')
        .insert({ 
          client_id: selectedClient, 
          total,
          sale_date: new Date().toISOString() 
        })
        .select()
        .single();
      
      if (saleError) throw saleError;

      
      const saleDetails = cart.map((item) => ({
        sale_id: saleData.id,
        product_id: item.id,
        amount: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      const { error: detailsError } = await supabase.from('details_sale').insert(saleDetails);
      if (detailsError) throw detailsError;

      
      const ticketData: TicketData = {
        client: {
          name: `${selectedClientData?.name || ''} ${selectedClientData?.lastname || ''}`.trim(),
          id: selectedClient
        },
        products: cart.map(item => ({
          name: item.description,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        total,
        date: new Date().toLocaleString(),
        saleId: saleData.id
      };

      
      localStorage.setItem('currentTicket', JSON.stringify(ticketData));
      navigate('/TicketFinal');

      message.success('Venta registrada correctamente');
      setCart([]); 
    } catch (error) {
      message.error('Error al procesar la venta');
      console.error('Error al generar ticket:', error);
    }
  };

  const productColumns = [
    { title: 'Producto', dataIndex: 'product_name', key: 'product_name' },
    { title: 'Precio', dataIndex: 'product_price', key: 'product_price', render: (price: number) => `$${price.toFixed(2)}` },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: Product) => (
        <Button type="primary" icon={<PlusOutlined />} onClick={() => addToCart(record)}>
          Agregar
        </Button>
      ),
    },
  ];

  const cartColumns = [
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, record: CartItem) => (
        <InputNumber min={1} value={record.quantity} onChange={(value) => updateQuantity(record.id, value)} />
      ),
    },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    { title: 'Precio Unitario', dataIndex: 'price', key: 'price', render: (price: number) => `$${price.toFixed(2)}` },
    { title: 'Subtotal', key: 'subtotal', render: (_: any, record: CartItem) => `$${(record.price * record.quantity).toFixed(2)}` },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Button danger onClick={() => removeFromCart(record.id)}>Eliminar</Button>
      ),
    },
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card title="Sistema de Ventas" style={{ maxWidth: 1000, margin: '20px auto' }} extra={<Button onClick={() => navigate(-1)}>Volver</Button>}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Buscar Cliente:</Text>
          <Select
            showSearch
            style={{ width: '100%', marginTop: 8 }}
            placeholder={loading.clients ? "Cargando clientes..." : "Selecciona un cliente"}
            loading={loading.clients}
            value={selectedClient}
            onChange={(value) => setSelectedClient(value)}
            optionFilterProp="children"
            filterOption={(input, option) => {
              const children = option?.children || '';
              return String(children).toLowerCase().includes(input.toLowerCase());
            }}
            notFoundContent={loading.clients ? "Cargando..." : "No hay clientes disponibles"}
          >
            {clients.map((client) => (
              <Select.Option 
                key={client.id} 
                value={client.id}
              >
                {[client.name, client.lastname].filter(Boolean).join(' ') || `Cliente ${client.id.substring(0, 8)}`}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Divider orientation="left">Productos Disponibles</Divider>
        <Table columns={productColumns} dataSource={products} rowKey="id" loading={loading.products} pagination={false} size="small" />
        <Divider orientation="left">Carrito de Compras</Divider>
        <Table columns={cartColumns} dataSource={cart} rowKey="id" pagination={false} footer={() => <div style={{ textAlign: 'right' }}><Title level={4}>Total: ${total.toFixed(2)}</Title></div>} />
        <Button 
          type="primary" 
          icon={<PrinterOutlined />} 
          onClick={generateTicket} 
          block 
          size="large"
          loading={loading.clients || loading.products}
        >
          GENERAR TICKET
        </Button>
      </Space>
    </Card>
  );
};

export default Ticket1;