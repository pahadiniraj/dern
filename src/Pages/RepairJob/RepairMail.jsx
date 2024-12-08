import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import TextArea from "../../Components/TextArea";
import { ToastContainer, toast } from "react-toastify";
import http from "../../Utils/http";
const RepairMail = ({ repairs, setLoading }) => {
  console.log(repairs?.email);
  const formik = useFormik({
    initialValues: {
      email: repairs?.email || "",
      subject: "",
      message: "",
    },
    validationSchema: object({
      email: string(),
      subject: string().required("Please enter a subject"),
      message: string().required("Please enter a message"),
    }),
    onSubmit: (values) => {
      console.log(values);
      sendemails(values);
    },
  });

  const sendemails = async (value) => {
    try {
      setLoading(true);
      const res = await http.post(`/sendRepair/mail`, value);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(formik.values.email);
  return (
    <div className=" w-full h-full">

      <h1 className="text-base   font-semibold text-gray-500">Send Email</h1>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-4 lg:py-8  mx-auto max-w-screen-md">
          <form class="space-y-8" onSubmit={formik.handleSubmit}>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                readOnly={true}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                name={"subject"}
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <TextArea
                id="message"
                formik={formik}
                name={"message"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              />
            </div>
            <Button
              type="submit"
              className=" mt-5 bg-pink-500 hover:bg-pink-600"
            >
              Send
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RepairMail;
