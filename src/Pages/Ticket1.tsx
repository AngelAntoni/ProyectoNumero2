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
      message.error('Error loading clients');
      console.error('Error loading clients:', error);
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
      message.error('Error loading products');
      console.error('Error loading products:', error);
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
      message.warning('Select a client first');
      return;
    }
    if (cart.length === 0) {
      message.warning('Add products to the cart');
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
  
      message.success('Sale registered successfully');
      setCart([]); 
    } catch (error) {
      message.error('Error processing the sale');
      console.error('Error generating ticket:', error);
    }
  };
  
  const productColumns = [
    { title: 'Product', dataIndex: 'product_name', key: 'product_name' },
    { title: 'Price', dataIndex: 'product_price', key: 'product_price', render: (price: number) => `$${price.toFixed(2)}` },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Button type="primary" icon={<PlusOutlined />} onClick={() => addToCart(record)}>
          Add
        </Button>
      ),
    },
  ];
  
  const cartColumns = [
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, record: CartItem) => (
        <InputNumber min={1} value={record.quantity} onChange={(value) => updateQuantity(record.id, value)} />
      ),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Unit Price', dataIndex: 'price', key: 'price', render: (price: number) => `$${price.toFixed(2)}` },
    { title: 'Subtotal', key: 'subtotal', render: (_: any, record: CartItem) => `$${(record.price * record.quantity).toFixed(2)}` },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Button danger onClick={() => removeFromCart(record.id)}>Remove</Button>
      ),
    },
  ];
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <Card title="Sales System" style={{ maxWidth: 1000, margin: '20px auto' }} extra={<Button onClick={() => navigate(-1)}>Back</Button>}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Search Client:</Text>
          <Select
            showSearch
            style={{ width: '100%', marginTop: 8 }}
            placeholder={loading.clients ? "Loading clients..." : "Select a client"}
            loading={loading.clients}
            value={selectedClient}
            onChange={(value) => setSelectedClient(value)}
            optionFilterProp="children"
            filterOption={(input, option) => {
              const children = option?.children || '';
              return String(children).toLowerCase().includes(input.toLowerCase());
            }}
            notFoundContent={loading.clients ? "Loading..." : "No clients available"}
          >
            {clients.map((client) => (
              <Select.Option 
                key={client.id} 
                value={client.id}
              >
                {[client.name, client.lastname].filter(Boolean).join(' ') || `Client ${client.id.substring(0, 8)}`}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Divider orientation="left">Available Products</Divider>
        <Table columns={productColumns} dataSource={products} rowKey="id" loading={loading.products} pagination={false} size="small" />
        <Divider orientation="left">Shopping Cart</Divider>
        <Table columns={cartColumns} dataSource={cart} rowKey="id" pagination={false} footer={() => <div style={{ textAlign: 'right' }}><Title level={4}>Total: ${total.toFixed(2)}</Title></div>} />
        <Button 
          type="primary" 
          icon={<PrinterOutlined />} 
          onClick={generateTicket} 
          block 
          size="large"
          loading={loading.clients || loading.products}
        >
          GENERATE TICKET
        </Button>
      </Space>
    </Card>
  );
  };
  
  export default Ticket1;
  