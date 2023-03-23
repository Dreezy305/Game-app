import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { DialogProps } from "../utils/interfaces";

function DialogBox({
  open,
  handleClose,
  title,
  userName,
  loading,
  handleDelete,
}: DialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`would you like to delete ${userName} data`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          size="small"
          onClick={handleDelete}
          endIcon={<DeleteOutlinedIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Delete</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
