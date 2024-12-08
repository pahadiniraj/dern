// © 2024 Niraj Pahadi All rights reserved.

import React from "react";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import useDailyJob from "../../CustomHooks/dailyJob";
import { ClipLoader } from "react-spinners";

const JobIndex = () => {
  const {
    dailyJobList,
    setDailyJobList,
    isLoading,
    error,
    fetchDailyJobLists,
    handlePageClick,
    currentPage,
    pageCount,
    searchRequests,
  } = useDailyJob();
  console.log(dailyJobList);

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" relative w-full h-full">
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Job Managment</h2>
        {/* <Button
        type="button"
        onClick={handleclick}
        className=" bg-green-700 hover:bg-green-900"
      >
        Create Request & Repair
      </Button> */}
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading searchRequests={searchRequests} />
        <Table>
          <Thead>
            <tr>
              {/* <div class="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-all-search" class="sr-only">
                checkbox
              </label>
            </div> */}

              <th scope="col" className="p-4">
                AssignedTo
              </th>
              <th scope="col">Date</th>
              <th scope="col">Priority</th>
              <th scope="col">Repair Product</th>
              <th scope="col">Customer Name</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </Thead>
          <tbody>
            {dailyJobList?.map((dailyJob, index) => (
              <tr
                key=""
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="px-4 py-4">{dailyJob?.assignedToId || "Admin"}</td>

                <td className="px-4 py-4"> {Date(dailyJob.date)}</td>
                <td className="px-4 py-4">{dailyJob.priority || "Medium"}</td>
                <td className="px-4 py-4">
                  {dailyJob.repairJob?.productName}{" "}
                </td>
                <td className="px-4 py-4">
                  {dailyJob.repairJob?.supportRequest?.user?.name}
                </td>
                {/* <td className=" max-w-24">
                  <NavLink to={`/repair/view/`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                    onClick=""
                    href="#"
                    className=" bg-red-500  font-light text-center text-xs"
                  >
                    Delete
                  </Button>
                </td> */}

                {/* <td className=" px-4 py-4 flex gap-2 items-center">
                <NavLink to={``}>
                  <Button
                    href="#"
                    className=" bg-green-500  font-light text-center text-xs"
                  >
                    Edit
                  </Button>
                </NavLink>
      
                <Button
                  onClick={""}
                  href="#"
                  className=" bg-red-500  font-light text-center text-xs"
                >
                  Delete
                </Button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </Table>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount} // Replace with the actual number of pages
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center my-4"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default JobIndex;

// © 2024 Niraj Pahadi All rights reserved.
