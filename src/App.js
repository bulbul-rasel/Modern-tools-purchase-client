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
import Footer from './components/Footer';
import RequireAuth from './authentication/RequireAuth';
import Purchase from './pages/Products/Purchase';
import Dashboard from './Dashboard/Dashboard';
import AddProduct from './pages/Products/AddProduct';
import ManageProduct from './Dashboard/ManageProduct';
import ManageItem from './pages/Products/ManageItem';


function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
      <Navbar>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/manageItem' element={<ManageItem />}></Route>
          <Route path='/product/:productId' element={<RequireAuth>
            <Purchase />
          </RequireAuth>}></Route>
          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route path='addProduct' element={<AddProduct />}></Route>
            <Route path='manageProduct' element={<ManageProduct />}></Route>
          </Route>
        </Routes>
      </Navbar>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
