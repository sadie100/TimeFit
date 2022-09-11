import React, { useState } from "react";
import axios from "axios";

export default () => {
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
      .post("http://localhost:8080/signin/",body,{ withCredentials: true })
      .then((res) => console.log(res));
  };
  const HelloHandler = (e) => {

    axios
      .get("http://localhost:8080/helloworld/string/",{ withCredentials: true })
      .then((res) => console.log(res));
  };
  const HelloHandler2 = (e) => {

    axios
      .get("http://localhost:8080/hello/string/",{ withCredentials: true })
      .then((res) => console.log(res));
  };
  const Kakao = "KAKAO"

  return (
    <>
      <div
      >
        <a href ={Kakao}>카카오 로그인</a>
        <form
          onSubmit={submitHandler}
        >
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
      </div>
      
    </>
  );
};