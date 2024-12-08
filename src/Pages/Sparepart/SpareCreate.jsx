import React, { useState } from "react";
import Input from "../../Components/Input";
import { useFormik } from "formik";
import Select from "react-select";
import Button from "../../Components/Button";
import { object, string } from "yup";
import { initialValues, validationSchema } from "./schema";
import { toast } from "react-toastify";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";

const SpareCreate = () => {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      apisendata(values);
    },
  });

  const stockoptions = [
    {
      value: "In Stock",
      label: "In Stock",
    },
    {
      value: "Out of Stock",
      label: "Out of Stock",
    },
  ];

  const apisendata = async (values) => {
    try {
      setLoading(true);
      const res = await http.post("/spareParts", values);
      toast.success(res.data.message);
      nav("/sparepart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader color={"#008000"} size={120} />
          </div>
        )}

        <form
          encType="multipart/form-data"
          className="max-w-2xl mx-auto w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col w-full gap-4">
            <Input
              formik={formik}
              title="Spare Part Name"
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Spare Parts Name"
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <Input
              formik={formik}
              title="Price"
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Spare Parts Price"
            />
          </div>

          <div className="flex flex-col w-full gap-4">
            <Input
              formik={formik}
              title="Quantity"
              type="number"
              id="quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Spare Parts quantity"
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <Input
              formik={formik}
              title="Weight"
              type="number"
              id="weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Spare Parts weight"
            />
          </div>

          <div className=" my-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Stock Type:
            </label>
            <Select
              id="stock"
              name="stock"
              options={stockoptions}
              onChange={(stockoptions) =>
                formik.setFieldValue(
                  "stock",
                  stockoptions ? stockoptions.value : ""
                )
              }
              value={stockoptions.find(
                (option) => option.value === formik.values.stock
              )}
              onBlur={formik.handleBlur}
              className="mt-2"
            ></Select>
            {formik.touched.stock && formik.errors.stock ? (
              <div className="text-red-500 mt-1 text-xs ">
                {formik.errors.stock}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="mt-5 bg-pink-500 hover:bg-pink-600">
            {isLoading ? "Submitting... Wait" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SpareCreate;
