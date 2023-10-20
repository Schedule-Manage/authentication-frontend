import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ResetToken from "./pages/Passwrd_forgot_flow/ResetToken";
import NewPassword from "./pages/Passwrd_forgot_flow/NewPassword";
import Landing from "./pages/landing/Landing";
import Media from "./pages/media/Media";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/media" element={<Media />} />

          <Route path="/reset/token" element={<ResetToken />} />
          <Route path="/new/password" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
