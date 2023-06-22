 import { createBrowserRouter } from 'react-router-dom'
import Login from './components/user/Login/Login'
// import Navbar from './components/user/Header/Navbar'
import App from './App';
import Signup from './components/user/Signup/Signup';
import Body from './components/user/Body/Body';
import AdminLogin from './components/admin/Login/AdminLogin';
import AgentSignupForm from './components/agent/AgentSignup';
import AgentDashBoard from './components/agent/AgentDashBoard';
import { Agent } from './App';
import AgentLoginForm from './components/agent/AgentLogin';
 const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Body/>
            },
            {
                path: 'login',
                element:<Login/>,
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'admin/login',
                element: <AdminLogin/>
            }
        ]
    },
    {
        path: '/agent',
        element: <Agent/>,
        children: [
            {
                path: '/agent',
                element: <AgentDashBoard/>
            },
            {
                path: 'login',
                element: <AgentLoginForm/>
            },
            {
                path: 'signup',
                element: <AgentSignupForm/>
            }
        ]

    }
    
 ]);

 export default AppRouter;