import { useFormik } from "formik";
import React, { useState } from "react";
import Input from "../../Components/Input";
import { object, string } from "yup";
import { NavLink } from "react-router-dom";
import http from "../../Utils/http";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Forgetpass = () => {
  const [loading,setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: object({
      email: string().required("Please enter valid email"),
    }),
    onSubmit: (values) => {
      apisendata(values);
    },
  });

  async function apisendata(values) {
    try {
      setLoading(true)
      const response = await http.post("/auth/forgetPassword", values);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
       {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
      <h1 class="text-4xl font-medium">Reset password</h1>
      <p class="text-slate-500 mt-8">Fill up the form to reset the password</p>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} class="my-10">
        <div class="flex flex-col space-y-5">
          <Input
            title={"Your Email Address"}
            formik={formik}
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="name@company.com"
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Reset password</span>
          </button>
          <p class="text-center">
            Not registered yet?{" "}
            <NavLink
              to={"/register"}
              class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span className=" text-indigo-600">Register now </span>
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Forgetpass;
