import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const ReservePopperContext = createContext({
  id: "",
  anchorEl: null,
  handleOpen: () => {},
  handleClose: null,
});

const ReservePopperContextProvider = (props) => {
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event, name, imgName) => {
    if (name === id) {
      setId("");
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setId(name);
    }
  };
  const handleClose = () => {};

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
