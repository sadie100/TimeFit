//가입 이메일 찾기

import React, { useState } from "react";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const formData = () => [
  // {
  //   type: "text",
  //   label: "이름",
  //   name: "name",
  //   register: { required: "이름을 입력해 주세요." },
  //   placeholder: "이름을 입력해 주세요.",
  // },
  {
    type: "text",
    label: "휴대폰 번호",
    name: "phoneNumber",
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
  const axios = useAxiosInterceptor();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    //가입 이메일 찾기 서버 로직
    try {
      const { data } = await axios.get("/signin/find-email", {
        params: formData,
      });
      navigate("/help/success", {
        state: { type: "email", email: data },
      });
    } catch (e) {
      console.log(e);
      alert("입력하신 정보에 해당하는 이메일이 없습니다.");
    }
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
