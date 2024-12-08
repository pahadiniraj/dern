import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
import http from "../Utils/http";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../Store/userSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
      <div className="flex h-screen font-poopins">
        <Sidebar />
        <div className="flex-1 p-4 bg-black overflow-y-auto">
          <ToastContainer />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
