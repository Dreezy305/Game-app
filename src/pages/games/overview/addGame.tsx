import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";

import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useAddGame } from "../../../hooks/games";
import { addGamePayload } from "../../../utils/interfaces";
import { gameSchema } from "../../../utils/schemaValidation";

function AddGame(): JSX.Element {
  const navigate = useNavigate();
  const { gameCreate } = useAddGame();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    name: "",
    gameCategory: "",
    duration: "",
    scores: "",
  };
  const handleFormSubmit = async (values: any) => {
    const payload: addGamePayload = {
      name: values.name,
      gameCategory: values.gameCategory,
      duration: values.duration,
      scores: values.scores,
    };
    try {
      const response = await gameCreate.mutateAsync(payload);
      if (response.status === 201) {
        navigate("/games");
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
        <Header title="ADD GAME" subtitle="Add a New Game" />
      </Box>

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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
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
                helperText={touched.gameCategory && errors.gameCategory}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Scores"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.scores}
                name="scores"
                error={!!touched.scores && !!errors.scores}
                helperText={touched.scores && errors.scores}
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
                Add New Game{" "}
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

export default AddGame;
