import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import http from "../../Utils/http";
import DetailPage from "../../Components/DeatailPage";
import { useFormik } from "formik";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { number, object, string } from "yup";
import Select from "react-select";
import status from "./Status";
import Ratings from "../../Components/Ratings";
import { useSelector } from "react-redux";
import Quatation from "./Quatation";
import UserAcceptQo from "./UserAcceptQo";

const ViewRequest = () => {
  const { id } = useParams();
  const [request, setRequestDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [quatationId, setQuatationId] = useState(); 

  const { user, userloading, usererror } = useSelector((state) => state.user);

  if (userloading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }
  if (usererror) {
    return <div>Error: {usererror.message}</div>;
  }

  console.log(user);

  useEffect(() => {
    getRequestDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: object({
      status: string().required("Please enter a Status"),
    }),
    onSubmit: (values) => {
      console.log(values);
      updatestatus(values);
    },
  });

  const updatestatus = async (data) => {
    try {
      setLoading(true);
      const res = await http.patch(`/request/status/${id}`, data);
      console.log(res);
      getRequestDetails();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getRequestDetails = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/request/${id}`);
      const dataget = res.data.data;
      const quatationId = dataget.Quotation?.id;
      setQuatationId(quatationId)
      console.log("data"+ dataget);
      setRequestDetails(dataget);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(request);

  console.log(`quatation Id ${quatationId}`)

  return (
    <div className=" relative h-auto bg-white pl-9 ">
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
      <div className=" flex flex-col justify-start  items-start gap-4 relative ">
        <div className=" flex gap-5 justify-start  mt-3">
          <DetailPage
            pageTitle="Quotation Details"
            pageDesc="Details about the Quotation."
            detailItems={[
              {
                label: "Descrption",
                value: `${request?.description}`,
              },
              { label: "Status", value: `${request?.status}` },
            ]}
          />

          {request && request.repairjob.length !== 0 && (
            <DetailPage
              pageTitle="Repair Details"
              pageDesc="Details about the Repair."
              detailItems={[
                {
                  label: "Support ID",
                  value: `${request?.repairjob[0].supportRequestId}`,
                },
                {
                  label: "Product Name",
                  value: `${request?.repairjob[0].productName}`,
                },
                {
                  label: "Scheduled Date",
                  value: `${new Date(request?.repairjob[0].scheduledDate)}`,
                },

                {
                  label: "Status",
                  value: `
                  ${request?.repairjob[0].status}
                  `,
                },
              ]}
            />
          )}
        </div>

        {request?.Quotation?.status === "Pending" && (
          <div className="">
            <DetailPage
              pageTitle="Quotation  Request"
              pageDesc="Quotation Request details. It has Product and price that will cost for Repairing your product."
              detailItems={[
                {
                  label: "Product Name",
                  value: `${request?.Quotation?.productName}`,
                },

                {
                  label: "Status",
                  value: `
                  ${request?.Quotation?.status}
                  `,
                },
                {
                  label: "Price",
                  value: `
                  ${request?.Quotation?.price}
                  `,
                },
              ]}
            />

            <div className=" mt-5">
              <UserAcceptQo id={request?.Quotation?.id} supportRequestId={id} />
            </div>
          </div>
        )}

        {user && user?.roles[0]?.name !== "customer" && (
          <div className=" flex flex-col  w-full gap-8 mt-6">
            <div>
            <h3 className="text-xl mb-0">For Admin Only</h3>
            <hr className="mt-3" />

            </div>
        
            <div className="w-full ">
              <h3 className="text-xl font-medium mt-5">Status Update</h3>
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
                  Update
                </Button>
              </form>
            </div>

            {request?.status === "Accepted" && <Quatation id={id} />}
          </div>
        )}

        {request &&
          user?.roles[0].name === "customer" &&
          request?.status === "Accepted" && <Ratings quatationId={quatationId} />}
      </div>
    </div>
  );
};

export default ViewRequest;
