import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";
import Edit from "./pages/Edit";
import 'bootstrap/dist/css/bootstrap.css';


function App() {

   return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/:id" element={<ProfilePage />} />
        <Route path="/users/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
