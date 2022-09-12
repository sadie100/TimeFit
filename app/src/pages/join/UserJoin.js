import React, { useState } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";

const formData = () => [
  {
    type: "email",
    name: "email",
    label: (
      <>
        이메일 <span style={{ color: "red" }}>*</span>
      </>
    ),
    button: "인증번호 전송",
    buttonOnClick: () => {
      alert("인증번호 전송");
    },
    placeholder: "이메일을 입력해 주세요.",
  },
];
export default () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Name, SetName] = useState("");

  const emailHandler = (e) => {
    e.preventDefault();
    SetEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    SetPassword(e.target.value);
  };

  const nameHandler = (e) => {
    e.preventDefault();
    SetName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/signup/", body, { withCredentials: true })
      .then((res) => console.log(res));
  };

  const checkEmailHandler = (e) => {
    e.preventDefault();
    let email = Email;
    console.log(email);
    axios
      .get(`http://localhost:8080/signup/check-email?email=${email}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <Background>
        <div className="title">회원가입</div>
        <FormMaker formData={formData} onSubmit={onSubmit} />
      </Background>
      {/* <div>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input type="email" value={Email} onChange={emailHandler}></input>
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={passwordHandler}
          ></input>
          <label>Name</label>
          <input type="name" value={Name} onChange={nameHandler}></input>

          <button type="submit">회원가입</button>
        </form>
        <button onClick={checkEmailHandler}>아이디 중복체크</button>
      </div> */}
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
`;
const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
