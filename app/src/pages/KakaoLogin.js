import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

export default () => {
  useEffect(() => {
    //로그인 로직
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
