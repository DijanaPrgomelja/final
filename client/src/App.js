
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <div className="App">
    <Routes>
     <Route path='/' element={<Homepage />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     </Routes>
    </div>
  );
}
 
export default App;
