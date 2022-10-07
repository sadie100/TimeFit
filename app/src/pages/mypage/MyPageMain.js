//마이페이지

import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import { useAuth } from "hooks/useAuthContext";

const MyPageMain = () => {
  const navigate = useNavigate();
  const axios = useAxiosInterceptor();
  const [reservation, setReservation] = useState([]);
  const { user } = useAuth();

  const getReserve = async () => {
    try {
      const { data } = await axios.get("/my-reserve");
      setReservation(data);
    } catch (e) {
      console.log(e);
      alert("예약 조회 과정에서 에러가 발생했습니다.");
    }
  };

  const handleCancel = async (reservationId) => {
    if (!window.confirm("예약을 취소하시겠습니까?")) return;
    try {
      const centerId = user.center;
      await axios.delete(`/center/${centerId}/reserve/${reservationId}`);
      alert("예약이 취소되었습니다.");
      await getReserve();
    } catch (e) {
      console.log(e);
      alert("예약 취소 과정에서 에러가 발생했습니다.");
    }
  };

  const handleReserve = () => {
    navigate("/reserve");
  };

  useEffect(() => {
    getReserve();
  }, []);

  return (
    <Background>
      <Wrapper>
        <div className="title">마이페이지</div>
        <SubTitle>내 예약</SubTitle>
        {reservation.length > 0 ? (
          reservation.map(({ equipName, start, end, reservationId }, idx) => {
            return (
              <LongButton key={idx}>
                <div>
                  <BoxText>{equipName}</BoxText>
                  <BoxText className="bold">
                    {start}~{end}
                  </BoxText>
                </div>
                <div>
                  <Button
                    backgroundColor="lightgray"
                    onClick={async () => await handleCancel(reservationId)}
                  >
                    예약취소
                  </Button>
                </div>
              </LongButton>
            );
          })
        ) : (
          <LongButton>
            <div>
              <BoxText>예약 없음</BoxText>
            </div>
            <div>
              <Button onClick={handleReserve}>예약하러 가기</Button>
            </div>
          </LongButton>
        )}
        <SubTitle>계정관리</SubTitle>
        <LongButton className="normal" onClick={() => navigate("/mypage/info")}>
          <BoxText>내 정보 관리</BoxText>
          <BoxText>&#62;</BoxText>
        </LongButton>
        <LongButton
          className="normal"
          onClick={() => navigate("/mypage/password")}
        >
          <BoxText>비밀번호 변경</BoxText>
          <BoxText>&#62;</BoxText>
        </LongButton>
        <LongButton
          className="normal"
          onClick={() => navigate("/center?type=change")}
        >
          <BoxText>헬스장 변경</BoxText>
          <BoxText>&#62;</BoxText>
        </LongButton>
      </Wrapper>
    </Background>
  );
};

export default MyPageMain;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-family: SLEIGothicTTF;
  font-size: 22px;
`;
const LongButton = styled.div`
  border: 3px solid ${({ theme }) => theme.color.main};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  &.normal {
    padding: 20px 10px;
    cursor: pointer;
  }
`;

const BoxText = styled.div`
  font-size: 20px;
  &.bold {
    font-family: SLEIGothicTTF;
  }
`;
