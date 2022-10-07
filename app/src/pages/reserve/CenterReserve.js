//
// 센터 예약 현황 화면
//

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, SampleData } from "components/Center";
import styled from "styled-components";
import ReservePopperContextProvider from "contexts/reservePopperContext";
import SetItems from "pages/reserve/SetItems";
import ReserveModal from "pages/reserve/ReserveModal";
import * as FormComponent from "components/form/StyledComponents";
import { MACHINE_NAME } from "constants/center";
import TimeColumn from "pages/reserve/TimeColumn";
import ReservationTable from "pages/reserve/ReservationTable";
import { useAuth } from "hooks/useAuthContext";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const CenterReserve = () => {
  const { StyledSelect, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const navigate = useNavigate();
  const axiosInstance = useAxiosInterceptor();

  //선택한 기구
  const [equipment, setEquipment] = useState("");
  const [itemData, setItemData] = useState([]);
  const { accessToken } = useAuth();

  const handleEquipment = (e) => {
    const value = e.currentTarget.value;
    setEquipment(value);
  };

  useEffect(() => {
    //센터 정보 받기
    async function fetchData() {
      //예약데이터를 받는 api
      try {
        const res = await axios.get("/my-reserve");

        // const { data } = useApiController({
        //   url: "/my-reserve",
        //   method: "get",
        //   headers: {
        //     Authorization: accessToken,
        //   },
        // });
      } catch (e) {
        console.log(e);
        //에러 타입에 따라 처리
        //우선 로그인 없는 경우만 생각해서 구현. 추후수정
        alert("로그인 정보가 없습니다. 로그인 화면으로 이동합니다.");
        return navigate("/login");
      }
    }
    fetchData();
    setItemData([
      [
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
      ],
      [
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
      ],
      [
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
      ],
    ]);
  }, [equipment]);

  // const handleClick = (machineType) => {
  //   navigate(`/reserve/${machineType}`);
  // };

  return (
    <Background>
      <div className="title">예약 현황 보기</div>
      <LineContent>
        <Label>기구 선택</Label>
        <StyledSelect name="equipment" onChange={handleEquipment}>
          {Object.entries(MACHINE_NAME).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </StyledSelect>
      </LineContent>
      <LineContent>
        <ReservationTable reservation={itemData} />
      </LineContent>
      <ReserveModal></ReserveModal>
    </Background>
  );
};
export default CenterReserve;

const Background = styled.div`
  padding: 10%;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.center.gap}px;
`;
