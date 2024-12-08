import { useFormik } from "formik";
import React from "react";
import Button from "../../Components/Button";
import { toast } from "react-toastify";
import http from "../../Utils/http";
import Select from "react-select";
import { object, string } from "yup";
import Input from "../../Components/Input";
import { useNavigate } from "react-router";

const UserAcceptQo = ({ supportRequestId, id, }) => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      status: "",
      supportRequestId: supportRequestId || "",
      address: "",
      scheduledDate: "",
      quotationId: id || "",
    },
    validationSchema: object({
      status: string().required("Please enter a status"),
      address: string().required("Please enter a address"),
      scheduledDate: string().required("Please enter a scheduledDate"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await http.put(`quotation/${id}`, values);
        toast.success(res.data.message);
        nav('/')

      } catch (error) {
        console.log(error)
        toast.error(error.message);
      }
    },
  });


  const status = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
  ];
  console.log(id);

  return (
    <div className=" flex flex-col w-full  gap-8">
      <div className="w-full">
        <h3 className=" text-xl font-medium">Quatation Update</h3>
        <p className="mt-4">
          {" "}
          Please Update this Quatation. You may Reject or Accept this .After
          Accepted It will be updated to repair And your work Will Started
        </p>
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
              Accept Quotation Or Reject Quotation
            </option>

            {status.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Select>

          <div className="mt-4">
            <Input
              title="Your Address"
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
          <div>
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
          </div>

          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-500 mt-1 text-xs ">
              {formik.errors.status}
            </div>
          ) : null}
          <Button type="submit" className="mt-5 bg-pink-500 hover:bg-pink-600">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserAcceptQo;
