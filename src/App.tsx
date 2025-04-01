
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import ClientsForm from './Pages/ClientsForm';
import ConsumerForm from './Pages/ConsumerForm';
import DetailsForm from './Pages/DetailsForm';
import ProductForm from './Pages/ProductsForm';
import SaleForm from './Pages/SaleForm';
import TicketForm from './Pages/TicketForm';
import Proyecto2 from './Pages/Proyecto2';
import TicketFinal from './Pages/TicketFinal';
import Collections from './Pages/Collections';
import ClientBD from './Pages/ClientBD';
import ConsumerBD from './Pages/ConsumerBD';
import DetailsDB from './Pages/DetailsBD';
import ProductDB from './Pages/ProductBD';
import SaleBD from './Pages/SaleBD';
import TicketBD from './Pages/TicketBD';
import Ticket1 from './Pages/Ticket1';


// Componente principal App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Tareas" element={<Welcome />} />
        <Route path="/123" element={<Ticket1 />} />
        <Route path="/Agregar" element={<ClientsForm />} />
        <Route path="/Consumers" element={<ConsumerForm />} />
        <Route path="/Details" element={<DetailsForm />} />
        <Route path="/Product" element={<ProductForm />} />
        <Route path="/Sale" element={<SaleForm />} />
        <Route path="/Ticket" element={<TicketForm />} />
        <Route path="/Project2" element={<Proyecto2 />} />
        <Route path="/" element={<Collections/>}/>
        <Route path="/ClientBD" element={<ClientBD />} />
        <Route path="/ConsumerBD" element={<ConsumerBD />} />
        <Route path="/DetailsDB" element={<DetailsDB />} />
        <Route path="/ProductDB" element={<ProductDB />} />
        <Route path="/SaleBD" element={<SaleBD />} />
        <Route path="/TicketBD" element={<TicketBD />} />
        <Route path="/TicketFinal" element={<TicketFinal client={{
          name: 'Hola',
          lastname: '',
          age: 0,
          email: ''
        }} consumer={{
          name: '',
          email: '',
          phone: '',
          address: ''
        }} details={{
          amount: 0,
          unit_price: 0,
          subtotal: 0
        }} product={{
          product_name: '',
          product_description: '',
          product_price: 0,
          created_at: '',
          deleted_at: ''
        }} sale={{
          client_id: '',
          sale_date: '',
          total: 0
        }} ticket={{
          sale_id: '',
          fecha_emision: '',
          contenido: ''
        }} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App