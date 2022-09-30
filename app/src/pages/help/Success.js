// 찾기 성공 페이지

import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type } = state;

  return (
    <>
      {type === "email" ? (
        <Background>
          <div className="title">가입 이메일 찾기</div>
          <TextDiv>
            {state.name}님이 가입하신 이메일은 {state.email}입니다.
          </TextDiv>
          <BtnDiv>
            <Button
              padding="20px"
              fontSize="20px"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </Button>
            <Button
              padding="10px"
              fontSize="20px"
              onClick={() => navigate("/help/password")}
            >
              비밀번호 찾기
            </Button>
          </BtnDiv>
        </Background>
      ) : (
        <Background>
          <div className="title">비밀번호 찾기</div>
          <TextDiv>비밀번호는 {state.password}입니다.</TextDiv>
          <BtnDiv>
            <Button
              padding="20px"
              fontSize="20px"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </Button>
          </BtnDiv>
        </Background>
      )}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  padding: 10vh;
  gap: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TextDiv = styled.div`
  font-size: 18px;
  font-family: SLEIGothicTTF;
`;
const BtnDiv = styled.div`
  display: flex;
  gap: 40px;
`;
