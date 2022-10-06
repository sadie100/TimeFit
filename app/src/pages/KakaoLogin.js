import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import QueryString from "qs";

export default () => {
  const location = useLocation();
  const { code } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    //카카오 로그인 로직
    const func = async () => {
      try {
        const res = await axios.get("/social/login/kakao", {
          params: { code },
        });
      } catch (e) {
        console.log(e);
        if (e.response.statusText === "Not Found") {
          //회원가입 진행
          console.log("회원가입 진행");
          await axios.post("/signup/kakao", { params: { code } });
        } else {
          alert("에러발생");
        }
      }
    };
    func();
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
