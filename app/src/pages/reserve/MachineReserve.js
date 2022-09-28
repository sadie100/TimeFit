//
// 기구 선택 후 예약 화면
//

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, SampleData, MakeItems } from "components/Center";
import styled from "styled-components";

const MachineReserve = () => {
  const navigate = useNavigate();
  const { machine } = useParams();
  console.log(machine);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const { data } = ApiController({
    //       url: "/api/?",
    //       method: "get",
    //     });
    //     //예약데이터를 받는 api
    //   } catch (e) {
    //     console.log(e);
    //     //에러 타입에 따라 처리
    //     //우선 로그인 없는 경우만 생각해서 구현. 추후수정
    //     alert("로그인 정보가 없습니다. 로그인 화면으로 이동합니다.");
    //     return navigate("/login");
    //   }
    // }
    // fetchData();
    setItemData(SampleData);
  }, []);

  const handleClick = (machine) => {
    navigate(`/reserve/${machine}`);
  };

  return (
    <Background>
      <div className="title">{machine} 예약하기</div>
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
