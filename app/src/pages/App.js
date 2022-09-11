import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Join from "./Join";
import Header from "components/base/Header";
import Sample from "./Sample";
import Reserve from "./Reserve";

const App = () => {
  return (
    <Background>
      <Header />
      <Routes>
        {/* 메인 화면 */}
        <Route path="/" element={<Main />}></Route>
        {/* 회원가입 화면 */}
        <Route path="/join" element={<Join />}></Route>
        {/* 로그인 화면 */}
        <Route path="/login" element={<Login />}></Route>
        {/* 헬스장찾기 화면 */}
        <Route path="/center" element={<Sample />}></Route>
        {/* 예약 화면 */}
        <Route path="/reserve" element={<Reserve />}></Route>
      </Routes>
    </Background>
  );
};

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;

export default App;
