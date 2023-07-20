import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import AppRouter from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./features/redux/app/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider  clientId={'761849749944-pi94r5hl0n2t0ql4q7n08hl2a212k386.apps.googleusercontent.com'}> 
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={AppRouter} />
      </ThemeProvider>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
