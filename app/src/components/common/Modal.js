import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "contexts/modalContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ modalName, children, style, ...rest }) {
  const { nowOpenModal, handleOpen, handleClose } = useContext(ModalContext);

  return (
    <StyledDialog
      open={nowOpenModal === modalName}
      onClose={handleClose}
      maxWidth="500px"
      {...rest}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 20px;
    padding: 10px;
  }
`;
