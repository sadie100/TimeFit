//센터 정보 모달

import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "contexts/modalContext";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import { useAuth } from "hooks/useAuthContext";

const modalName = "CenterInfoModal";

export default function CenterInfoModal({ center, type }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const axios = useAxiosInterceptor();
  const { user, handleCheck } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!center) {
        return;
      }
      const { data } = await axios.get(`/centers/${center}`);
      const { data: image } = await axios.get(`/get-center/${center}`);
      setData({
        ...data,
        image: image ? image[0].filePath : "",
        trainers: data.trainers.join(","),
      });
    };
    fetchData();
  }, [center]);

  const handleSelect = async () => {
    try {
      if (!window.confirm("해당 헬스장을 선택하시겠습니까?")) return;

      await axios.post("/user/change-center", {
        email: user.email,
        centerId: center,
      });
      alert("센터가 등록되었습니다.");
      await handleCheck();
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <Modal modalName={modalName}>
      <ModalContent>
        {/* 헬스장 사진(서버에서 가져올 것) */}

        <CenterImage src={data.image} />
        <div style={{ width: "100%" }}>
          <DialogTitle sx={{ fontWeight: "bold", padding: 0, margin: 0 }}>
            {data.name}
          </DialogTitle>
          <div>{data.phoneNumber}</div>
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
            {data.machines && (
              <Partition>
                <BoldText>보유 기구</BoldText>
                <p>{data.machines}</p>
              </Partition>
            )}
            {data.price && (
              <Partition>
                <BoldText>가격</BoldText>
                <p>{data.price}</p>
              </Partition>
            )}
          </InfoDiv>
        </DialogContent>
        {type === "change" && (
          <Button
            onClick={async () => await handleSelect()}
            fontSize="18px"
            padding="1rem 3rem"
          >
            선택하기
          </Button>
        )}
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
