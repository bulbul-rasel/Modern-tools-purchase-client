import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Signup from './Login/Signup';
import RequireAuth from './authentication/RequireAuth';
import Purchase from './pages/Products/Purchase';
import Dashboard from './Dashboard/Dashboard';
import AddProduct from './pages/Products/AddProduct';
import ManageProduct from './Dashboard/ManageProduct';
import MyOrder from './Dashboard/MyOrder';
import Users from './Dashboard/Users';
import RequireAdmin from './authentication/RequireAdmin';
import Order from './Dashboard/Order';
import MyReview from './Dashboard/MyReview';
import Blog from './components/Blog';
import AddReview from './pages/addPage/AddReview';
import NotFound from './components/NotFound';
import Payment from './Dashboard/Payment';
import Profile from './Dashboard/Profile';
import Extra from './components/Extra';
import MyPortfolio from './components/MyPortfolio';


function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
      <Navbar>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/extra' element={<Extra />}></Route>
          <Route path='/portfolio' element={<MyPortfolio />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/product/:productId' element={<RequireAuth>
            <Purchase />
          </RequireAuth>}></Route>

          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='addProduct' element={<AddProduct />}></Route>
            <Route path='manageProduct' element={<ManageProduct />}></Route>
            <Route path='myReview' element={<MyReview />}></Route>
            <Route path='addReview' element={<AddReview />}></Route>
            <Route path='myOrder' element={<MyOrder />}></Route>
            <Route path='order' element={<Order />}></Route>
            <Route path='payment/:id' element={<Payment />}></Route>
            <Route path='users' element={<RequireAdmin>
              <Users />
            </RequireAdmin>}></Route>
          </Route>
        </Routes>
      </Navbar>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
