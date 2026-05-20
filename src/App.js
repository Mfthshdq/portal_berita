
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FormBerita from './pages/FromBerita';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/form' element={<FormBerita />}></Route>
      <Route path='/form/:id' element={<FormBerita />}></Route>
    </Routes>
  );
}

export default App;
