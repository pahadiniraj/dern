import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import http from "../Utils/http";
import { toast } from "react-toastify";

const Ratings = ({quatationId}) => {

  const formik = useFormik({
    initialValues: {
      rating: 0,
      commonIssues: "",
      timeTaken: 0,
      location:"",
      quatationId: quatationId || '',
    },
    validationSchema: object({
      rating: number().required("Please enter a rating").max(5).min(0),
      commonIssues: string().required("Please enter a feedback"),
      timeTaken: string().required("Please enter a time taken"),
      location: string().required("Please enter a location"),

    }),
    onSubmit: (values) => {
      console.log(values);
      sendAPi(values);
      formik.resetForm();
    },
  });

  const sendAPi = async (values) => {
    try {
      const res = await http.post('/feedback', values);
      console.log(res.data.message);
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  }

  return (
    <div>
      <div className=" border p-5 shadow rounded-lg ">
        <form
          encType="multipart/form-data"
          className=" max-w-2xl mx-auto w-full "
          onSubmit={formik.handleSubmit}
        >
          <Input
            title="Your Rating"
            type="number"
            formik={formik}
            id="rating"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your Rating"
          />

          <Input
            title="Time Taken"
            type="number"
            formik={formik}
            id="timeTaken"
            name="timeTaken"
            value={formik.values.timeTaken}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Time Taken ex: 1 hr or 1 day"
          />

          <Input
            title="Your Address"
            type="text"
            formik={formik}
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your Address"
          />

          <TextArea
            title="Your Feedback"
            formik={formik}
            placeholder={"Your description...."}
            name="commonIssues"
            id="commonIssues"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={10}
            value={formik.values.commonIssues}
            cols={100}
          />
          <Button type="submit" className=" mt-5 bg-pink-500 hover:bg-pink-600">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Ratings;
