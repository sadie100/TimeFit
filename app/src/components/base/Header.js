//헤더

import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLogin, handleLogout, handleCheck } = useAuth();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Link to="/" className="title" style={{ fontWeight: "bold" }}>
        TimeFit.
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
        {isLogin ? (
          <Link to="#" onClick={handleLogout}>
            로그아웃
          </Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
        {isLogin ? (
          <>
            <div>|</div>
            <Link to="/mypage">마이페이지</Link>
          </>
        ) : (
          <>
            <div>|</div>
            <Link to="/join">회원가입</Link>
          </>
        )}
      </div>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  height: ${({ theme }) => theme.height.header};
  width: 100%;
  background-color: ${(props) => props.theme.color.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  position: fixed;
  z-index: 100;
`;

export default Header;
