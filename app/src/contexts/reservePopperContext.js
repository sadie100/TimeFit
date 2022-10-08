import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const ReservePopperContext = createContext({
  id: "",
  anchorEl: null,
  handleOpen: () => {},
  handleClose: null,
  name: "",
});

const ReservePopperContextProvider = (props) => {
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");

  const handleOpen = (event, centerEquipmentId, name) => {
    if (centerEquipmentId === id) {
      setId("");
      setAnchorEl(null);
      setName("");
    } else {
      setAnchorEl(event.currentTarget);
      setId(centerEquipmentId);
      setName(name);
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
        name,
      }}
      {...props}
    ></ReservePopperContext.Provider>
  );
};
export default ReservePopperContextProvider;
