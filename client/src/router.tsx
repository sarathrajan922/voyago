 import { createBrowserRouter } from 'react-router-dom'
import Login from './components/user/Login'

import App from './App';
import Signup from './components/user/Signup';
import Body from './components/user/Body/Body';
import AdminLogin from './components/admin/AdminLogin';
import AgentSignupForm from './components/agent/AgentSignup';

import { Agent, Admin } from './App';
import AgentLoginForm from './components/agent/AgentLogin';


import AdminUser from './components/admin/Body/AdminUser';
import AdminAgents from './components/admin/Body/AdminAgents';
import AdminDash from './components/admin/Body/DashBoard';
import AdminAgentVerification from './components/admin/Body/AdminAgentVerification';
import AgentDash from './components/agent/Body/AgentDash';
import AgentCategory from './components/agent/Body/CategoryManagement';

import AddTourPackageForm from './components/agent/Body/AddPackage';
import AgentPackages from './components/agent/Body/AgentPackages';
import EditTourPackageForm from './components/agent/Body/EditPackage';
import PackageDetails from './components/user/Body/PackageDetails';
import PaymentPage from './components/user/Body/PaymentPage';
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
            },
          {
                path: 'agent/signup',
                element: <AgentSignupForm/>
            },
            {
                path: 'agent/login',
                element: <AgentLoginForm/>
            },
            {
                path: 'package-details/:id',
                element: <PackageDetails/>
            },
            {
                path: 'payment',
                element: <PaymentPage/>
            }

        ]
    },
    {
        path: '/agent',
        element: <Agent/>,
        children: [
            {
                path: '/agent',
                element: <AgentDash/>
            },
            {
                path: 'category',
                element: <AgentCategory/>
            },
            {
                path: 'add-package',
                element: <AddTourPackageForm/>
            },
            {
                path: 'packages',
                element: <AgentPackages/>
            },
            {
                path: 'edit-package/:id',
                element: <EditTourPackageForm/>
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