import React, { useState, useContext } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { ModalContext } from "contexts/modalContext";

const modalName = "DaumPostcode";

export default (props) => {
  const {
    formLine,
    formId,
    errors,
    register,
    setValue,
    StyledInput,
    Label,
    Line,
    LineContent,
  } = props;
  const { handleOpen, handleClose } = useContext(ModalContext);

  const handleComplete = (data) => {
    const required = Object.keys(formLine.get);
    required.map((dataName) => {
      setValue(formLine.get[dataName], data[dataName]);
    });
    handleClose();
  };

  return (
    <>
      <Label key={`label-${formId}-${formLine.name}`}>
        {formLine.label}{" "}
        {formLine.required && <span style={{ color: "red" }}>*</span>}
      </Label>
      <LineContent>
        <StyledInput
          type="text"
          name={formLine.get?.zonecode || "zonecode"}
          key={`${formId}-zonecode`}
          error={errors?.[formLine.get?.zonecode || "zonecode"]}
          placeholder="우편번호를 입력해 주세요"
          {...formLine}
          {...register(formLine.get?.zonecode || "zonecode", {
            required: formLine.required ? "우편번호를 입력해 주세요" : false,
          })}
        ></StyledInput>
        <Button
          padding={({ theme }) => theme.form.padding}
          fontSize="15px"
          //padding="10px"
          fontWeght="500"
          onClick={() => handleOpen(modalName)}
          type={"button"}
        >
          우편번호 검색
        </Button>
      </LineContent>
      <LineContent>
        <StyledInput
          type="text"
          name={formLine.get?.address || "address"}
          key={`${formId}-address`}
          error={errors?.[formLine.get?.address || "address"]}
          placeholder="주소를 입력해 주세요."
          {...formLine}
          {...register(formLine.get?.address || "address", {
            required: formLine.required ? "주소를 입력해 주세요" : false,
          })}
        ></StyledInput>
      </LineContent>
      <LineContent>
        <StyledInput
          type="text"
          name={formLine.get?.detail || "detail"}
          key={`${formId}-detail`}
          error={errors?.[formLine.get?.detail || "detail"]}
          placeholder="상세주소를 입력해 주세요"
          {...formLine}
          {...register(formLine.get?.detail || "detail", {
            required: formLine.required ? "상세주소를 입력해 주세요" : false,
          })}
        ></StyledInput>
      </LineContent>
      <Modal modalName={modalName}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </>
  );
};
