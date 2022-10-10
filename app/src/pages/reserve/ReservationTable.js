import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import { getTimeInfo, setDoubleDigits } from "lib/reserve";

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
        const text = `김철수님(${setDoubleDigits(startHour)}:${setDoubleDigits(
          startMin
        )}~${setDoubleDigits(endHour)}:${setDoubleDigits(endMin)})`;
        return { start, end, rowStart, rowEnd, text, reservationId };
      });
      return {
        id: idx,
        column,
      };
    });
    setReservedTime(reserved);
  }, [reservation]);

  return (
    <TimeTable columnNum={reservedTime.length}>
      {reservedTime.map(({ id, column }, idx) => {
        return (
          <TimeColumn>
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
          </TimeColumn>
        );
      })}
    </TimeTable>
  );
};

export default ReservationTable;

const TimeTable = styled.div`
  display: grid;
  background-color: white;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(${({ columnNum }) => columnNum}, 1fr);
  border: 1px solid Gainsboro;
`;
const TimeColumn = styled.div`
  display: grid;
  background-color: white;
  grid-template-rows: repeat(${(closeAt - openAt + 1) * 60}, 2px);
  grid-template-columns: 1fr;
  border-right: 1px dashed Gainsboro;
  &:last-of-type {
    border-right: none;
  }
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
