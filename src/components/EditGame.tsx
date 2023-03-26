import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React from "react";
import { useEditGame } from "../hooks/games";
import { tokens } from "../theme";
import { addGamePayload, DialogProps } from "../utils/interfaces";
import { gameSchema } from "../utils/schemaValidation";
import { BootstrapDialog } from "./Bootstrap";

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

function EditGame({
  open,
  handleClose,
  title,
  userObj,
  refetch,
}: DialogProps): JSX.Element {
  // PICK COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { gameEdit } = useEditGame(userObj?.id);

  const handleFormSubmit = async (values: any) => {
    const payload: addGamePayload = {
      duration: values.duration,
      gameCategory: values.gameCategory,
      name: values.name,
      scores: values.scores,
    };
    try {
      const response = await gameEdit.mutateAsync(payload);
      if (response.status === 200) {
        handleClose();
        refetch();
      }
    } catch (error) {
      return error;
    }
  };

  const initialValues = {
    name: userObj?.name,
    gameCategory: userObj?.gameCategory,
    duration: userObj?.duration,
    scores: userObj?.scores,
  };

  return (
    <div>
      {" "}
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
            validationSchema={gameSchema}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  sx={{ gridColumn: "span 4", mb: "10px" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Game Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gameCategory}
                  name="gameCategory"
                  error={!!touched.gameCategory && !!errors.gameCategory}
                  sx={{ gridColumn: "span 4", mb: "10px" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Duration"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.duration}
                  name="duration"
                  error={!!touched.duration && !!errors.duration}
                  sx={{ gridColumn: "span 4", mb: "10px" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Scores"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.scores}
                  name="scores"
                  error={!!touched.scores && !!errors.scores}
                  sx={{ gridColumn: "span 4" }}
                />

                <Box
                  display="flex"
                  justifyContent="end"
                  mt="20px"
                  sx={{ position: "relative" }}
                >
                  <Button type="submit" color="secondary" variant="contained">
                    Update{" "}
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
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default EditGame;
