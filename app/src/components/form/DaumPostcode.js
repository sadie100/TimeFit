import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import Button from "components/common/Button";

export default (props) => {
  const { formLine, formId, errors, register, StyledInput } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <>
      <StyledInput
        type="text"
        name={formLine.name}
        key={`${formId}-${formLine.name}`}
        error={errors?.[formLine.name]}
        {...formLine}
        {...register(formLine.name, formLine.register)}
      ></StyledInput>
      <Button
        padding={({ theme }) => theme.form.padding}
        fontSize="15px"
        //padding="10px"
        fontWeght="500"
        onClick={new daum.Postcode({
          oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          },
        }).open()}
        disabled={formLine.buttonDisabled}
        type={formLine.buttonType ? formLine.buttonType : "button"}
      >
        {formLine.button}
      </Button>
      <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
    </>
  );
};
