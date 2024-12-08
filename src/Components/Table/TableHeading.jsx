import React, { useState } from "react";
import Button from "../Button";

const TableHeading = ({
  deleteSelectedProducts,
  searchRequests
}) => {
  const [openBtn, setopenBtn] = useState(false);

  function tooglebtn({}) {
    setopenBtn(!openBtn);
    console.log("tooglebtn");
  }


  const itemchange = (e) => {
    searchRequests(e.target.value);
  };

  return (
    <div class="flex items-center w-full justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-5 bg-white dark:bg-gray-900">
      <div>
        <button
          type="button"
          onClick={tooglebtn}
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          class="inline-flex items-center text-gray-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <span class="sr-only">Action button</span>
          Action
          <svg
            class="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {/* <!-- Dropdown menu --> */}

        {openBtn && (
          <div
            id="dropdownAction"
            class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <Button
              onClick={deleteSelectedProducts}
              className=" bg-red-500  font-light text-center text-xs "
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <label for="table-search" class="sr-only">
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search-users"
          class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search ..."
          onChange={itemchange}
        />
      </div>
    </div>
  );
};

export default TableHeading;
