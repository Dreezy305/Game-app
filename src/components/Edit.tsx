/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React from "react";
import { useEditUser } from "../hooks/users";
import { tokens } from "../theme";
import { DialogProps, userEditPayload } from "../utils/interfaces";
import { checkoutSchema } from "../utils/schemaValidation";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function Edit({
  open,
  handleClose,
  title,
  userObj,
  refetch,
}: DialogProps): JSX.Element {
  // PICK COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // STATE
  const [loading, setLoading] = React.useState<boolean>(false);
  const { userEdit } = useEditUser(userObj?.id);

  // SUBMIT FORM VALUES
  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    const payload: userEditPayload = {
      name: values.name,
      address: values.address,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    try {
      const response = await userEdit.mutateAsync(payload);
      if (response.status === 200) {
        setLoading(false);
        handleClose();
        refetch();
      }
    } catch (error) {
      setLoading(false);
      return error;
    }
    setLoading(false);
  };
  const initialValues = {
    name: userObj?.name,
    email: userObj?.email,
    address: userObj?.address,
    phoneNumber: userObj?.phoneNumber,
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* USER FORM */}
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    sx={{ mb: "10px" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    sx={{ mb: "10px" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    sx={{ mb: "10px" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    sx={{ mb: "10px" }}
                  />
                  <DialogActions>
                    <Box sx={{ position: "relative" }}>
                      <Button
                        sx={{ backgroundColor: colors.greenAccent[700] }}
                        type="submit"
                      >
                        Save changes
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: colors.blueAccent[700],
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                          }}
                        />
                      )}
                    </Box>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default Edit;
