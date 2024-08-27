import { BrowserRouter,Route,Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
     <BrowserRouter>
     <ToastContainer />
     <Navbar />
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login/>} />
      <Route path="cart-page" element={<CartPage />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
