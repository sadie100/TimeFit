import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

export default () => {
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const handleType = () => {
    if (type === "") return alert("회원 유형을 선택해 주세요.");
    window.localStorage.setItem("membertype", type);
    navigate(`/join/${type}/form`);
  };
  return (
    <>
      <Background>
        <div className="title">회원 유형 선택</div>
        <ButtonWrapper>
          <StyledButton
            onClick={() => setType("user")}
            primary={type === "user"}
          >
            개인
          </StyledButton>
          <StyledButton
            onClick={() => setType("center")}
            primary={type === "center"}
          >
            헬스장 사업자
          </StyledButton>
        </ButtonWrapper>
        <Button padding="1rem 5rem" fontSize="20px" onClick={handleType}>
          다음
        </Button>
      </Background>
    </>
  );
};

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;
const StyledButton = styled(Button)`
  border: 3px solid
    ${({ primary, theme }) => (primary ? "none" : theme.color.main)};
  backgroundcolor: ${({ primary, theme }) =>
    primary ? theme.color.main : "white"};
  min-width: 11rem;
  min-height: 7rem;
`;
