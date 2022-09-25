import React, { useState, useContext } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { ModalContext } from "contexts/modalContext";

const modalName = "DaumPostcode";

export default (props) => {
  const { formLine, formId, errors, register, StyledInput } = props;
  const { handleOpen } = useContext(ModalContext);

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
        onClick={() => handleOpen(modalName)}
        disabled={formLine.buttonDisabled}
        type={formLine.buttonType ? formLine.buttonType : "button"}
      >
        {formLine.button}
      </Button>
      <Modal modalName={modalName}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </>
  );
};
