//이메일 찾기

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormMaker from "components/form/FormMaker";
import SubmitButton from "components/form/SubmitButton";
import kakaoButton from "assets/image/img-login-kakao.svg";
import { Link } from "react-router-dom";

export default () => {
  return <div>구현중</div>;
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
