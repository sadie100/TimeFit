import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
  const { pathname } = useLocation();

  const handleOpen = (name) => {
    setNowOpenModal(name);
  };
  const handleClose = () => {
    setNowOpenModal("");
  };
  const handleModalProp = (data) => {
    setModalProp(data);
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

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
