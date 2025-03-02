
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import ClientsForm from './Pages/ClientsForm';

// Componente principal App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Agregar" element={<ClientsForm />} />
  
      </Routes>
    </BrowserRouter>
  );
}
//cambios
export default App