import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { object, string } from "yup";
import http from "../../Utils/http";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import sendata from "./formdata";

const ArticleEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    validationSchema: object({
      title: string().required("Title is required"),
      content: string().required("Content is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const data = sendata(values)
      sendarticle(data);
    },
  });

  useEffect(() => {
    getArticle();
  }, []);

  const sendarticle = async (values) => {
    try {
      setIsLoading(true);
      const res = await http.put(`/articles/${id}`, values);
      const data = res.data.data;
      console.log(data);
      toast.success(res.data.message);
      nav("/articles");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getArticle = async () => {
    try {
      setIsLoading(true);
      const res = await http.get(`/articles/${id}`);
      const data = res.data.data;
      console.log(data);
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("content", data.content);
      formik.setFieldValue("newimage", data.image);
      setImage(data.image);

    } catch (error) {
      console.log(error);
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
          <div className="showimage">
            <img src={image} alt="" />
          </div>

          <Button type="submit" className=" mt-5 bg-pink-500 hover:bg-pink-600">
            {isLoading ? "Submitting... Wait" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ArticleEdit;
