//비밀번호 변경

import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import {
  StyledInput,
  StyledForm,
  LineContent,
} from "components/form/StyledComponents";
import { useAuth } from "hooks/useAuthContext";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const axios = useAxiosInterceptor();

  const handleSubmit = async (e) => {
    //비밀번호 변경 로직
    e.preventDefault();
    if (!window.confirm("비밀번호를 변경하시겠습니까?")) return;
    try {
      //비밀번호 변경 로직
      await axios.post("/user/change-password", {
        email: user.email,
        password: value,
      });
      alert("비밀번호가 변경되었습니다.");
      navigate("/mypage");
    } catch (e) {
      console.log(e);
      alert("에러가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Background>
      <Wrapper>
        <div className="title">비밀번호 변경</div>
        <StyledForm onSubmit={handleSubmit}>
          <LineContent>
            <StyledInput
              type="password"
              placeholder="변경할 비밀번호를 입력해 주세요."
              onChange={handleChange}
            />
            <Button padding="10px" fontSize="20px">
              변경
            </Button>
          </LineContent>
        </StyledForm>
      </Wrapper>
    </Background>
  );
};

export default ChangePassword;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-family: SLEIGothicTTF;
  font-size: 22px;
`;
const LongButton = styled.div`
  border: 3px solid ${({ theme }) => theme.color.main};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  &.normal {
    padding: 20px 10px;
    cursor: pointer;
  }
`;

const BoxText = styled.div`
  font-size: 20px;
  &.bold {
    font-family: SLEIGothicTTF;
  }
`;
