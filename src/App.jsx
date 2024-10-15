import React from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

const App = () => {
  const GoogleLogin = () => {
    window.open("http://localhost:3333/auth/google", "_self");
  };
  return <button onClick={GoogleLogin}>Login</button>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
