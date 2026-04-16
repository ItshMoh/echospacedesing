import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Spaces from './pages/Spaces';
import Create from './pages/Create';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}
