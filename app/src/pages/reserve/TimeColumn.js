import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import { getTimeInfo } from "lib/center";
import { ModalContext } from "contexts/modalContext";

const openAt = 9;
const closeAt = 22;

const times = Array.from(
  { length: closeAt - openAt },
  (data, idx) => openAt + idx
).map((d, idx) => {
  return {
    label: d,
    rowStart: idx === 0 ? 1 : idx * 60,
    rowEnd: (idx + 1) * 60,
  };
});

export default ({ reservation = [] }) => {
  const [reservedTime, setReservedTime] = useState([]);
  const { handleOpen, handleModalProp } = useContext(ModalContext);

  useEffect(() => {
    const reserved = reservation.map(({ reservationId, start, end }) => {
      const [startHour, startMin] = getTimeInfo(start);
      const [endHour, endMin] = getTimeInfo(end);
      const rowStart = (startHour - openAt) * 60 + startMin;
      const rowEnd = (endHour - openAt) * 60 + endMin;
      const text = `예약중(${startHour}:${startMin}~${endHour}:${endMin})`;
      return { start, end, rowStart, rowEnd, text, reservationId };
    });
    setReservedTime(reserved);
  }, []);

  const handleReserve = (idx) => {
    //예약가능한 시간 연결
    const startTime =
      idx === 0 ? [openAt, 0] : getTimeInfo(reservedTime[idx - 1].end);
    const endTime =
      idx === reservedTime.length + 1
        ? [closeAt, 0]
        : getTimeInfo(reservedTime[idx].start);
    //모달키기
    handleModalProp({ startTime, endTime });
    handleOpen("ReserveModal");
  };
  return (
    <TimeGrid>
      {times.map(({ label, rowStart, rowEnd }) => (
        <TimeLabel rowStart={rowStart} rowEnd={rowEnd}>
          <span style={{ marginTop: "-10px" }}>{label}</span>
        </TimeLabel>
      ))}
      <TimeTable>
        {reservedTime.map((reserved, idx) => {
          const { rowStart, rowEnd, text, reservationId } = reserved;
          return (
            <>
              <ReserveBlock
                rowStart={idx === 0 ? 1 : reservedTime[idx - 1].rowEnd}
                rowEnd={rowStart}
                key={`${reservationId}-before`}
                onClick={() => handleReserve(idx)}
              />
              <TimeBlock
                rowStart={rowStart}
                rowEnd={rowEnd}
                key={reservationId}
                idx={idx}
              >
                {text}
              </TimeBlock>
              {idx === reservedTime.length - 1 && (
                <ReserveBlock
                  rowStart={rowEnd}
                  rowEnd={(closeAt - openAt + 1) * 60}
                  key={`${reservationId}-end`}
                  onClick={() => handleReserve(idx + 1)}
                />
              )}
            </>
          );
        })}
      </TimeTable>
    </TimeGrid>
  );
};

const TimeGrid = styled.div`
  padding: 5px;
  background-color: white;
  border: none;
  display: grid;
  grid-template-rows: repeat(${(closeAt - openAt + 1) * 60}, 2px);
  grid-template-columns: 1fr 6fr;
  column-gap: 5px;
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

const TimeTable = styled.div`
  display: grid;
  grid-template-rows: repeat(${(closeAt - openAt + 1) * 60}, 2px);
  grid-template-columns: 1fr;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: ${1};
  grid-row-end: ${(closeAt - openAt + 1) * 60};
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

const ReserveBlock = styled.div`
  cursor: pointer;
  border: none;
  grid-row-start: ${({ rowStart }) => rowStart};
  grid-row-end: ${({ rowEnd }) => rowEnd};
  grid-column-start: 1;
  grid-column-end: 2;
  border-color: white;
  &:hover {
    border: 2.5px solid Coral;
    transition: border 0.1s ease;
  }
`;
