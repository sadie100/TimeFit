//
// 기구 선택 후 예약 화면 1
//

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, SampleData, MakeItems } from "components/Center";
import styled from "styled-components";
import { MACHINE_NAME } from "constants/center";

const MachineReserve = () => {
  const navigate = useNavigate();
  const { machine } = useParams();
  const [reservation, setReservation] = useState([]);

  //서버에서 데이터 가져와야 함
  useEffect(() => {
    const date = new Date("2017-03-11T11:30:00Z");

    console.log(date.toISOString());
    setReservation([
      {
        id: 22,
        times: [
          {
            reservationId: 2,
            start: "2022-09-27T10:15:11",
            end: "2022-09-27T10:25:11",
          },
          {
            reservationId: 7,
            start: "2022-09-27T10:15:16",
            end: "2022-09-27T10:25:16",
          },
          {
            reservationId: 12,
            start: "2022-09-27T10:15:21",
            end: "2022-09-27T10:25:21",
          },
          {
            reservationId: 17,
            start: "2022-09-27T10:15:26",
            end: "2022-09-27T10:25:26",
          },
        ],
      },
      {
        id: 23,
        times: [
          {
            reservationId: 3,
            start: "2022-09-27T10:15:12",
            end: "2022-09-27T10:25:12",
          },
          {
            reservationId: 8,
            start: "2022-09-27T10:15:17",
            end: "2022-09-27T10:25:17",
          },
          {
            reservationId: 13,
            start: "2022-09-27T10:15:22",
            end: "2022-09-27T10:25:22",
          },
          {
            reservationId: 18,
            start: "2022-09-27T10:15:27",
            end: "2022-09-27T10:25:27",
          },
        ],
      },
    ]);
  }, []);
  return (
    <Background>
      <div className="title">{MACHINE_NAME[machine]} 예약하기</div>
    </Background>
  );
};
export default MachineReserve;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.center.gap}px;
`;
