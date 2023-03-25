import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Field, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useAddUser } from "../../../hooks/users";
import { tokens } from "../../../theme";
import { addUserPayload } from "../../../utils/interfaces";
import { userSchema } from "../../../utils/schemaValidation";

function AddUser(): JSX.Element {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { userCreate } = useAddUser();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    gender: "",
  };
  const handleFormSubmit = async (values: any) => {
    const payload: addUserPayload = {
      address: values.address1,
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phoneNumber: values.contact,
      gender: values.gender,
    };
    try {
      const response = await userCreate.mutateAsync(payload);
      if (response.status === 201) {
        navigate("/users");
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <Box m={"20px"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Header title="ADD USER" subtitle="Add a New User Profile" />
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="standard" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Field
                  as={Select}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={handleChange}
                  label="Gender"
                  variant="filled"
                  placeholder="Gender"
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value={""}>Gender</MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"others"}>Prefer not to say</MenuItem>
                </Field>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              mt="20px"
              sx={{ position: "relative" }}
            >
              <Button type="submit" color="secondary" variant="contained">
                Add New User{" "}
                {isSubmitting && (
                  <>
                    &nbsp; &nbsp;
                    <CircularProgress size={13} />
                  </>
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AddUser;
