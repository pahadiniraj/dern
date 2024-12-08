import { number, object, string } from "yup";

const initialValues = {
  name: "",
  price: "",
  stock: "",
  quantity: "",
  weight: "",
};

const validationSchema = object({
  name: string().required("Please enter a name"),
  price: number().required("Please enter a price"),
  stock: string().required("Please enter a stock"),
  quantity: number().required("Please enter a quantity"),
  weight: number().required("Please enter a weight"),
});

export { initialValues, validationSchema };