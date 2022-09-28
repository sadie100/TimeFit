// 회원가입 성공 페이지

import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <div className="title">회원가입이 완료되었습니다.</div>
        <Button onClick={() => navigate("/login")}>로그인하기</Button>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(90vh - ${theme.height.header})`};
  background-color: white;
  display: flex;
  gap: 10%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
