//센터 찾기

import React, { useState, useContext } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";
import SubmitButton from "components/form/SubmitButton";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import CenterConfirmModal from "pages/join/CenterConfirmModal";
import { ModalContext } from "contexts/modalContext";
import TuneIcon from "@mui/icons-material/Tune";
import CenterFilterModal from "pages/center/CenterFilterModal";

const Center = () => {
  const formId = "UserFindCenter";
  const theme = useTheme();
  const navigate = useNavigate();
  const [centerList, setCenterList] = useState([]);
  const [center, setCenter] = useState("");
  const { handleOpen } = useContext(ModalContext);

  //검색 handle function
  const handleSearch = async (data) => {
    // try {
    //   const result = await axios.post("url", data);
    //   const { data } = result;
    //   setCenterList(data);
    // } catch (e) {
    //   console.log(e);
    //   alert("에러가 일어났습니다.");
    // }
    setCenterList([
      {
        _id: 1,
        name: "11 헬스장",
        address: "서울시 11구 11로 111-111",
        image: "https://source.unsplash.com/random",
      },
      {
        _id: 2,
        name: "22 헬스장",
        address: "서울시 22구 22로 222-222",
        image: "https://source.unsplash.com/random",
      },
      {
        _id: 3,
        name: "33 헬스장",
        address: "서울시 33구 33로 333-333",
        image: "https://source.unsplash.com/random",
      },
      {
        _id: 4,
        name: "44 헬스장",
        address: "서울시 44구 44로 444-444",
        image: "https://source.unsplash.com/random",
      },
      {
        _id: 5,
        name: "55 헬스장",
        address: "서울시 55구 55로 555-555",
        image: "https://source.unsplash.com/random",
      },
    ]);
  };

  const handleClickCenter = (center) => {
    setCenter(center._id);
    handleOpen("CenterConfirmModal");
  };

  const handleFilter = () => {
    handleOpen("CenterFilterModal");
  };

  const formData = () =>
    [
      {
        type: "text",
        name: "search",
        button: "검색",
        buttonType: "submit",
        placeholder: "헬스장 이름으로 헬스장을 검색해 보세요.",
      },
    ].filter((d) => !!d);
  return (
    <>
      <Background>
        <div className="title">헬스장 선택</div>
        <FormMaker
          formData={formData}
          onSubmit={handleSearch}
          formId={formId}
        />
        <FilterDiv>
          <TuneIcon onClick={handleFilter} style={{ cursor: "pointer" }} />
        </FilterDiv>
        <ListWrapper>
          {centerList.map((center, idx) => {
            return (
              <CenterWrapper onClick={() => handleClickCenter(center)}>
                <img width="50%" height="100%" src={center.image} />
                <TextWrapper>
                  <CenterName>{center.name}</CenterName>
                  <div style={{ fontFamily: "Noto Sans KR" }}>
                    주소 : {center.address}
                  </div>
                </TextWrapper>
              </CenterWrapper>
            );
          })}
        </ListWrapper>
        <CenterConfirmModal center={center} />
        <CenterFilterModal />
      </Background>
    </>
  );
};

export default Center;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FilterDiv = styled.div`
  text-align: right;
  width: ${({ theme }) => theme.form.width};
  max-width: ${({ theme }) => theme.form.maxWidth};
  padding: 0 30px;
`;
const ListWrapper = styled.div`
  //border: 1px solid blue;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  width: ${({ theme }) => theme.form.width};
  max-width: ${({ theme }) => theme.form.maxWidth};
`;

const CenterWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const CenterName = styled.span`
  font-family: Noto Sans KR;
  font-weight: bold;
`;
