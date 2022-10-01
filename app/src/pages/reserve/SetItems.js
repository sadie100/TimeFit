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
  return itemData.map(({ top, left, name }) => {
    const imgName = name.replace(/_\d/, "");
    return (
      <>
        <div
          onClick={(e) => handleOpen(e, name, imgName)}
          style={{ top, left, position: "absolute" }}
        >
          {imgName === "entrance" ? (
            <Entrance>입구</Entrance>
          ) : (
            <img
              src={machines[imgName]}
              height={`${iconSize}px`}
              width={`${iconSize}px`}
              style={{ cursor: "pointer" }}
            ></img>
          )}
        </div>
        <ReservePopper name={name} type={imgName} />
      </>
    );
  });
};
