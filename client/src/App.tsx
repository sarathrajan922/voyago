import React from 'react';
import Navbar from './components/user/Header/Navbar';
// import Login from './components/user/Login/Login';
// import Signup from './components/user/Signup/Signup';
import Footer from './components/user/footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
   <Navbar/>
   {/* <Login/>
   <Signup/> */}
   <Outlet/>
   <Footer/>
    </>
  );
}
export function Agent() {
  return (
    <>
    {/* replace navbar with agent  navbar*/}
   <Navbar/> 
   {/* <Login/>
   <Signup/> */}
   <Outlet/>

   {/* replace footer with agent footer */}
   <Footer/>
    </>
  );
}




export default App
