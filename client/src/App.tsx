import React from 'react';
import Navbar from './components/user/Navbar';
// import Login from './components/user/Login/Login';
// import Signup from './components/user/Signup/Signup';
import Footer from './components/user/Footer';
import { Outlet } from 'react-router-dom';
import Login from './components/user/Login';

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
   {/* <Navbar/>  */}
   {/* <Login/>
   <Signup/> */}
   <Outlet/>

   {/* replace footer with agent footer */}
   {/* <Footer/> */}
    </>
  );
}

export function Admin(){
  return (
    <> 
    {/* replace nav bar with admin navbar */}


    <Outlet/>

    {/* replace footer with admin footer */}
  
    </>
  )
}




export default App
