import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignInPage from './pages/SignIn.tsx';
import SignUpPage from './pages/SignUp.tsx';
import ConfirmSignUp from './pages/ConfirmSignUp.tsx';
import OTPPage from './pages/OTP.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <SignInPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/confirm",
    element: <ConfirmSignUp />
  },
  {
    path: "/mfa",
    element: <SignUpPage />
  },
  {
    path: "/confirm_mfa",
    element: <SignUpPage />
  },
  {
    path: "/otp",
    element: <OTPPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
