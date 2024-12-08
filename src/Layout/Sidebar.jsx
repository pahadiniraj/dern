// © 2024 Niraj Pahadi. All rights reserved.

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Sidebar = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      nav("/");
    } else {
      nav("/login");
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    nav("/login");
  };

  return (
    <div>
      <aside
        id="separator-sidebar"
        className="h-screen md:w-60 transition-transform translate-x-0 w-20"
        aria-label="Sidebar"
      >
        <div className="h-full  py-4 overflow-y-auto bg-gray-50 px-5 dark:bg-gray-800 ">
          <div className="logo flex items-center justify-center my-4">
            <p className="text-white font-semibold text-2xl">DERN-SUPPORT</p>
          </div>

          <ul className="space-y-2 font-medium">
            <Navbar />
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavLink
                to={`/userinfo`}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <IoIosSettings size={20} />
                </svg>
                <span className="ms-3">Setting</span>
              </NavLink>
            </li>
            <li>
              <a
                onClick={(e) => logout(e)}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <CiLogout size={20} />
                </svg>
                <span className="ms-3">LogOut</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

// © 2024 Niraj Pahadi. All rights reserved.
