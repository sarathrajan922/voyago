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
                element: <AdminDashBoard/>

            },
            {
                path: 'login',
                element: <AdminLogin/>
            }
        ]
        
    }
    
 ]);

 export default AppRouter;