import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { tokens } from "../theme";
import { DialogProps } from "../utils/interfaces";
import { BootstrapDialog } from "./Bootstrap";

function DialogBox({
  open,
  handleClose,
  title,
  userName,
  loading,
  handleDelete,
}: DialogProps): JSX.Element {
  // PICK COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // DIALOG TRANSITION
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionComponent={Transition}
          transitionDuration={1}
        >
          <Box sx={{ backgroundColor: colors.blueAccent[700] }}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`would you like to delete ${userName} data`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: colors.grey[700] }}>
                Cancel
              </Button>
              <LoadingButton
                size="small"
                onClick={handleDelete}
                endIcon={<DeleteOutlinedIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ backgroundColor: colors.redAccent[700] }}
              >
                <span>Delete</span>
              </LoadingButton>
            </DialogActions>
          </Box>
        </Dialog>
      </BootstrapDialog>
    </div>
  );
}

export default DialogBox;
