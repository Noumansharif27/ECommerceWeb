import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Edit from "./pages/Edit";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "", // setting the token from ocalstorage so when we refresh the page we will be still login
  );

  useEffect(() => {
    // storing the token into local storage so that we dont loose it after loading the page.
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray50 min-h-scree">
      <ToastContainer />

      {token == "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/:productId" element={<Edit token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
