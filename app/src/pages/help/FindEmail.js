//가입 이메일 찾기

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import SubmitButton from "components/form/SubmitButton";
import kakaoButton from "assets/image/img-login-kakao.svg";
import { Link, useNavigate } from "react-router-dom";

const formData = () => [
  {
    type: "text",
    label: "이름",
    name: "name",
    register: { required: "이름을 입력해 주세요." },
    placeholder: "이름을 입력해 주세요.",
  },
  {
    type: "text",
    label: "휴대폰 번호",
    name: "phone",
    register: { required: "휴대폰 번호를 입력해 주세요." },
    placeholder: "휴대폰 번호를 입력해 주세요.",
  },
  {
    type: "submit",
    text: "다음",
    name: "submit",
  },
];

const FindEmail = () => {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    //가입 이메일 찾기 서버 로직
    const email = "findEmail";
    navigate("/help/success", {
      state: { type: "email", email, name: data.name },
    });
  };
  return (
    <Background>
      <div className="title">가입 이메일 찾기</div>
      <FormMaker formData={formData} onSubmit={onSubmit} />
    </Background>
  );
};
export default FindEmail;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
