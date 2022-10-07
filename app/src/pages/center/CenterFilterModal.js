//센터 필터 모달

import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "contexts/modalContext";
import styled from "styled-components";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormMaker from "components/form/FormMaker";
import { MACHINE_NAME } from "constants/center";
import useEquipment from "hooks/useEquipment";

const modalName = "CenterFilterModal";
const formId = "CenterFilterForm";

export default function CenterFilterModal({ handleSearchCond, searchCond }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const equipment = useEquipment();

  //todo : 초기 데이터 가져오는 로직 서버 연결
  useEffect(() => {
    setData({
      name: "11 헬스장",
      phoneNumber: "02-111-1111",
      image: "https://source.unsplash.com/random",
      address: "서울시 광진구 아차산로 123-232",
      trainers: "홍길동, 홍길길",
      machines: "기구1 3개, 기구2 4개, 기구3 1개, 기구4 1개",
      price: "10만원",
    });
  }, []);

  const handleFilter = (data) => {
    handleSearchCond(data);
  };

  const formData = ({ watch }) =>
    [
      {
        type: "select",
        label: "지역",
        name: "region",
        items: [
          { label: "강원도", value: "강원" },
          { label: "경기도", value: "경기" },
          { label: "경상남도", value: "경남" },
          { label: "경상북도", value: "경북" },
          { label: "광주광역시", value: "광주" },
          { label: "대구광역시", value: "대구" },
          { label: "대전광역시", value: "대전" },
          { label: "부산광역시", value: "부산" },
          { label: "서울특별시", value: "서울" },
          { label: "울산광역시", value: "울산" },
          { label: "인천광역시", value: "인천" },
          { label: "전라남도", value: "전남" },
          { label: "전라북도", value: "전북" },
          { label: "충청북도", value: "충북" },
          { label: "충청남도", value: "충남" },
          { label: "제주특별자치도", value: "제주" },
          { label: "세종특별시", value: "세종" },
        ],
        placeholder: "시/도 선택",
      },
      // !!watch("city") && {
      //   type: "select",
      //   name: "gu",
      //   items: [{ label: "노원구", value: "노원구" }],
      //   placeholder: "구 선택",
      // },
      // !!watch("gu") && {
      //   type: "select",
      //   name: "dong",
      //   items: [{ label: "상계동", value: "상계동" }],
      //   placeholder: "동 선택",
      // },
      {
        label: "기구",
        type: "radio",
        name: "equipment",
        buttons: equipment.map(({ name }) => ({
          label: MACHINE_NAME[name],
          value: name,
        })),
      },
      {
        label: "기구 최소 배치 수",
        type: "number",
        name: "minNumber",
        placeholder: "기구 최소 배치 수를 입력해 주세요.",
      },
      // ...(!!watch("equipment")
      //   ? watch("equipment").map((equip) => ({
      //       label: `${MACHINE_NAME[equip]} 최소 배치 수`,
      //       type: "number",
      //       name: `number_${equip}`,
      //       placeholder: `${MACHINE_NAME[equip]} 최소 배치 수를 입력해 주세요.`,
      //     }))
      //   : []),
      {
        label: "가격",
        name: "price",
        type: "slider",
        minName: "minPrice",
        maxName: "maxPrice",
      },
    ].filter((d) => !!d);
  return (
    <Modal modalName={modalName}>
      <div className="title" style={{ width: "100%", textAlign: "center" }}>
        필터
      </div>
      <ModalContent>
        {/* todo: 헬스장 사진(서버에서 가져올 것) */}
        <FormMaker
          formData={formData}
          onSubmit={handleFilter}
          formId={formId}
          defaultValues={searchCond}
        />
        <Button form={formId} fontSize="18px" padding="1rem 3rem">
          필터 적용하기
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
  min-width: 400px;
`;
