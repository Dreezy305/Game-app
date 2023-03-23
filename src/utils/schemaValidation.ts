import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email("Invalid email!").notRequired(),
  address: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
});
