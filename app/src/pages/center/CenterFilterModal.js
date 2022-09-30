//센터 필터 모달

import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "contexts/modalContext";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormMaker from "components/form/FormMaker";
import { MACHINE_NAME } from "constants/center";

const modalName = "CenterFilterModal";
const formId = "CenterFilterForm";

export default function CenterFilterModal({ center }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  //todo : 초기 데이터 가져오는 로직 서버 연결
  useEffect(() => {
    setData({
      name: "11 헬스장",
      phone: "02-111-1111",
      image: "https://source.unsplash.com/random",
      address: "서울시 광진구 아차산로 123-232",
      trainers: "홍길동, 홍길길",
      machines: "기구1 3개, 기구2 4개, 기구3 1개, 기구4 1개",
      price: "10만원",
    });
  }, []);
  const handleSelect = () => {
    //회원가입 로직 서버에 전달
    const userInfo = window.sessionStorage.getItem("signup");
    //todo : 서버 연결 시 아래 주석 풀기
    navigate("/join/success");
    // axios
    //   .post(
    //     "http://localhost:8080/signup/",
    //     { ...userInfo, center: center, type: "member" },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/join/success");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     alert("에러가 발생했습니다.");
    //   });
  };

  const handleFilter = () => {};

  const formData = ({ watch }) =>
    [
      {
        type: "select",
        label: "지역",
        name: "city",
        items: [{ label: "서울시", value: "서울시" }],
        placeholder: "시 선택",
      },
      !!watch("city") && {
        type: "select",
        name: "gu",
        items: [{ label: "노원구", value: "노원구" }],
        placeholder: "구 선택",
      },
      !!watch("gu") && {
        type: "select",
        name: "dong",
        items: [{ label: "상계동", value: "상계동" }],
        placeholder: "동 선택",
      },
      {
        label: "기구",
        type: "checkbox",
        name: "equipment",
        buttons: Object.entries(MACHINE_NAME).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      },
      ...(!!watch("equipment")
        ? watch("equipment").map((equip) => ({
            label: `${MACHINE_NAME[equip]} 최소 배치 수`,
            type: "number",
            name: `number_${MACHINE_NAME[equip]}`,
            placeholder: `${MACHINE_NAME[equip]} 최소 배치 수를 입력해 주세요.`,
          }))
        : []),
      {
        label: "가격",
        name: "price",
        type: "text",
      },
    ].filter((d) => !!d);
  return (
    <Modal modalName={modalName}>
      <div className="title" style={{ width: "100%", textAlign: "center" }}>
        필터
      </div>
      <ModalContent>
        {/* 헬스장 사진(서버에서 가져올 것) */}
        <FormMaker
          formData={formData}
          onSubmit={handleFilter}
          formId={formId}
        />
        <Button onClick={handleSelect} fontSize="18px" padding="1rem 3rem">
          선택하기
        </Button>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const CenterImage = styled.img`
  width: 100%;
  height: 200px;
`;

const InfoDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;

const BoldText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Partition = styled.div`
  padding: 10px;
`;
