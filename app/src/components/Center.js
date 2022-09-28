import styled from "styled-components";
import machines from "assets/machines";
import { useTheme } from "styled-components";
import Popper from "@mui/material/Popper";
import { useState, useContext } from "react";
import { ReservePopperContext } from "contexts/reservePopperContext";

export const Layout = styled.div`
  width: 800px;
  height: 500px;
  border: 1px solid gray;
`;

export const Entrance = styled.div`
  border: none;
  border-radius: 10px;
  background-color: lightgray;
  cursor: pointer;
  padding: 15px 20px;
  font-family: SLEIGothicTTF;
`;

export const MakeItems = (itemData) => {
  const {
    center: { iconSize },
  } = useTheme();
  const { id, anchorEl, handleOpen } = useContext(ReservePopperContext);
  const handleClickItem = (event, name) => {
    handleOpen(event);
    // setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return itemData.map(({ top, left, name }) => {
    const imgName = name.replace(/_\d/, "");
    return (
      <>
        <div onClick={handleOpen} style={{ top, left, position: "absolute" }}>
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
        <Popper id={name} open={id === name} anchorEl={anchorEl}>
          <div>The content of the Popper.</div>
        </Popper>
      </>
    );
  });
};

export const SampleData = [
  {
    left: 356,
    top: 439,
    name: "entrance",
  },
  {
    left: 15,
    top: 313,
    name: "barbell_1",
  },
  {
    left: 27,
    top: 103,
    name: "barbell_0",
  },
  {
    left: 22,
    top: 205,
    name: "barbell_2",
  },
  {
    left: 242,
    top: 23,
    name: "treadmill_1",
  },
  {
    left: 333,
    top: 18,
    name: "treadmill_2",
  },
  {
    left: 430,
    top: 17,
    name: "treadmill_0",
  },
  {
    left: 697,
    top: 101,
    name: "benchpress_1",
  },
  {
    left: 691,
    top: 196,
    name: "benchpress_0",
  },
  {
    left: 690,
    top: 290,
    name: "benchpress_2",
  },
];
