import React from "react";
import { useNavigate } from "react-router";
import { object } from "yup";
import { regInitialValue, registerValidation } from "./regSchema";
import { useFormik } from "formik";
import http from "../../Utils/http";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { NavLink } from "react-router-dom";
import Select from "react-select";

const RegisterUser = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: regInitialValue,
    validationSchema: registerValidation,
    onSubmit: (values) => {
      console.log(values);
      registerUser(values);
    },
  });

  async function registerUser(values) {
    try {
      const res = await http.post("/auth/register", values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(res);
      navigation("/");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  const userType = [
    {
      value: "IndividualCustomer",
      label: "Normal Customer",
    },
    {
      value: "Business",
      label: "Business Customer",
    },
  ];

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up in to your account
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <ToastContainer />

              <div>
                <Input
                  title={"Your Name"}
                  type="text"
                  name="name"
                  id="name"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Ribon"
                />
              </div>

              <div>
                <Input
                  title={"Your Email Address"}
                  type="email"
                  name="email"
                  id="email"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <Input
                  title={"Password"}
                  type="password"
                  name="password"
                  id="password"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Input
                  title={"Confirm Password"}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  placeholder="••••••••"
                />
              </div>

              <div className="my-5">
                <label
                  htmlFor="stock_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Type
                </label>
                <Select
                  name="stock_type"
                  id="stock_type"
                  options={userType}
                  onChange={(userType) => {
                    formik.setFieldValue("userType", userType.value);
                  }}
                  value={userType.find(
                    (option) => option.value === formik.values.userType
                  )}
                  className="mt-2"
                >
                  <option value="" disabled>
                    Select a stock type
                  </option>

                  {userType.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </Select>
                {formik.touched.userType && formik.errors.userType ? (
                  <div className="text-red-500 text-xs mt-2">
                    {formik.errors.userType}
                  </div>
                ) : null}
                <div className=" mt-10">
                  <span className=" text-red-500">Note: </span> The company
                  provides on-site support for business customers. Individuals
                  must either drop their computer off at one of the company’s
                  offices or arrange for it to be delivered by a courier.
                </div>
              </div>

              <div class="flex items-start ">
                <div class="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.terms}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {formik.touched.terms && formik.errors.terms ? (
                <div className="text-red-500 text-xs mt-2">
                  {formik.errors.terms}
                </div>
              ) : null}
              <Button
                type="submit"
                className=" mt-5 bg-pink-500 hover:bg-pink-600"
              >
                Sign Up
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do You Have a Account{" "}
                <NavLink to={"/login"}>
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </a>
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterUser;
