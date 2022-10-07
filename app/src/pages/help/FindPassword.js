//비밀번호 찾기

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const formId = "FindPassword";

const FindPassword = () => {
  const navigate = useNavigate();
  const [isMailSend, setIsMailSend] = useState(false);
  const [certified, setCertified] = useState(false);
  const axios = useAxiosInterceptor();

  const formData = () =>
    [
      {
        type: "email",
        name: "email",
        label: "이메일",
        button: "인증번호 전송",
        buttonOnClick: () => {
          //인증번호 전송 로직
          setIsMailSend(true);
        },
        placeholder: "이메일을 입력해 주세요.",
        register: {
          required: "이메일을 입력해 주세요.",
        },
      },
      isMailSend && {
        type: "text",
        name: "certificate",
        label: "인증번호 입력",
        placeholder: "인증번호를 입력해 주세요.",
        button: certified ? "인증완료" : "인증",
        buttonOnClick: () => {
          setCertified(true);
        },
        buttonDisabled: certified,
        disabled: certified,
        register: {
          required: "인증을 진행해 주세요.",
        },
      },
      {
        type: "submit",
        text: "다음",
        name: "submit",
      },
    ].filter((d) => !!d);

  const onSubmit = async (formData) => {
    if (!certified) return alert("인증을 진행해 주세요.");
    try {
      const { data } = await axios.get("/signin/find-password", {
        params: formData,
      });
      navigate("/help/success", {
        state: { type: "password", password: data },
      });
    } catch (e) {
      console.log(e);
      alert("입력하신 정보에 해당하는 계정이 없습니다.");
    }
  };
  return (
    <Background>
      <div className="title">비밀번호 찾기</div>
      <FormMaker formData={formData} onSubmit={onSubmit} formId={formId} />
    </Background>
  );
};
export default FindPassword;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
