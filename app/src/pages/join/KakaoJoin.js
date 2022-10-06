//카카오에서 유저정보 없어서 회원가입 페이지로 이동한 경우

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "qs";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  console.log(email);
  useEffect(() => {
    alert("유저 정보가 없어 회원가입 페이지로 이동합니다.");
    navigate("/join/membertype", { state: { email: email } });
  }, []);

  return (
    <Background>
      <CircularProgress />
    </Background>
  );
};

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
