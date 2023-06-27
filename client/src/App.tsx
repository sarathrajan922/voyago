import React from 'react';
import Navbar from './components/user/Navbar';
// import Login from './components/user/Login/Login';
// import Signup from './components/user/Signup/Signup';
import Footer from './components/user/Footer';
import { Outlet } from 'react-router-dom';

import AdminDashBoard from './components/admin/AdminLayout';
import AgentDashBoard from './components/agent/AgentLayout';

function App() {
  return (
    <>
   <Navbar/>
  
   <Outlet/>
   <Footer/>
    </>
  );
}
export function Agent() {
  return (
    <>
  <AgentDashBoard/>
   <Outlet/>


    </>
  );
}

export function Admin(){
  return (
    <> 
    {/* replace nav bar with admin navbar */}

      <AdminDashBoard/>
       <Outlet/>

    {/* replace footer with admin footer */}
  
    </>
  )
}




export default App
