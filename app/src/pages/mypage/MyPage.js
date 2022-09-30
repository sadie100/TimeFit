import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyPageMain from "pages/mypage/MyPageMain";
import MyInfo from "pages/mypage/MyInfo";

export default () => {
  return (
    <Routes>
      {/* 마이페이지 화면 */}
      <Route path="/" element={<MyPageMain />}></Route>
      {/* 내 정보 관리 화면 */}
      <Route path="/info" element={<MyInfo />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
