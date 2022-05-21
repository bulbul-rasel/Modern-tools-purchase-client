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
        </Routes>
      </Navbar>
      <ToastContainer />
    </div>
  );
}

export default App;
