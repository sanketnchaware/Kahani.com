// src/Login.js
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    window.open("http://localhost:3333/auth/google", "_self");
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Kahani.com
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Kahani Suno, Tum Jubani Suno..
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200 mb-4"
          >
            Log In
          </button>
        </form>

        <button
          onClick={handleLogin}
          className="w-full bg-white text-blue-600 font-semibold py-2 rounded border border-blue-600 hover:bg-blue-50 transition duration-200"
        >
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>
          <a href="#" className="text-blue-600 hover:underline">
            Create new account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
