 import { createBrowserRouter } from 'react-router-dom'
import Login from './components/user/Login'

import App from './App';
import Signup from './components/user/Signup';
import Body from './components/user/Body/Body';
import AdminLogin from './components/admin/AdminLogin';
import AgentSignupForm from './components/agent/AgentSignup';
import AgentDashBoard from './components/agent/AgentDashBoard';
import { Agent, Admin } from './App';
import AgentLoginForm from './components/agent/AgentLogin';

import AdminDashBoard from './components/admin/AdminDashBoard';
import AdminUser from './components/admin/Body/AdminUser';
import AdminAgents from './components/admin/Body/AdminAgents';
import AdminDash from './components/admin/Body/DashBoard';
import AdminAgentVerification from './components/admin/Body/AdminAgentVerification';
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

    },
    {
        path: '/admin',
        element: <Admin/>,
        children: [
            {
                path: '/admin',
                element: <AdminDash/>

            },
            {
                path: 'login',
                element: <AdminLogin/>
            },
            {
                path: 'users',
                element: <AdminUser/>
            },
            {
                path: 'agents',
                element: <AdminAgents/>
            },
            {
                path: 'agents-verification',
                element: <AdminAgentVerification/>
            }
        ]
        
    }
    
 ]);

 export default AppRouter;