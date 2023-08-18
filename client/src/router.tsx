import { createBrowserRouter } from "react-router-dom";
import Login from "./components/user/Login/Login";

import App from "./App";
import Body from "./components/user/Pages/Body";
import AdminLogin from "./components/admin/Login/AdminLogin";
import AgentSignupForm from "./components/agent/Signup/AgentSignup";

import { Agent, Admin } from "./App";
import AgentLoginForm from "./components/agent/Login/AgentLogin";

import AdminUser from "./components/admin/Body/pages/AdminUser";
import AdminAgents from "./components/admin/Body/pages/AdminAgents";
import AdminDash from "./components/admin/Body/pages/DashBoard";
import AdminAgentVerification from "./components/admin/Body/pages/AdminAgentVerification";
import AgentDash from "./components/agent/Pages/AgentDash";
import AgentCategory from "./components/agent/Pages/CategoryManagement";

import AddTourPackageForm from "./components/agent/Pages/AddPackage";
import AgentPackages from "./components/agent/Pages/AgentPackages";
import EditTourPackageForm from "./components/agent/Pages/EditPackage";
import PackageDetails from "./components/user/Pages/PackageDetails";
import PaymentPage from "./components/user/Pages/PaymentPage";
import UserProfile from "./components/user/Pages/Profile";
import UserProfileEdit from "./components/user/Pages/ProfileEdit";
import BookingDetailsComponent from "./components/user/Pages/BookingDetails";
import AgentAllBookings from "./components/agent/Pages/AllBookings";
import AgentProfile from "./components/agent/Pages/AgentProfile";
import AgentProfileEdit from "./components/agent/Pages/AgentProfileEdit";
import Community from "./components/user/chat/Community";
import SearchComponent from "./components/user/Pages/Search";
import UserPasswordEdit from "./components/user/Pages/passwordEdit";
import EmailVerificationComponent from "./components/user/forgotPassword/emailVerification";
import OTPVerificationComponent from "./components/user/forgotPassword/otpVerifcation";
import ChangePasswordComponent from "./components/user/forgotPassword/changePassword";
import ContactComponent from "./components/user/Pages/Contact";
import Signup from "./components/user/Signup/signupComponent";
import Error from "./components/common/Error";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "login",
        element: <Login />,
        
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "user-profile-edit",
        element: <UserProfileEdit />,
      },
      {
        path: "/user-edit-password",
        element: <UserPasswordEdit />,
      },

      {
        path: "search",
        element: <SearchComponent />,
      },
      {
        path: "package-details/:id",
        element: <PackageDetails />,
      },
      {
        path: "search/package-details/:id",
        element: <PackageDetails />,
      },
      {
        path: "payment/:id",
        element: <PaymentPage />,
      },
      {
        path: "booked-details",
        element: <BookingDetailsComponent />,
      },
      {
        path: "forgot-password",
        element: <EmailVerificationComponent />,
      },
      {
        path: "otp-verification/:email",
        element: <OTPVerificationComponent />,
      },
      {
        path: "change-password-with-email/:email",
        element: <ChangePasswordComponent />,
      },
      {
        path: "contact",
        element: <ContactComponent />,
      },
    ],
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/agent",
    element: <Agent />,
    children: [
      {
        path: "/agent",
        element: <AgentDash />,
      },

      {
        path: "category",
        element: <AgentCategory />,
      },
      {
        path: "add-package",
        element: <AddTourPackageForm />,
      },
      {
        path: "packages",
        element: <AgentPackages />,
      },
      {
        path: "edit-package/:id",
        element: <EditTourPackageForm />,
      },
      {
        path: "all-bookings",
        element: <AgentAllBookings />,
      },
      {
        path: "profile",
        element: <AgentProfile />,
      },
      {
        path: "agent-profile-edit",
        element: <AgentProfileEdit />,
      },
    ],
  },
  {
    path: "agent/login",
    element: <AgentLoginForm />,
  },
  {
    path: "agent/signup",
    element: <AgentSignupForm />,
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <AdminDash />,
      },
      {
        path: "users",
        element: <AdminUser />,
      },
      {
        path: "agents",
        element: <AdminAgents />,
      },
      {
        path: "agents-verification",
        element: <AdminAgentVerification />,
      },
    ],
  },
]);

export default AppRouter;
