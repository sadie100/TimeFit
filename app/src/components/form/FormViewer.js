//폼 읽기 전용 뷰어

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as FormComponent from "components/form/StyledComponents";
import LineMaker from "components/form/LineMaker";
import styled from "styled-components";

const dictionary = {
  email: "이메일",
  name: "이름",
  birthday: "생년월일",
  gender: "성별",
  phoneNumber: "연락처",
};

export default (props) => {
  const { infoData, onSubmit, formDownside = () => {}, formId } = props;
  const { StyledForm, Line, StyledInput, LineContent, ErrorDiv } =
    FormComponent;

  return (
    <>
      <Wrapper>
        {Object.entries(infoData).map(([key, value]) => {
          return (
            <LineContent key={`viewer-line-${formId}-${key}`}>
              <LineAtom className="label" key={`viewer-label-${formId}-${key}`}>
                {dictionary[key]}
              </LineAtom>
              <LineAtom>{value}</LineAtom>
            </LineContent>
          );
        })}
        {formDownside()}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const LineAtom = styled.div`
  font-size: 20px;
  font-family: Noto Sans KR;
  flex: 1 0 auto;
  width: 50%;
  &.label {
    color: gray;
  }
`;
