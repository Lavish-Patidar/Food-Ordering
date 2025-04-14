import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Account/Login';
import Signup from './Components/Account/Signup';
import Home from './Pages/Home';
import AdminDashboard from './Components/Admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
