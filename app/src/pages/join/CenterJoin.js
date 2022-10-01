//센터 회원가입

import React, { useState, useEffect } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";
import SubmitButton from "components/form/SubmitButton";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import Trainers from "pages/join/Trainers";
import Machines from "pages/join/Machines";

const formId = "CenterJoin";

export default () => {
  const [isMailSend, setIsMailSend] = useState(false);
  const [certified, setCertified] = useState(false);
  const [centerNumCertified, setCenterNumCertified] = useState(false);
  const [machines, setMachines] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!certified) return alert("이메일 인증을 진행해 주세요.");

    //세션스토리지에 현재 정보 저장, 헬스장 선택 후에 signup 리퀘스트 요청
    window.sessionStorage.setItem("signup", data);

    //헬스장 배치도 페이지로 이동
    navigate("/join/center/layout");
  };

  //사업자등록번호 인증 로직
  const handleStoreNumCheck = async (watch) => {
    const num = watch("companyNum");
    try {
      const respond = await axios({
        method: "get",
        url: "/signup/check-storeNumber",
        params: {
          number: num,
        },
      });
      if (respond.status === 200) {
        setCenterNumCertified(true);
      }
    } catch (e) {
      console.log(e);
      alert("오류가 일어났습니다.");
    }
  };

  //머신 가져오기
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/equipment");
      setMachines(data);
    }
    fetchData();
  }, []);

  const formData = ({ watch }) =>
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
        type: "password",
        name: "password",
        label: "비밀번호",
        placeholder: "비밀번호를 입력해 주세요.",
        register: {
          required: "비밀번호를 입력해 주세요.",
        },
      },
      {
        type: "text",
        name: "name",
        label: "헬스장명",
        placeholder: "헬스장 이름을 입력해 주세요.",
        register: {
          required: "헬스장 이름을 입력해 주세요.",
        },
      },
      {
        type: "number",
        name: "phone",
        label: "헬스장 연락처",
        placeholder: "헬스장 연락처를 입력해 주세요.",
        register: {
          required: "헬스장 연락처를 입력해 주세요.",
        },
      },
      {
        type: "address",
        label: "헬스장 주소",
        get: {
          //다음 api에서 가져올 데이터와 가져올 이름을 짝지어 둔 객체
          zonecode: "zonecode", //우편번호
          address: "address", //기본 주소(ex: 경기 성남시 분당구 판교역로 235)
          sido: "sido", //도/시 이름(ex:경기도,서울특별시)
          sigungu: "sigungu", //시,군,구 이름
          bname: "bname", //법정동/법정리 이름
        },
        detailName: "detail", //상세주소 이름
        required: true,
      },
      {
        type: "text",
        label: "사업자등록번호",
        name: "companyNum",
        button: centerNumCertified ? "인증완료" : "인증",
        buttonOnClick: () => handleStoreNumCheck(watch),
        buttonDisabled: centerNumCertified,
        disabled: centerNumCertified,
        placeholder: "사업자등록번호를 입력해 주세요.",
        register: {
          required: "사업자등록번호를 입력해 주세요.",
        },
      },
      {
        //todo : 사진 컴포넌트 예쁜 걸로 변경 필요, 다중사진 다룰 수 있게 변경 필요
        type: "file",
        label: "헬스장 사진",
        name: "image",
      },
      {
        type: "custom",
        label: "보유 트레이너",
        name: "trainers",
        render: (props) => <Trainers {...props} />,
      },
      {
        type: "custom",
        label: "보유 운동기구",
        name: "machines",
        render: (props) => <Machines {...props} machines={machines} />,
      },
      {
        type: "number",
        label: "1개월 회원권 가격",
        name: "memberFee",
        placeholder: "1개월 회원권 가격을 입력해 주세요.",
        unit: "원",
      },
    ].filter((d) => !!d);

  return (
    <>
      <Background>
        <div className="title">회원가입</div>
        <FormMaker formData={formData} onSubmit={onSubmit} formId={formId} />
        <SubmitButton
          form={formId}
          style={{
            width: "40%",
            maxWidth: `calc(${theme.form.maxWidth} - 120px)`,
          }}
        >
          다음
        </SubmitButton>
      </Background>
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
