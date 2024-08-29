import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddFoods from './pages/AddFoods';
import ViewFoods from './pages/ViewFoods';
import ViewUsers from './pages/ViewUsers';
import ViewOrders from './pages/ViewOrders';
import Advertisement from './pages/Advertisement';
import Homepage from './pages/Homepage';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Sidebar />
   <div className='ml-[205px] mt-[55px]'>
   <Routes>
   <Route path='/' element={<Homepage />} />
<Route path='add-foods' element={<AddFoods />} />
<Route path='view-foods' element={<ViewFoods />} />
<Route path='view-users' element={<ViewUsers />} />
<Route path='view-orders' element={<ViewOrders />} />
<Route path='advertisement' element={<Advertisement />} />
      </Routes>
   </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
