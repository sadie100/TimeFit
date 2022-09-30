import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyPageMain from "pages/mypage/MyPageMain";
import MyInfo from "pages/mypage/MyInfo";
import ChangePassword from "pages/mypage/ChangePassword";
import FindCenter from "pages/mypage/FindCenter";

export default () => {
  return (
    <Routes>
      {/* 마이페이지 화면 */}
      <Route path="/" element={<MyPageMain />}></Route>
      {/* 내 정보 관리 화면 */}
      <Route path="/info" element={<MyInfo />}></Route>
      {/* 비밀번호 변경 화면 */}
      <Route path="/password" element={<ChangePassword />}></Route>
      {/* 헬스장 변경 화면 */}
      <Route path="/center" element={<FindCenter />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
