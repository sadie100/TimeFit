import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindEmail from "./FindEmail";
import FindPassword from "./FindPassword";

const Help = () => {
  return (
    <Routes>
      {/* 이메일 찾기 화면 */}
      <Route path="/email" element={<FindEmail />}></Route>
      {/* 비밀번호 찾기 화면 */}
      <Route path="/password" element={<FindPassword />}></Route>
    </Routes>
  );
};

export default Help;
