//
// 예약 화면
//

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, SampleData } from "components/Center";
import styled from "styled-components";
import ReservePopperContextProvider from "contexts/reservePopperContext";
import SetItems from "pages/reserve/SetItems";
import ReserveModal from "pages/reserve/ReserveModal";
import { useAuth } from "hooks/useAuthContext";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const Reserve = () => {
  const navigate = useNavigate();
  //기구 배치 데이터
  const [itemData, setItemData] = useState([]);
  const { user } = useAuth();
  const axios = useAxiosInterceptor();

  const getEquip = async () => {
    const { data } = await axios.get(`/equipment/${user.center.id}`);
    const equipArr = data.map(({ equipment, xloc, yloc, id }) => {
      return { xloc, yloc, centerEquipmentId: id, img: equipment.img };
    });
    setItemData(equipArr);
  };

  console.log(user);
  useEffect(() => {
    // if (!user) {
    //   alert("유저 정보가 없습니다. 로그인 화면으로 이동합니다.");
    //   navigate("/login");
    // }
    // if (!user.center) {
    //   alert("등록된 헬스장이 없습니다. 헬스장 등록 화면으로 이동합니다.");
    //   navigate("/center?register=true");
    // }
    getEquip();

    // setItemData(SampleData);
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
