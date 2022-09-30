import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserReserve from "pages/reserve/UserReserve";
import CenterReserve from "pages/reserve/CenterReserve";
import MachineReserve from "pages/reserve/MachineReserve";

export default () => {
  return (
    <Routes>
      {/* 예약 메인 화면 */}
      <Route path="/" element={<UserReserve />}></Route>
      <Route path="/center" element={<CenterReserve />}></Route>
      {/* 기구 선택 후 예약 화면 */}
      <Route path="/:machine" element={<MachineReserve />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
