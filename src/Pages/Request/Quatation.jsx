import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { number, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import http from "../../Utils/http";
import Select from "react-select";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Quatation = ({ id }) => {
  const [product, setProduct] = useState([]);
  const [loading,setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      productname: "",
      price: "",
      supportRequestId: id || "",
      productId:""
    },
    validationSchema: object({
      productname: string().required("Required"),
      price: number().required("Required").positive("Required Positive Number"),
    }),
    onSubmit: (values) => {
      console.log(values);
      sendvaluetoapi(values);
    },
  });

  useEffect(() => {
    getvalueFromApi();
  }, []);

  const sendvaluetoapi = async (values) => {
    try {
      setLoading(true)
      const res = await http.post("/quotation", values);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  };

  const getvalueFromApi = async () => {
    try {
      const values = await http.get("/spareParts");
      const data = values.data.data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const productOptions = product.map((product) => ({
    value: product.name,
    label: product.name,
    price: product.price,
    id: product.id,
  }));

  console.log(product);
  return (
    <div>
      <div className="flex flex-col w-full gap-4">
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="productname"
              className="block text-sm font-medium text-gray-700"
            >
              Select Stock Type:
            </label>
            <Select
              id="productname"
              name="productname"
              options={productOptions}
              onChange={(selectedOption) => {
                formik.setFieldValue("productname", selectedOption.value);
                formik.setFieldValue("price", selectedOption.price);
                formik.setFieldValue("productId", selectedOption.id);
              }}
              value={productOptions.find(
                (option) => option.value === formik.values.productname
              )}
              onBlur={formik.handleBlur}
              className="mt-2"
            />
            {formik.touched.productname && formik.errors.productname ? (
              <div className="text-red-500 mt-1 text-xs">
                {formik.errors.productname}
              </div>
            ) : null}
          </div>

          <Input
            formik={formik}
            title="Price"
            type="number"
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
            placeholder="Price"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 mt-1 text-xs">
              {formik.errors.price}
            </div>
          ) : null}
          <Button type="submit" className="mt-5 bg-pink-500 hover:bg-pink-600">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Quatation;
