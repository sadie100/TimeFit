import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import { getTimeInfo } from "lib/center";

const openAt = 9;
const closeAt = 22;

const ReservationTable = ({ reservation = [] }) => {
  const [reservedTime, setReservedTime] = useState([]);
  useEffect(() => {
    const reserved = reservation.map((one, idx) => {
      const column = one.map(({ reservationId, start, end }) => {
        const [startHour, startMin] = getTimeInfo(start);
        const [endHour, endMin] = getTimeInfo(end);
        const rowStart = (startHour - openAt) * 60 + startMin;
        const rowEnd = (endHour - openAt) * 60 + endMin;
        //todo  : 이름 하드코딩 변경
        const text = `김철수님(${startHour}:${startMin}~${endHour}:${endMin})`;
        return { start, end, rowStart, rowEnd, text, reservationId };
      });
      return {
        id: idx,
        column,
      };
    });
    setReservedTime(reserved);
  }, [reservation]);

  return reservedTime.map(({ id, column }, idx) => {
    return (
      <TimeTable>
        {column.map((reserved, idx) => {
          const { rowStart, rowEnd, text, reservationId } = reserved;
          return (
            <TimeBlock
              rowStart={rowStart}
              rowEnd={rowEnd}
              key={reservationId}
              idx={idx}
            >
              {text}
            </TimeBlock>
          );
        })}
      </TimeTable>
    );
  });
};

export default ReservationTable;

const TimeTable = styled.div`
  display: grid;
  padding: 5px;
  background-color: white;
  grid-template-rows: repeat(${(closeAt - openAt + 1) * 60}, 2px);
  grid-template-columns: 1fr;
  border: 1px solid Gainsboro;
`;

const TimeBlock = styled.div`
  border: none;
  grid-row-start: ${({ rowStart }) => rowStart};
  grid-row-end: ${({ rowEnd }) => rowEnd};
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(prop) => (prop.idx % 2 === 1 ? "#fff9b0" : "#ffd384")};
  font-family: Noto Sans KR;
`;
