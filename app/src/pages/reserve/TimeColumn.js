import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import { ReservePopperContext } from "contexts/reservePopperContext";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import { getTimeInfo } from "lib/center";

const openAt = 9;
const closeAt = 22;

const times = Array.from(
  { length: closeAt - openAt },
  (data, idx) => openAt + idx
).map((d, idx) => {
  return { label: d, rowStart: idx * 60, rowEnd: (idx + 1) * 60 };
});

export default ({ reservation = [] }) => {
  const [reservedTime, setReservedTime] = useState([]);
  console.log(times);
  console.log(reservedTime);
  console.log((closeAt - openAt + 1) * 60);
  useEffect(() => {
    const reserved = reservation.map(({ start, end }) => {
      const [startHour, startMin] = getTimeInfo(start);
      const [endHour, endMin] = getTimeInfo(end);
      const rowStart = (startHour - openAt) * 60 + startMin;
      const rowEnd = (endHour - openAt) * 60 + endMin;
      return { rowStart, rowEnd };
    });
    setReservedTime(reserved);
  }, []);
  return (
    <TimeGrid>
      {times.map(({ label, rowStart, rowEnd }) => (
        <TimeLabel rowStart={rowStart} rowEnd={rowEnd}>
          {label}
        </TimeLabel>
      ))}
      {/* {Array.from(
        { length: closeAt - openAt + 1 },
        (data, idx) => openAt + idx
      ).map((d, idx) => {
        <TimeBlock rowStart={rowStart} rowEnd={rowEnd}></TimeBlock>;
      })} */}
      {reservedTime.map(({ rowStart, rowEnd }) => {
        return <TimeBlock rowStart={rowStart} rowEnd={rowEnd}></TimeBlock>;
      })}
    </TimeGrid>
  );
};

const TimeGrid = styled.div`
  padding: 0;
  background-color: white;
  border: 1px solid gray;
  display: grid;
  grid-template-rows: repeat(${(closeAt - openAt + 1) * 60}, 10px);
  grid-template-columns: 1fr 1fr;
`;

const TimeLabel = styled.div`
  border: 1px solid blue;
  grid-column-start: 1;
  grid-column-end: 2;
//   grid-row-start = ${({ rowStart }) => rowStart};
//   grid-row-end = ${({ rowEnd }) => rowEnd};
  grid-row-start = 1;
  grid-row-end = 2;
`;

const TimeBlock = styled.div`
  border: 1px solid red;
  grid-row-start = ${({ rowStart }) => rowStart};
  grid-row-end = ${({ rowEnd }) => rowEnd};
  grid-column-start: 2;
  grid-column-end: 3;
    
`;
