import React, { useEffect, useState } from "react";
import Navbar from "./components/user/Navbar";
// import Login from './components/user/Login/Login';
// import Signup from './components/user/Signup/Signup';
import Footer from "./components/user/Footer";
import { Outlet } from "react-router-dom";

import AdminDashBoard from "./components/admin/AdminLayout";
import AgentDashBoard from "./components/agent/AgentLayout";
import AgentLoginForm from "./components/agent/AgentLogin";

function App() {
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}
export function Agent() {
  const [isAgentLogged, setIsAgentLogged] = useState<string | null>("");

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("agentToken");
      setIsAgentLogged(token);
    };
    getToken();
  }, []);

  return <>{isAgentLogged ? <> <AgentDashBoard /> <Outlet/></> : <AgentLoginForm />}</>;
}

export function Admin() {
  return (
    <>
      <AdminDashBoard />
      <Outlet />
    </>
  );
}

export default App;
