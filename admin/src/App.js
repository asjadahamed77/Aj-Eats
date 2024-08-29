import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddFoods from "./pages/AddFoods";
import ViewFoods from "./pages/ViewFoods";
import ViewUsers from "./pages/ViewUsers";
import ViewOrders from "./pages/ViewOrders";
import Advertisement from "./pages/Advertisement";
import Homepage from "./pages/Homepage";
import ViewAdvertisements from "./pages/ViewAdvertisements";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Navbar />
        <Sidebar />
        <div className="ml-[205px] mt-[55px]">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="add-foods" element={<AddFoods />} />
            <Route path="view-foods" element={<ViewFoods />} />
            <Route path="view-users" element={<ViewUsers />} />
            <Route path="view-orders" element={<ViewOrders />} />
            <Route path="advertisement" element={<Advertisement />} />
            <Route path="view-advertisement" element={<ViewAdvertisements />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
