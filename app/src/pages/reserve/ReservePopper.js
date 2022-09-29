//기구 선택하면 뜨는 예약 팝업

import Popper from "@mui/material/Popper";
import { useState, useContext, useEffect } from "react";
import { ReservePopperContext } from "contexts/reservePopperContext";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";
import TimeColumn from "pages/reserve/TimeColumn";

export default ({ name, type }) => {
  const reservePopper = useContext(ReservePopperContext);
  const { id, anchorEl } = reservePopper;
  const [reservation, setReservation] = useState([]);

  //서버에서 데이터 가져와야 함
  useEffect(() => {
    setReservation([
      {
        reservationId: 2,
        start: "2022-09-27T01:00:11",
        end: "2022-09-27T01:15:11",
      },
      {
        reservationId: 7,
        start: "2022-09-27T02:15:16",
        end: "2022-09-27T02:35:16",
      },
      {
        reservationId: 12,
        start: "2022-09-27T05:00:21",
        end: "2022-09-27T06:00:21",
      },
      {
        reservationId: 17,
        start: "2022-09-27T12:00:26",
        end: "2022-09-27T13:45:26",
      },
    ]);
  }, []);
  return (
    <Popper id={id} open={id === name} anchorEl={anchorEl}>
      <WrapperDiv>
        <Title>{MACHINE_NAME[type]}</Title>
        <TimeColumn reservation={reservation}></TimeColumn>
      </WrapperDiv>
    </Popper>
  );
};

const WrapperDiv = styled.div`
  padding: 10px;
  width: 250px;
  max-height: 350px;
  overflow: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid lightgray;
`;

const Title = styled.div`
  font-family: SLEIGothicTTF;
  font-size: 20px;
  text-align: center;
`;
