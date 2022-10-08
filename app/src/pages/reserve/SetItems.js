import styled from "styled-components";
import machines from "assets/machines";
import { useTheme } from "styled-components";
import Popper from "@mui/material/Popper";
import { useState, useContext } from "react";
import { ReservePopperContext } from "contexts/reservePopperContext";
import { Entrance } from "components/Center";
import ReservePopper from "pages/reserve/ReservePopper";

export default ({ itemData }) => {
  const {
    center: { iconSize },
  } = useTheme();
  const reservePopper = useContext(ReservePopperContext);
  const { handleOpen } = reservePopper;
  return itemData.map(({ xloc, yloc, img, centerEquipmentId, name }) => {
    const imgName = `http://localhost:8080/image/${img}`;
    return (
      <>
        <div
          onClick={(e) => handleOpen(e, centerEquipmentId, name)}
          style={{ top: yloc, left: xloc, position: "absolute" }}
          key={centerEquipmentId}
        >
          {imgName === "entrance" ? (
            <Entrance>입구</Entrance>
          ) : (
            <img
              src={imgName}
              height={`${iconSize}px`}
              width={`${iconSize}px`}
              style={{ cursor: "pointer" }}
            ></img>
          )}
        </div>
      </>
    );
  });
};
