import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.ts';
import { Product } from './Interfaces/Products.tsx';
import { Client } from './Interfaces/Client.tsx';
import { Consumer } from './Interfaces/Consumer.tsx';
import { DetailsSale } from './Interfaces/Details_sale.tsx';
import { Sale } from './Interfaces/Sale.tsx';
import { Ticket } from './Interfaces/Ticket.tsx';


function App() {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [sale, setSale] = useState<Sale[]>([]);
  const [detailsSale, setdetailsSale] = useState<DetailsSale[]>([]);
  const [consumer, setConsumer ] = useState<Consumer[]>([]);
  const [client, setClient] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Llamar a la tabla de Supabase
      const { data: ticketData,error: ticketError} = await supabase.from('tickets').select('*');
      const { data: saleData,error: saleError} = await supabase.from('sales').select('*');
      const { data: detailsSale,error: detailsSaleError} = await supabase.from('details_sale').select('*');
      const { data: ConsumerData, error: consumerError} = await supabase.from('consumer').select('*');
      const { data: ClientData, error: clientError } = await supabase.from('client').select('*');
      const { data: productData, error: productError } = await supabase.from('products').select('*');

      // Manejar el error de la consulta de productos
      if (productError) {
        console.error('Error loading products:', productError.message);
        setLoading(false);
        return;
      }

      if (clientError) {
        console.error('Error loading clients:', clientError.message);
        setLoading(false);
        return;
      }

      if (consumerError) {
        console.error('Error loading consumer:', consumerError.message);
        setLoading(false);
        return;
      }

      if (detailsSaleError) {
        console.error('Error loading consumer:', detailsSaleError.message);
        setLoading(false);
        return;
      }

      if (saleError) {
        console.error('Error loading Sales:', saleError.message);
        setLoading(false);
        return;
      }

      if (ticketError) {
        console.error('Error loading tickets:', ticketError.message);
        setLoading(false);
        return;
      }

      setClient(ClientData);
      setLoading(false);

      setConsumer(ConsumerData);
      setLoading(false);

      setdetailsSale(detailsSale);
      setLoading(false)


      setProducts(productData);
      setLoading(false);

      setSale(saleData);
      setLoading(false);

      setTicket(ticketData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Base de Datos de Supabase en pagina de React</h1>
      <h1>List Of Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {products.length === 0 ? (
            <p>There are no products available.</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <strong>Name of Product :</strong> {product.product_name} <br />
                  <strong>Description:</strong> {product.product_description || 'N/A'} <br />
                  <strong>Price of product:</strong> ${product.product_price} <br />
                  <strong>Date Elimination :</strong> {product.deleted_at ? product.deleted_at : 'No eliminado'} <br />
                  <strong>Date of Create:</strong> {product.created_at } <br />
                  <br />  
                </li>

              ))}
            </ul>
          )}
        </>


      )}
      <h1>List Of Clients</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {client.length === 0 ? (
            <p>There are no clients in the list.</p>
          ) : (
            <ul>
              {client.map((client) => (
                <li key={client.client_id}>
                  <strong>Name of client:</strong> {client.name} <br />
                  <strong>last name client:</strong> {client.lastname || 'N/A'} <br />
                  <strong>Client Age:</strong> ${client.age} <br />
                  <strong>Email:</strong> {client.email} <br />
                  <strong>Paswword:</strong> {client.password} <br />
                  <br />
                </li>
              ))}
            </ul>
          )}
        </>


      )}
      <h1>List Of Consumer</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {consumer.length === 0 ? (
            <p>There are no consumers on the list.</p>
          ) : (
            <ul>
              {consumer.map((consumer) => (
                <li key={consumer.consumer_id}>
                  <strong>Name of consumer :</strong> {consumer.name} <br />
                  <strong>Email:</strong> {consumer.email || 'N/A'} <br />
                  <strong>telephone:</strong> {consumer.telephone } <br />
                  <strong>address:</strong> {consumer.address} <br />
                  <br />  
                </li>

              ))}
            </ul>
          )}
        </>


      )}
      <h1>List of Details Sale</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {detailsSale.length === 0 ? (
            <p>There are no sales details.</p>
          ) : (
            <ul>
              {detailsSale.map((detailsSale) => (
                <li key={detailsSale.id}>
                  <strong>Amount:</strong> {detailsSale.amount } <br />
                  <strong>Unit per price:</strong> {detailsSale.unit_price} <br />
                  <strong>Subtotal:</strong> {detailsSale.subtotal} <br />
                  <br />  
                </li>

              ))}
            </ul>
          )}
        </>


      )}
      <h1>List of Sales</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sale.length === 0 ? (
            <p>There are no Sales.</p>
          ) : (
            <ul>
              {sale.map((sale) => (
                <li key={sale.id}>
                  <strong>Sale Date:</strong> {sale.sale_date} <br />
                  <strong>Total:</strong> {sale.total } <br />
                  <br />  
                </li>

              ))}
            </ul>
          )}
        </>


      )}
            <h1>List of Ticket</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {ticket.length === 0 ? (
            <p>There are no Tickets.</p>
          ) : (
            <ul>
              {ticket.map((ticket) => (
                <li key={ticket.id}>
                  <strong>Issue date:</strong> {ticket.fecha_emision} <br />
                  <strong>Content:</strong> {ticket.contenido } <br />
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

export default App;
