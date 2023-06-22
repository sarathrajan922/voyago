 import { createBrowserRouter } from 'react-router-dom'
import Login from './components/user/Login/Login'
// import Navbar from './components/user/Header/Navbar'
import App from './App';
import Signup from './components/user/Signup/Signup';
import Body from './components/user/Body/Body';
import AdminLogin from './components/admin/Login/AdminLogin';
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
                path: '/login',
                element:<Login/>,
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/admin/login',
                element: <AdminLogin/>
            }
        ]
    },
    {
        path: '/agent/signup',
        element: <AgentLoginForm/>

    }
    
 ]);

 export default AppRouter;