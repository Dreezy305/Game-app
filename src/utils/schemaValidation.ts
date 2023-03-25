import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const checkoutSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email("Invalid email!").notRequired(),
  address: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
});

export const userSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email!").required("Required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "phone number is not valid!")
    .required("Required"),
  address1: yup.string().required("Required"),
  address2: yup.string().required("Required"),
});
