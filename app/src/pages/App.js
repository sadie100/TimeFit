import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Join from "./Join";
import Header from "components/base/Header";

const App = () => {
  return (
    <Background>
      <Header />
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
  width: 100%;
  background-color: white;
`;

export default App;
