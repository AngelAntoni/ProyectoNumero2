
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
        <Route path="/" element={<ClientsForm />} />
        <Route path="/Consumers" element={<ConsumerForm />} />
        <Route path="/Details" element={<DetailsForm />} />
        <Route path="/Product" element={<ProductForm />} />
        <Route path="/Sale" element={<SaleForm />} />
        <Route path="/Ticket" element={<TicketForm />} />
        <Route path="/Project2" element={<Proyecto2 />} />
        <Route path="/collections" element={<Collections/>}/>
        <Route path="/ClientBD" element={<ClientBD />} />
        <Route path="/ConsumerBD" element={<ConsumerBD />} />
        <Route path="/DetailsDB" element={<DetailsDB />} />
        <Route path="/ProductDB" element={<ProductDB />} />
        <Route path="/SaleBD" element={<SaleBD />} />
        <Route path="/TicketBD" element={<TicketBD />} />
        <Route path="/TicketFinal" element={<TicketFinal/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App