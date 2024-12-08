import * as Yup from "yup";


const initialValues = {
    description: "",
    isRepair: false,
    productName: "",
    scheduledDate: "",
    address: "",
  };
  
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Please enter a description")
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must be at most 1000 characters"),
    isRepair: Yup.boolean(),
    productName: Yup.string().when('isRepair', {
      is: true,
      then:() => Yup.string().required("Please enter a product name"),
    }),
    scheduledDate: Yup.date().when('isRepair', {
      is: true,
      then:()=> Yup.date().required("Please enter a scheduled date"),
    }),
    address: Yup.string().when('isRepair', {
      is: true,
      then:()=> Yup.string().required("Please enter an address"),
    }),
  });


  export {
    initialValues,
    validationSchema,
  }
