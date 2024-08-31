
import './App.css';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Protectedroute from './components/Protectedroute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Protectedroute element={<Home />} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
