// © 2024 Niraj Pahadi. All rights reserved.

import { useFormik } from "formik";
import React, { useState } from "react";
import TextArea from "../../Components/TextArea";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { mixed, object, string } from "yup";
import http from "../../Utils/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import sendata from "./formdata";

const ArticleCrreate = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    validationSchema: object({
      title: string().required("Please enter a title"),
      content: string().required("Please enter a content"),
      image: mixed().required("Please enter a image"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const data = sendata(values);
      senddatas(data);
    },
  });

  const senddatas = async (data) => {
    try {
      setIsLoading(true);
      const res = await http.post("/articles", data);
      const datas = res.data;
      nav("/articles");
      console.log(datas);
      toast.success("article created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className=" relative w-full h-full">
        {isLoading && (
          <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader color={"#008000"} size={120} />
          </div>
        )}

        <form
          encType="multipart/form-data"
          className=" max-w-2xl mx-auto w-full "
          onSubmit={formik.handleSubmit}
        >
          <div className={`flex flex-col w-full gap-4`}>
            <Input
              title="Title"
              type="text"
              formik={formik}
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Title"
            />
          </div>
          <div className="mb-5 w-full">
            <TextArea
              title={"Description"}
              id="content"
              formik={formik}
              name={"content"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Content of descrption..."
            />
          </div>

          <Input
            title="Image"
            type="file"
            formik={formik}
            id="image"
            name="image"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            accept="image/*"
          />

          <Button type="submit" className=" mt-5 bg-pink-500 hover:bg-pink-600">
            {isLoading ? "Submitting... Wait" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ArticleCrreate;

// © 2024 Niraj Pahadi. All rights reserved.
