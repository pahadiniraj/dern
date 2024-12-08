// © 2024 Niraj Pahadi All rights reserved.

import React from "react";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ReactPaginate from "react-paginate";
import usearticles from "../../CustomHooks/articles";
import { ClipLoader } from "react-spinners";
import http from "../../Utils/http";
import { toast } from "react-toastify";

import { BsArrowRight } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ArticleIndex = () => {
  const nav = useNavigate();
  const { user, userloading, usererror } = useSelector((state) => state.user);

  const {
    articlesList,
    setarticlesList,
    isLoading,
    error,
    fetchArticlesLists,
    currentPage,
    pageCount,
    handlePageClick,
    searchRequests,
  } = usearticles();

  const handleclick = () => {
    nav("/article/create");
  };
  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const deleteArticle = async (id) => {
    try {
      const res = await http.delete(`/articles/${id}`);
      console.log(res);
      toast.success(res.data.message);
      fetchArticlesLists();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const readMore = (value) => {
    nav(`/article/view/${value}`);
  };

  const edit = (value) => {
    nav(`/article/edit/${value}`);
  };

  console.log(articlesList);

  return (
    <div className=" relative w-full h-full">
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Articles List</h2>
        {user.roles[0].name === "admin" && (
          <div>
            <Button
              type="button"
              onClick={handleclick}
              className=" bg-green-700 hover:bg-green-900"
            >
              Create Article
            </Button>
          </div>
        )}
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading searchRequests={searchRequests} />
        <Table>
          <div className="ml-4 grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articlesList.map((article, index) => (
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    class="rounded-t-lg h-48 w-full object-cover"
                    src={article.image}
                    alt=""
                  />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {article.title}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {`${article.content.slice(0, 200)} ...`}
                  </p>
                  <div className="flex gap-0   flex-wrap ">
                    <Button
                      type="button"
                      title="Read More"
                      onClick={() => readMore(article.id)}
                      className=" bg-green-500 flex items-center gap-2 hover:bg-green-600"
                    >
                      More
                      <BsArrowRight size={20} />
                    </Button>
                    {user?.roles[0]?.name === "admin" && (
                      <div className=" flex">
                        <Button
                          type="button"
                          title="Read More"
                          onClick={() => edit(article.id)}
                          className=" bg-pink-500 flex gap-2 items-center hover:bg-pink-600"
                        >
                          Edit
                          <FaRegEdit size={12} />
                        </Button>

                        <Button
                          type="button"
                          title="Read More"
                          onClick={() => deleteArticle(article.id)}
                          className=" bg-red-500 flex gap-2 items-center hover:bg-red-600"
                        >
                          Delete
                          <MdDelete />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

export default ArticleIndex;

// © 2024 Niraj Pahadi All rights reserved.
