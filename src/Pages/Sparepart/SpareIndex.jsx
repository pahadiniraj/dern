import React from "react";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ReactPaginate from "react-paginate";
import useSpareParts from "../../CustomHooks/sparepart";
import http from "../../Utils/http";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const SpareIndex = () => {
  const nav = useNavigate();
  const {
    sparePartsList,
    setSparePartsList,
    isLoading,
    error,
    fetchSpares,
    currentPage,
    pageCount,
    handlePageClick,
    searchRequests,
  } = useSpareParts();
  console.log(sparePartsList);

  const handleClick = () => {
    nav("/sparePart/create");
  };
  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deleteSpare = async (value) => {
    try {
      const res = await http.delete(`/spareParts/${value}`);
      toast.success(res.data.message);
      fetchSpares();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" relative w-full h-full">
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Spare List</h2>
        <Button
          type="button"
          onClick={handleClick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Spare
        </Button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading searchRequests={searchRequests} />
        <Table>
          <Thead>
            <tr>
              <th scope="col" className="p-4">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Weight</th>
              <th scope="col">Stock</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {sparePartsList.map((spareparts, index) => (
              <tr
                key={spareparts.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4">{spareparts.name}</td>

                <td className="px-4 py-4">{spareparts.price}</td>
                <td className="px-4 py-4">{spareparts.quantity}</td>
                <td className="px-4 py-4">{spareparts.weight} </td>
                <td className="px-4 py-4">{spareparts.stock}</td>
                <td className=" max-w-24">
                  <NavLink to={`/sparePart/edit/${spareparts.id}`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                    onClick={() => deleteSpare(spareparts.id)}
                    href="#"
                    className=" bg-red-500  font-light text-center text-xs"
                  >
                    Delete
                  </Button>
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
  );
};

export default SpareIndex;
