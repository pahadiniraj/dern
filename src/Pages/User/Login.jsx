import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Recaptcha from "react-recaptcha";
import http from "../../Utils/http";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const nav = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // recaptcha: "",
    },
    validationSchema: object({
      email: string()
        .required("Please enter an email")
        .email("Please enter a valid email"),
      password: string()
        .required("Please enter a password")
        .min(8, "Password must be at least 8 characters long"),
      // recaptcha: string().required("Please verify that you are not a robot"),
    }),
    onSubmit: (values) => {
      console.log(values);
      loginuser(values);
    },
  });
  useEffect(() => {
    let isAuth = localStorage.getItem("accessToken");
    checktoken();
    if (isTokenExpired) {
      nav("/login");
    } else if (isAuth && isAuth !== null) {
      nav("/dashboard");
    } else {
      nav("/login");
    }
  }, []);

  const checktoken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = new Date().getTime();
      setIsTokenExpired(currentTime > expirationTime);
    } else {
      setIsTokenExpired(true);
    }
  };

  const loginuser = async (values) => {
    try {
      const res = await http.post("/auth/login", values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      Cookies.set("USER_INFO", JSON.stringify(refreshToken), {
        expires: 7,
      });
      console.log(res);
      nav("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In in to your account
            </h1>

            <form
              className="space-y-4 md:space-y-6 "
              onSubmit={formik.handleSubmit}
            >
              <ToastContainer />

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
              {/* <div className=" h-20 w-30">
                <Recaptcha
                  sitekey="6LcBVtEpAAAAAG835APNmInyqTx55hxLoqPYhuPh"
                  render="explicit"
                  theme="dark"
                  verifyCallback={(response) => {
                    formik.setFieldValue("recaptcha", response);
                  }}
                  onloadCallback={() => {
                    console.log("done loading!");
                  }}
                />
                {formik.errors.recaptcha && formik.touched.recaptcha && (
                  <p>{formik.errors.recaptcha}</p>
                )}
              </div> */}

              <Button
                type="submit"
                className=" mt-5 bg-pink-500 hover:bg-pink-600"
              >
                Sign In
              </Button>
              <NavLink
                to="/forgetpassword"
                className=" underline text-sm font-medium text-primary-600 hover:underline text-blue-500 dark:text-blue-500"
              >
                Forgot password?
              </NavLink>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink to={"/register"}>
                  <a
                    href="#"
                    className=" underline font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
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

export default Login;
