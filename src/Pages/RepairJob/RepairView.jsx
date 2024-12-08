import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { object, string } from "yup";
import Button from "../../Components/Button";
import http from "../../Utils/http";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import status from "./Status.js";
import RepairMail from "./RepairMail.jsx";
import useRepairView from "../../CustomHooks/repairView.js";

const RepairView = () => {
  const { id } = useParams();
  const { repairList, isLoading, error, fetchRepairLists } = useRepairView();
  const [loading, setLoading] = useState(false);

  // Formik hook should be called at the top level
  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: object({
      status: string().required("Please enter a status"),
    }),
    onSubmit: (values) => {
      console.log(values);
      updateStatus(values);
    },
  });

  const updateStatus = async (value) => {
    try {
      setLoading(true);
      const res = await http.patch(`/repairItems/${id}`, value);
      console.log(res);
      fetchRepairLists(); // Call fetchRepairLists instead of getRepairs
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="h-auto relative  p-5 flex  gap-10 bg-white shadow-md rounded-sm">
        
        <div className="w-[60%] flex flex-col ">
        {loading && (
          <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader color={"#008000"} size={120} />
          </div>
        )}
        <div>
          <h1 className="text-base font-semibold text-gray-500">
            Repair Items
          </h1>
        </div>
        {/* Your repair items details */}{" "}
        <div className=" border py-3 flex mt-5 flex-col gap-5">
          <div className=" grid grid-cols-2 p-4 border-b-[1px]   ">
            <div className=" flex gap-4 items-center">
              <p className=" text-sm  font-medium text-gray-700">
                Support RequestId:
              </p>
              <p className=" text-sm    ">{repairList?.supportRequestId}</p>
            </div>
            <div className=" flex gap-4 items-center">
              <p className=" text-sm  font-medium text-gray-700">
                Product Name:
              </p>
              <p className=" text-sm    ">{repairList?.productName}</p>
            </div>
          </div>

          <div className=" grid grid-cols-2 p-4  border-b-[1px]  ">
            <div className=" flex gap-4 items-center">
              <p className=" text-sm font-medium text-gray-700">Status:</p>
              <p className=" text-sm   ">{repairList?.status}</p>
            </div>
            <div className=" flex gap-4 items-center">
              <p className=" text-sm font-medium text-gray-700">Address:</p>
              <p className=" text-sm   ">{repairList?.address}</p>
            </div>
          </div>

          <div className=" grid grid-cols-2 p-4    ">
            <div className=" flex gap-4 items-center">
              <p className=" text-sm font-medium text-gray-700">UserName:</p>
              <p className=" text-sm   ">
                {repairList?.supportRequest?.user.name}
              </p>
            </div>
            <div className=" flex gap-4 items-center">
              <p className=" text-sm font-medium text-gray-700">Email:</p>
              <p className=" text-sm   ">
                {repairList?.supportRequest?.user.email}
              </p>
            </div>
          </div>
        </div>
        {/* Status update form */}
        <div className="flex flex-col mt-6 gap-4">
          <div>
            <h1 className="text-base font-semibold text-gray-500">
              Status Update
            </h1>
          </div>
          <form
            encType="multipart/form-data"
            className="max-w-2xl w-full"
            onSubmit={formik.handleSubmit}
          >
            <Select
              name="stock_type"
              id="stock_type"
              options={status}
              onChange={(status) => {
                formik.setFieldValue("status", status.value);
              }}
              value={status.find(
                (option) => option.value === formik.values.status
              )}
              className="mt-2"
            >
              <option value="" disabled>
                Select a status type
              </option>

              {status.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </Select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-500 mt-1 text-xs ">
                {formik.errors.status}
              </div>
            ) : null}
            <Button
              type="submit"
              className="mt-5 bg-pink-500 hover:bg-pink-600"
            >
              Submit
            </Button>
          </form>
        </div>
        </div>
        {/* Render the RepairMail component */}
        <div className="w-[30%]">
          <RepairMail
            repairs={repairList?.supportRequest.user}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RepairView;
