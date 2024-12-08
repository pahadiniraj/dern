import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { GiAutoRepair } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";

import { FiBookOpen } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import useDashboard from "../CustomHooks/dashboard";

const Navbar = () => {
  const { user, userloading, usererror } = useSelector((state) => state.user);
  const {
    dashboardList,
    setdashboardList,
    isLoading,
    error,
    fetchDashboardLists,
  } = useDashboard();

  const navmenu = [
    {
      name: "Request Quotation",
      path: "/",
      icon: <IoTicket size={20} />,
    },
    {
      name: "Articles",
      path: "/articles",
      icon: <FiBookOpen size={20} />,
    },
  ];

  if (user && user.roles && user.roles.some((role) => role.name === "admin")) {
    navmenu.push(
      {
        name: "Repair Job",
        path: "/repair",
        message: dashboardList?.repairList || 0,
        icon: <GiAutoRepair size={20} />,
      },
      {
        name: "Spare Part",
        path: "/sparePart",
        icon: <FaComputer size={20} />,
      },
      {
        name: "Job Management",
        path: "/dailyJob",
        icon: <MdWork size={20} />,
      },
      {
        name: "User List",
        path: "/userLists",
        icon: <FaUsers size={20} />,
      }
    );
    navmenu.unshift({
      name: "Dashboard",
      path: "/dashboard",
      icon: <RxDashboard size={20} />,
    });
  }

  //   <li>
  //   <NavLink
  //     to={`/userLists`}
  //     className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
  //   >
  //     <svg
  //       className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  //       aria-hidden="true"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="currentColor"
  //       viewBox="0 0 17 20"
  //     >
  //       <FaRegUser size={16} />
  //     </svg>
  //     <span className="ms-3">User Manage</span>
  //   </NavLink>
  // </li>

  return (
    <div className=" flex flex-col gap-3">
      {navmenu.map((nav, i) => (
        <li>
          <NavLink
            to={nav.path}
            href="#"
            className={({ isActive }) => `
            flex items-center p-2 rounded-lg text-white group w-full
            ${isActive ? "bg-gray-700" : ""}
        `}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {nav.icon}
            </svg>

            <span className="flex-1 ms-3 whitespace-nowrap">{nav.name}</span>
            {nav.message && (
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {nav.message}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </div>
  );
};

export default Navbar;
