import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import { getTimeInfo, setDoubleDigits } from "lib/reserve";
import { reservationTime } from "lib/reserve";

const { openAt, closeAt, totalRowEnd, times } = reservationTime();

const ReservationTable = ({ reservation = [] }) => {
  const [reservedTime, setReservedTime] = useState([]);
  useEffect(() => {
    const reserved = reservation.map((one, idx) => {
      const column = one.map(({ reservationId, start, end, userName }) => {
        const [startHour, startMin] = getTimeInfo(start);
        const [endHour, endMin] = getTimeInfo(end);
        const rowStart =
          (startHour === openAt ? 1 : (startHour - openAt) * 60) + startMin;
        const rowEnd = (endHour - openAt) * 60 + endMin;
        const text = `${userName}님(${setDoubleDigits(
          startHour
        )}:${setDoubleDigits(startMin)}~${setDoubleDigits(
          endHour
        )}:${setDoubleDigits(endMin)})`;
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
      <WhieColumn>
        {times.map(({ label, rowStart, rowEnd }) => (
          <TimeLabel rowStart={rowStart} rowEnd={rowEnd}>
            <span style={{ marginTop: "-10px" }}>{label}</span>
          </TimeLabel>
        ))}
      </WhieColumn>
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
  grid-template-columns: 20px repeat(${({ columnNum }) => columnNum}, 1fr);
  //border: 1px solid Gainsboro;
`;

const WhieColumn = styled.div`
  display: grid;
  background-color: white;
  grid-template-rows: repeat(${totalRowEnd}, 2px);
  grid-template-columns: 1fr;
`;

const TimeColumn = styled.div`
  display: grid;
  background-color: white;
  grid-template-rows: repeat(${totalRowEnd}, 2px);
  grid-template-columns: 1fr;
  border: 1px solid Gainsboro;
  border-right: 1px dashed Gainsboro;
  border-left: none;
  &:last-of-type {
    border-right: 1px solid Gainsboro;
  }
  &:nth-of-type(2) {
    border-left: 1px solid Gainsboro;
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

const TimeLabel = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: ${({ rowStart }) => rowStart};
  grid-row-end: ${({ rowEnd }) => rowEnd};
  display: flex;
  justify-content: flex-end;
  border: none;
  background-color: white;
  & span {
    font-family: Noto Sans KR;
  }
`;
