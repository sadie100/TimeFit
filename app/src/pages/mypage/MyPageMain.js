//마이페이지

import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

const MyPageMain = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    if (!window.confirm("예약을 취소하시겠습니까?")) return;
  };

  return (
    <Background>
      <Wrapper>
        <div className="title">마이페이지</div>
        <SubTitle>내 예약</SubTitle>
        <LongButton>
          <div>
            <BoxText>런닝머신1</BoxText>
            <BoxText className="bold">21:00~21:50</BoxText>
          </div>
          <div>
            <Button backgroundColor="lightgray" onClick={handleCancel}>
              예약취소
            </Button>
          </div>
        </LongButton>
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
          onClick={() => navigate("/mypage/center")}
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
