//
// 예약 화면
//

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, SampleData } from "components/Center";
import styled from "styled-components";
import ReservePopperContextProvider from "contexts/reservePopperContext";
import SetItems from "pages/reserve/SetItems";
import ReserveModal from "pages/reserve/ReserveModal";
import { useAuth } from "hooks/useAuthContext";

const Reserve = () => {
  const navigate = useNavigate();
  //기구 배치 데이터
  const [itemData, setItemData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      alert("유저 정보가 없습니다. 로그인 화면으로 이동합니다.");
      navigate("/login");
    }
    if (!user.center) {
      alert("등록된 헬스장이 없습니다. 헬스장 등록 화면으로 이동합니다.");
      navigate("/center?register=true");
    }
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

  // const handleClick = (machineType) => {
  //   navigate(`/reserve/${machineType}`);
  // };

  return (
    <Background>
      <div className="title">운동기구 예약하기</div>
      <Layout>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <ReservePopperContextProvider>
            <SetItems itemData={itemData} />
          </ReservePopperContextProvider>
        </div>
      </Layout>
      <ReserveModal></ReserveModal>
    </Background>
  );
};
export default Reserve;

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
