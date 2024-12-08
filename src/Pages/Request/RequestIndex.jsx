import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { NavLink } from "react-router-dom";
import http from "../../Utils/http";
import useRequest from "../../CustomHooks/repairrequest";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// import 'react-paginate/dist/react-paginate.css'; // Import default CSS

const RequestIndex = () => {
  const { user} = useSelector((state) => state.user);

  const nav = useNavigate();
  const {
    requestList,
    setrequestList,
    isLoading,
    error,
    fetchRequestLists,
    handlePageClick,
    pageCount,
    searchRequests,
  } = useRequest();
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const handleclick = () => {
    nav("/request/create");
  };

  const deleterequest = async (id) => {
    try {
      const datadelte = await http.delete(`/request/${id}`);
      console.log(datadelte);
      toast.success("Request deleted successfully");
      fetchRequestLists();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  console.log(requestList)

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Quotation List</h2>
        <Button
          type="button"
          onClick={handleclick}
          className="bg-green-700 hover:bg-green-900"
        >
          Create Quotation
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading searchRequests={searchRequests} />
        <Table>
          <Thead>
            <tr>
              <th scope="col" className="p-4">
                SR. Id
              </th>
              <th scope="col">Name</th>
              <th scope="col">UserType</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Quatation Status</th>
              <th scope="col">Repair Item </th>
              <th scope="col">Repair Status </th>

              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {requestList?.map((value) => (
              <tr
                key={value.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{value.id}</td>
                <td className="px-4 py-4">{value.user.name}</td>
                <td className="px-4 py-4">{value.user.userType}</td>
                <td className="px-4 py-4">{value.description}</td>
                <td className="px-4 py-4">{value.status}</td>
                <td className="px-4 py-4">{value.Quotation?.status}</td>

                <td className="px-4 py-4">
                  {value.repairjob.map((val) => val.productName).join(", ")}
                </td>
                <td className="px-4 py-4">
                  {value.repairjob.map((val) => val.status).join(", ")}
                </td>
                <td className="px-4 py-4">
                  <NavLink to={`/Request/view/${value.id}`}>
                    <Button className="bg-green-500 font-light text-center text-xs">
                      View
                    </Button>
                  </NavLink>
                  {user.roles[0].name === "admin" && (
                    <Button
                      onClick={() => deleterequest(value.id)}
                      className="bg-red-500 font-light text-center text-xs"
                    >
                      Delete
                    </Button>
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
          pageRangeDisplayed={1}
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

export default RequestIndex;
