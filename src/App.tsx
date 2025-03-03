
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import ClientsForm from './Pages/ClientsForm';
import ConsumerForm from './Pages/ConsumerForm';
import DetailsForm from './Pages/DetailsForm';
import ProductForm from './Pages/ProductsForm';
import SaleForm from './Pages/SaleForm';
import TicketForm from './Pages/TicketForm';

// Componente principal App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Agregar" element={<ClientsForm />} />
        <Route path="/Consumers" element={<ConsumerForm />} />
        <Route path="/Details" element={<DetailsForm />} />
        <Route path="/Product" element={<ProductForm />} />
        <Route path="/Sale" element={<SaleForm />} />
        <Route path="/Ticket" element={<TicketForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App