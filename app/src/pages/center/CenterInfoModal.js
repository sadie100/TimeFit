//센터 정보 모달

import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "contexts/modalContext";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const modalName = "CenterInfoModal";

export default function CenterInfoModal({ center }) {
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

  return (
    <Modal modalName={modalName}>
      <ModalContent>
        {/* 헬스장 사진(서버에서 가져올 것) */}

        <CenterImage src={data.image} />
        <div style={{ width: "100%" }}>
          <DialogTitle sx={{ fontWeight: "bold", padding: 0, margin: 0 }}>
            {data.name}
          </DialogTitle>
          <div>{data.phone}</div>
        </div>
        <DialogContent sx={{ padding: 0, margin: 0 }}>
          <InfoDiv>
            <Partition>
              <BoldText>주소</BoldText>
              <p>{data.address}</p>
            </Partition>
            <Partition>
              <BoldText>트레이너</BoldText>
              <p>{data.trainers}</p>
            </Partition>
            <Partition>
              <BoldText>보유 기구</BoldText>
              <p>{data.machines}</p>
            </Partition>
            <Partition>
              <BoldText>가격</BoldText>
              <p>{data.price}</p>
            </Partition>
          </InfoDiv>
        </DialogContent>
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
