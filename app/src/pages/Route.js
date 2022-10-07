import React, { useContext } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Join from "./join/Join";
import Header from "components/base/Header";
import Sample from "./Sample";
import Reserve from "pages/reserve/Reserve";
import Center from "pages/center/Center";
import Help from "pages/help/Help";
import MyPage from "pages/mypage/MyPage";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingContext } from "contexts/loadingContext";
import SetEquip from "./SetEquip";

const App = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <Background>
      <LoadingBackground loading={loading}>
        <CircularProgress style={{ color: "black" }} />
      </LoadingBackground>
      <Header />
      <Routes>
        {/* 메인 화면 */}
        <Route path="/" element={<Main />}></Route>
        {/* 회원가입 화면 */}
        <Route path="/join/*" element={<Join />}></Route>
        {/* 로그인 화면 */}
        <Route path="/login" element={<Login />}></Route>
        {/* 이메일/비밀번호 찾기 화면 */}
        <Route path="/help/*" element={<Help />}></Route>
        {/* 헬스장찾기 화면 */}
        <Route path="/center" element={<Center />}></Route>
        {/* 예약 화면 */}
        <Route path="/reserve/*" element={<Reserve />}></Route>
        {/* 마이페이지 화면 */}
        <Route path="/mypage/*" element={<MyPage />}></Route>
        {/* 기구 등록 화면 */}
        <Route path="/set-equip" element={<SetEquip />}></Route>
      </Routes>
    </Background>
  );
};

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
`;
const LoadingBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
  z-index: 100;
  display: ${({ loading }) => (loading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
`;

export default App;
