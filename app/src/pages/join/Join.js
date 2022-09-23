import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MemberType from "pages/join/MemberType";
import UserJoin from "pages/join/UserJoin";
import Success from "pages/join/Success";
import FindCenter from "pages/join/FindCenter";

export default () => {
  return (
    <Routes>
      {/* 회원 유형 설정 화면 */}
      <Route path="/membertype" element={<MemberType />}></Route>
      {/* 개인 정보 입력 화면 */}
      <Route path="/:type/form" element={<UserJoin />}></Route>
      <Route path="/find-center" element={<FindCenter />}></Route>
      <Route path="/success" element={<Success />}></Route>
      <Route path="*" element={<Navigate to="/join/membertype" replace />} />
    </Routes>
  );
};
