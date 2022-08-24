import React, { useState } from "react";
import axios from "axios";

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

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
      name :Name
    };
    console.log(body)
    axios
      .post("http://localhost:8080/signup/",body,{ withCredentials: true })
      .then((res) => console.log(res));
  };

  const checkEmailHandler = (e) => {
    e.preventDefault();
    let email= Email;
    console.log(email )
    axios 
      .get(`http://localhost:8080/signup/check-email?email=${email}`,{ withCredentials: true })
      .then((res) => console.log(res));
  };


  return (
    <>
      <div>
        <form
          onSubmit={submitHandler}>
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
      </div>
    </>
  );
};