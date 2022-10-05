import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import SubmitButton from "components/form/SubmitButton";
import kakaoButton from "assets/image/img-login-kakao.svg";
import { Link } from "react-router-dom";

export default () => {
  const handleKakao = async () => {
    // try {
    //   if (window.Kakao) {
    //     const kakao = window.Kakao;
    //     // 중복 initialization 방지
    //     if (!kakao.isInitialized()) {
    //       // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    //       kakao.init(process.env.REACT_APP_KAKAO_KEY);
    //     }
    //     const result = await kakao.Auth.authorize({
    //       redirectUri: process.env.REACT_APP_KAKAO_REDIRECT,
    //     });
    //     console.log(result);
    //   }
    // } catch (e) {
    //   console.log(e);
    //   alert("에러가 발생했습니다.");
    // }
  };
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/signin/", data, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다. 다시 시도해 주세요.");
      });
  };
  const formData = () => [
    {
      type: "email",
      label: "이메일",
      name: "email",
      register: { required: "이메일을 입력해 주세요." },
      placeholder: "이메일을 입력해 주세요.",
    },
    {
      type: "password",
      label: "비밀번호",
      name: "password",
      register: { required: "비밀번호를 입력해 주세요." },
      placeholder: "비밀번호를 입력해 주세요.",
    },
  ];

  const formDownside = () => {
    return (
      <Line>
        <div>
          <input type="checkbox"></input>로그인 정보 저장
        </div>
        <SubmitButton>로그인</SubmitButton>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          다른 계정으로 로그인 하기
          <a
            href={`${process.env.REACT_APP_KAKAO_LOGIN}?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code`}
          >
            <img
              src={kakaoButton}
              width="50px"
              height="50px"
              style={{ cursor: "pointer" }}
              // onClick={handleKakao}
            />
          </a>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/join">회원가입</Link>|
            <Link to="/help/email">이메일 찾기</Link>|
            <Link to="/help/password">비밀번호 찾기</Link>
          </div>
        </div>
      </Line>
    );
  };

  return (
    <Background>
      <div className="title">로그인</div>
      <FormMaker
        formData={formData}
        onSubmit={onSubmit}
        formDownside={formDownside}
      />
    </Background>
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
`;
const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
