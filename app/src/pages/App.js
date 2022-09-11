import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Join from "./Join";

const App = () => {
  return (
    <Background>
      <Header>
        <div>TimeFit.</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div>로그인</div>
          <div>|</div>
          <div>회원가입</div>
        </div>
      </Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />}></Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Background>
  );
};

const Background = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
`;
const Header = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.theme.main.color};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default App;
