//센터 회원가입

import React, { useState, useEffect } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";
import SubmitButton from "components/form/SubmitButton";
import { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Trainers from "pages/join/Trainers";
import { useLoading } from "hooks/useLoadingContext";

const formId = "CenterJoin";

export default () => {
  const { state } = useLocation();
  const [isMailSend, setIsMailSend] = useState(false);
  const [certified, setCertified] = useState(false);
  const [centerNumCertified, setCenterNumCertified] = useState(false);
  const { startLoading, endLoading } = useLoading();

  const theme = useTheme();
  const navigate = useNavigate();

  //회원가입 로직
  const onSubmit = async (data) => {
    if (!certified) return alert("이메일 인증을 진행해 주세요.");
    console.log(data);
    if (!window.confirm("회원가입을 진행하시겠습니까?")) return;
    startLoading();

    try {
      //이메일 체크 진행
      await axios.get("/signup/check-email", {
        params: { email: data.email },
      });
    } catch (e) {
      console.log(e);
      alert("중복된 이메일입니다. 이메일을 변경해 주세요.");
      return endLoading();
    }

    try {
      data.address = data.basic + " " + data.detail;
      //센터 회원가입 요청
      const respond = await axios.post("/signup-center", data);
      const centerId = respond.data.centerId;

      if (!!state?.kakaoId) {
        //만약 카카오에서 리다이렉트됐을 경우, 카카오 회원가입 요청
        await axios.post("/signup/kakao", {
          email: data.email,
          kakaoId: state.kakaoId,
        });
      }

      if (data.trainers.length > 0) {
        //센터 트레이너 추가
        await Promise.all(
          data.trainers.map(async (trainer) => {
            await axios.post(`/signup/add-trainer/${centerId}`, trainer);
          })
        );
      }

      const fileList = data.image;

      if (fileList.length > 0) {
        //센터 이미지 추가
        let formData = new FormData();
        formData.append("centerId", centerId);
        for (let i = 0; i < fileList.length; i++) {
          formData.append("file", fileList[i]);
        }

        await axios.post("/upload-center", formData, {
          "Content-Type": "multipart/form-data",
        });
      }

      alert("회원가입이 완료되었습니다. 헬스장 배치도 페이지로 이동합니다.");
      //헬스장 배치도 페이지로 이동
      navigate("/join/center/layout", { state: { centerId: centerId } });
    } catch (e) {
      console.log(e);
      if (
        e.response.status === 400 &&
        e.response.data.path === "/signup-center"
      ) {
        alert("헬스장 주소를 우편번호 검색을 통해 받아 주세요.");
      } else {
        alert("오류가 발생했습니다. 새로고침 후 다시 시도해 주세요.");
      }
    }
    endLoading();
  };

  //사업자등록번호 인증 로직
  const handleStoreNumCheck = async (watch) => {
    const num = watch("storeNumber");
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
        type: "text",
        name: "phoneNumber",
        label: "헬스장 연락처",
        placeholder: "헬스장 연락처를 입력해 주세요.",
        register: {
          required: "헬스장 연락처를 입력해 주세요.",
          maxLength: 11,
        },
      },
      {
        //todo : 서버랑 필드명 맞추기
        type: "address",
        label: "헬스장 주소",
        get: {
          //다음 api에서 가져올 데이터와 가져올 이름을 짝지어 둔 객체
          zonecode: "zonecode", //우편번호
          address: "basic", //기본 주소(ex: 경기 성남시 분당구 판교역로 235)
          sido: "region", //도/시 이름(ex:경기도,서울특별시)
          sigungu: "sigungu", //시,군,구 이름
          bname: "bname", //법정동/법정리 이름
        },
        detailName: "detail", //상세주소 이름
        required: true,
      },
      {
        type: "text",
        label: "사업자등록번호",
        name: "storeNumber",
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
        //todo : 사진 컴포넌트 예쁜 걸로 변경 필요
        type: "file",
        label: "헬스장 사진",
        name: "image",
        multiple: true,
      },
      {
        type: "custom",
        label: "보유 트레이너",
        name: "trainers",
        render: (props) => <Trainers {...props} />,
      },
      {
        type: "number",
        label: "1개월 회원권 가격",
        name: "price",
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
