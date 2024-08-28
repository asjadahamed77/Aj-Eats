import { BrowserRouter,Route,Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signInSuccess } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user info from backend if needed, or directly dispatch user info
      dispatch(signInSuccess({ token }));
      // Alternatively, you could decode the token to get user info
    }
  }, [dispatch]);
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
