//센터 찾기

import React, { useState, useContext } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";
import SubmitButton from "components/form/SubmitButton";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "contexts/modalContext";
import TuneIcon from "@mui/icons-material/Tune";
import CenterFilterModal from "pages/center/CenterFilterModal";
import CenterInfoModal from "pages/center/CenterInfoModal";

const Center = () => {
  const formId = "UserFindCenter";
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchCond, setSearchCond] = useState(null);
  const [centerList, setCenterList] = useState([]);
  const [center, setCenter] = useState("");
  const { handleOpen } = useContext(ModalContext);

  const handleSearchCond = (data) => {
    setSearchCond(data);
  };

  const handleSearch = async (data) => {
    let sendingData = { ...data, ...searchCond };
    try {
      const { data } = await axios.get("/centers", sendingData);
      if (data.length === 0) {
        alert("등록된 헬스장이 없습니다.");
        return setCenterList([]);
      }

      const centerList = await Promise.all(
        data.map(async (one) => {
          const { data: imageList } = await axios.get(`/get-center/${one.id}`);
          const mainImage = imageList?.[0].filePath || "";
          return {
            ...one,
            image: mainImage,
          };
        })
      );

      setCenterList(centerList);
    } catch (e) {
      console.log(e);
      alert("에러가 일어났습니다.");
    }
  };

  const handleClickCenter = (center) => {
    setCenter(center._id);
    handleOpen("CenterInfoModal");
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
        <SearchWrapper>
          <FormMaker
            formData={formData}
            onSubmit={handleSearch}
            formId={formId}
          />
          <FilterDiv>
            <TuneIcon onClick={handleFilter} style={{ cursor: "pointer" }} />
          </FilterDiv>
        </SearchWrapper>
        <ListWrapper>
          {centerList.map((center, idx) => {
            return (
              <CenterWrapper
                onClick={() => handleClickCenter(center)}
                key={idx}
              >
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
        <CenterInfoModal center={center} />
        <CenterFilterModal handleSearchCond={handleSearchCond} />
      </Background>
    </>
  );
};

export default Center;

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  min-width: 500px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const FilterDiv = styled.div`
  padding: 30px 0;
  margin-left: -20px;
  display: flex;
  align-items: center;
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
