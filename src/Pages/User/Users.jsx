import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { ClipLoader } from "react-spinners";
import useUserList from "../../CustomHooks/users";
import ReactPaginate from "react-paginate";
import http from "../../Utils/http";

const Users = () => {

  const {
    UserList,
    setUserList,
    isLoading,
    error,
    fetchUserList,
    pageCount,
    handlePageClick,
    searchRequests,
  } = useUserList();

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deleteUser = async (user) => {
    try {
      const res =await http.delete(`/auth/user/${user}`);
      console.log(res);
      toast.success(res.data.message);
      fetchUserList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Users List</h2>
          {/* <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-green-700 hover:bg-green-900"
          >
            Create Users
          </Button>{" "} */}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableHeading searchRequests={searchRequests} />
          <Table>
            <Thead>
              <tr>
                <th scope="col" className="p-4">
                  {/* <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
                  No.
                </th>
                <th scope="col">User name</th>
                <th scope="col">User Role</th>
                <th scope="col">User Permission</th>
                <th scope="col">Action</th>
              </tr>
            </Thead>
            <tbody>
              {UserList?.map((user, index) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {/* <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${user.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${user.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div> */}
                    {index + 1 + "."}
                  </td>

                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">
                    {user?.roles?.map((role) => (
                      <div key={role.id}>{role.name}</div>
                    ))}
                  </td>
                  <td className="px-4 py-4">
                    {user?.roles?.map((role) => (
                      <div key={role.id}>
                        {role?.permissions?.map((permission) => (
                          <div key={permission.id}>
                            {permission.Permission.permission}
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-4 flex gap-2 items-center">
                    {user?.roles?.map(
                      (role) =>
                        role.name !== "admin" && (
                          <Button
                            onClick={()=>deleteUser(user.id)}
                            href="#"
                            className="bg-red-500 font-light text-center text-xs"
                          >
                            Delete
                          </Button>
                        )
                    )}
                  </td>
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
    </>
  );
};

export default Users;
