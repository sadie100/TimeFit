//내 정보 관리

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "components/common/Button";
import FormMaker from "components/form/FormMaker";
import FormViewer from "components/form/FormViewer";

const formId = "MyInfoForm";

const MyInfo = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [infoData, setInfoData] = useState({});

  useEffect(() => {
    setInfoData({
      email: "email",
      name: "홍길동",
      birthday: "2000/01/02",
      gender: "man",
    });
  }, []);

  const formData = () =>
    [
      {
        type: "email",
        name: "email",
        label: "이메일",
        placeholder: "이메일을 입력해 주세요.",
        register: {
          required: "이메일을 입력해 주세요.",
          disabled: true,
        },
      },
      {
        type: "text",
        name: "name",
        label: "이름",
        placeholder: "이름을 입력해 주세요.",
        register: {
          required: "이름을 입력해 주세요.",
        },
      },
      {
        type: "date",
        name: "birthday",
        label: "생년월일",
        register: {
          required: "생년월일을 입력해 주세요.",
        },
      },
      {
        type: "radio",
        name: "gender",
        label: "성별",
        buttons: [
          { label: "남성", value: "man" },
          { label: "여성", value: "woman" },
        ],
        register: {
          required: "생년월일을 입력해 주세요.",
        },
      },
      {
        type: "number",
        name: "phoneNumber",
        label: "휴대전화",
        placeholder: "휴대전화 번호를 입력해 주세요.",
      },
    ].filter((d) => !!d);

  const handleUpdate = () => {
    setUpdateMode(!updateMode);
  };

  const handleSave = () => {
    if (!window.confirm("저장하시겠습니까?")) return;
    alert("저장 로직");
    handleUpdate();
  };
  return (
    <Background>
      <Wrapper>
        <LongDiv>
          <div className="title">내 정보</div>
        </LongDiv>
        {updateMode ? (
          <FormMaker
            onSubmit={handleSave}
            formData={formData}
            defaultValues={infoData}
            formId={formId}
          />
        ) : (
          <FormViewer infoData={infoData} />
        )}
        <ButtonDiv>
          <Button
            type={updateMode ? "submit" : "button"}
            form={updateMode && formId}
            padding="15px 25px"
            fontSize="20px"
            onClick={!updateMode && handleUpdate}
          >
            {updateMode ? "저장하기" : "수정하기"}
          </Button>
        </ButtonDiv>
      </Wrapper>
    </Background>
  );
};

export default MyInfo;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  max-width: 800px;
`;

const LongDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonDiv = styled.div`
  margin-top: 80px;
  text-align: right;
`;
