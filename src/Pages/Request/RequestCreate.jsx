import { useFormik } from "formik";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";
import { initialValues, validationSchema } from "./Schema";
import http from "../../Utils/http";
import TextArea from "../../Components/TextArea";
import { useNavigate } from "react-router";

const RequestCreate = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      apisendata(values);
    },
  });
  const apisendata = async (data) => {
    try {
      setIsLoading(true);
      const res = await http.post("/request", data);
      console.log(res);
      toast.success(res.data.message);
      nav('/')
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <div className="mb-5 w-full">
          <TextArea
          title={"Quotation"}
            id="description"
            formik={formik}
            name={"description"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            rows="6"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Leave a message... Example: I need the Dell 5400. Require a quotation for that product."
          />
        </div>
        {/* <div className={`flex flex-col gap-4`}>
          <Input
            divclassName="flex mb-0 gap-4 "
            className={` max-w-4 mb-2`}
            title="Reapir Items ?"
            type="checkbox"
            formik={formik}
            id="isRepair"
            name="isRepair"
            value={formik.values.isRepair}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="isRepair"
          />
          {formik.values.isRepair && (
            <div>
              <Input
                title="Product Name"
                type="text"
                formik={formik}
                id="productName"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Product Name"
              />

              <Input
                title="Schedule Date"
                type="datetime-local"
                formik={formik}
                id="scheduledDate"
                name="scheduledDate"
                value={formik.values.scheduledDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Scheduled Date"
              />

              <Input
                title="Drop Off Location (Bussiness Customer Only)"
                type="text"
                formik={formik}
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Address..."
              />
            </div>
          )}
        </div> */}

        <Button type="submit" className=" mt-5 bg-pink-500 hover:bg-pink-600">
          {isLoading ? "Submitting... Wait" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default RequestCreate;
