import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import SubmitButton from "components/form/SubmitButton";
import kakaoButton from "assets/image/img-login-kakao.svg";
import { Link } from "react-router-dom";

export default () => {
  const Kakao = "KAKAO";
  const onSubmit = (data) => {
    alert("로그인");
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
          <a href={Kakao}>
            <img
              src={kakaoButton}
              width="50px"
              height="50px"
              style={{ cursor: "pointer" }}
            />
          </a>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/join">회원가입</Link>|<Link to="/">이메일 찾기</Link>|
            <Link to="/">비밀번호 찾기</Link>
          </div>
        </div>
      </Line>
    );
  };
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  const emailHandler = (e) => {
    e.preventDefault();
    SetEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    SetPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(Email);
    console.log(Password);

    let body = {
      email: Email,
      password: Password,
    };

    axios
      .post("http://localhost:8080/signin/", body, { withCredentials: true })
      .then((res) => console.log(res));
  };
  const HelloHandler = (e) => {
    axios
      .get("http://localhost:8080/helloworld/string/", {
        withCredentials: true,
      })
      .then((res) => console.log(res));
  };
  const HelloHandler2 = (e) => {
    axios
      .get("http://localhost:8080/hello/string/", { withCredentials: true })
      .then((res) => console.log(res));
  };

  return (
    <Background>
      <div className="title">로그인</div>
      <FormMaker
        formData={formData}
        onSubmit={onSubmit}
        formDownside={formDownside}
      />
      {/* <div>
        <a href={Kakao}>카카오 로그인</a>
        <form onSubmit={submitHandler}>
          <label>Email</label>
          <input type="uid" value={Email} onChange={emailHandler}></input>
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={passwordHandler}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <button onClick={HelloHandler}>Hello</button>
      </div>
      <div>
        <button onClick={HelloHandler2}>Hello2</button>
      </div> */}
    </Background>
  );
};

const Background = styled.div`
  height: 100vh;
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
