import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const ReservePopperContext = createContext({
  id: "",
  anchorEl: null,
  handleOpen: (event) => {
    console.log("작동");
    console.log(event);
  },
  handleClose: () => {},
});

const ReservePopperContextProvider = (props) => {
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    console.log("작동");
    console.log(event);
  };
  const handleClose = () => {
    // setNowOpenModal("");
  };

  return (
    <ReservePopperContext.Provider
      value={{
        id,
        anchorEl,
        handleOpen,
        handleClose,
      }}
      {...props}
    ></ReservePopperContext.Provider>
  );
};
export default ReservePopperContextProvider;
