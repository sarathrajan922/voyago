import React, { useEffect, useState } from "react";
import Navbar from "./components/user/Navbar/Navbar";
// import Login from './components/user/Login/Login';
// import Signup from './components/user/Signup/Signup';
import Footer from "./components/user/Footer/Footer";
import { Outlet } from "react-router-dom";
import { CircleLoader, PropagateLoader, PulseLoader } from "react-spinners";
import AdminDashBoard from "./components/admin/Layout/AdminLayout";
import AgentDashBoard from "./components/agent/Layout/AgentLayout";
import AgentLoginForm from "./components/agent/Login/AgentLogin";

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
  const [islogged, setIslogged] = useState<boolean | null>(null);

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("agentToken");
      setIslogged(true);
      setIsAgentLogged(token);
    };
    getToken();
  }, []);

  return !islogged ? (
    <div className=" w-full flex justify-center  h-full ">
      <div className="py-52">
        <PulseLoader color="#1bacbf " />
      </div>
    </div>
  ) : (
    <>
      {isAgentLogged ? (
        <>
          {" "}
          <AgentDashBoard /> <Outlet />
        </>
      ) : (
        <AgentLoginForm />
      )}
    </>
  );
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
