import { useState, useEffect, createContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const ModalContext = createContext({
  nowOpenModal: "",
  handleOpen: () => {},
  handleClose: () => {},
  handleModalProp: () => {},
  modalProp: null,
});

const ModalContextProvider = (props) => {
  const [nowOpenModal, setNowOpenModal] = useState("");
  const [modalProp, setModalProp] = useState(null);

  const handleOpen = (name) => {
    setNowOpenModal(name);
  };
  const handleClose = () => {
    setNowOpenModal("");
  };
  const handleModalProp = (data) => {
    setModalProp(data);
  };

  return (
    <ModalContext.Provider
      value={{
        nowOpenModal,
        handleOpen,
        handleClose,
        modalProp,
        handleModalProp,
      }}
      {...props}
    ></ModalContext.Provider>
  );
};
export default ModalContextProvider;
