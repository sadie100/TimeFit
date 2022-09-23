import { useState, useEffect, createContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const ModalContext = createContext({
  nowOpenModal: "",
  handleOpen: () => {},
  handleClose: () => {},
});

const ModalContextProvider = (props) => {
  const [nowOpenModal, setNowOpenModal] = useState("");
  const handleOpen = (name) => {
    setNowOpenModal(name);
  };
  const handleClose = () => {
    setNowOpenModal("");
  };

  return (
    <ModalContext.Provider
      value={{
        nowOpenModal,
        handleOpen,
        handleClose,
      }}
      {...props}
    ></ModalContext.Provider>
  );
};
export default ModalContextProvider;
