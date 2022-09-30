import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/" className="title" style={{ fontWeight: "bold" }}>
        TimeFit.
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/login">로그인</Link>
        <div>|</div>
        <Link to="/join">회원가입</Link>
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
`;

export default Header;
