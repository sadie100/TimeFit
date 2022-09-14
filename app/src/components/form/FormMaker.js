import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "components/common/Button";

export default (props) => {
  const { formData, onSubmit, formDownside = () => {}, formId } = props;
  const formStates = useForm();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formStates;

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)} id={formId}>
        {formData().map((formLine) => {
          return (
            <Line key={`line-${formLine.name}`}>
              {!!formLine.label &&
                (!!formLine?.register?.required ? (
                  <Label key={`label-${formLine.name}`}>
                    {formLine.label} <span style={{ color: "red" }}>*</span>
                  </Label>
                ) : (
                  <Label key={`label-${formLine.name}`}>{formLine.label}</Label>
                ))}
              <LineContent>
                {formLine.type === "email" ? (
                  <StyledInput
                    type="email"
                    name={formLine.name}
                    key={formLine.name}
                    error={errors[formLine.name]}
                    {...formLine}
                    {...register(formLine.name, formLine.register)}
                  ></StyledInput>
                ) : formLine.type === "password" ? (
                  <StyledInput
                    type="password"
                    name={formLine.name}
                    key={formLine.name}
                    error={errors[formLine.name]}
                    {...formLine}
                    {...register(formLine.name, formLine.register)}
                  ></StyledInput>
                ) : formLine.type === "text" ? (
                  <StyledInput
                    type="text"
                    name={formLine.name}
                    key={formLine.name}
                    error={errors[formLine.name]}
                    {...formLine}
                    {...register(formLine.name, formLine.register)}
                  ></StyledInput>
                ) : formLine.type === "submit" ? (
                  <Button
                    type="submit"
                    key={formLine.name}
                    padding="15px"
                    fontSize="20px"
                    {...formLine}
                  >
                    {formLine.text}
                  </Button>
                ) : formLine.type === "date" ? (
                  <StyledInput
                    type="date"
                    name={formLine.name}
                    key={formLine.name}
                    error={errors[formLine.name]}
                    {...formLine}
                    {...register(formLine.name, formLine.register)}
                  ></StyledInput>
                ) : formLine.type === "radio" ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "start",
                      flexGrow: 0,
                    }}
                  >
                    {formLine.buttons.map((btn, idx) => {
                      return (
                        <div key={`${formLine.name}_${idx}`}>
                          <input
                            type="radio"
                            id={btn.value}
                            key={btn.value}
                            name={formLine.name}
                            error={errors[formLine.name]}
                            {...formLine}
                            {...register(formLine.name, formLine.register)}
                          />
                          <label htmlFor={btn.value}>{btn.label}</label>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <StyledInput
                    type={formLine.type}
                    key={formLine.name}
                    name={formLine.name}
                    error={errors[formLine.name]}
                    {...formLine}
                    {...register(formLine.name, formLine.register)}
                  ></StyledInput>
                )}
                {formLine.button && (
                  <Button
                    padding={({ theme }) => theme.form.padding}
                    fontSize="15px"
                    //padding="10px"
                    fontWeght="500"
                    onClick={formLine.buttonOnClick}
                    disabled={formLine.buttonDisabled}
                    type="button"
                  >
                    {formLine.button}
                  </Button>
                )}
              </LineContent>
              {!!errors?.[formLine.name] && (
                <ErrorDiv>{errors[formLine.name].message}</ErrorDiv>
              )}
            </Line>
          );
        })}
        {formDownside()}
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  width: ${({ theme }) => theme.form.width};
  max-width: ${({ theme }) => theme.form.maxWidth};
  padding: 30px;
  display: flex;
  flex-direction: column;
  //align-items: center;
  gap: 10px;
  * {
    font-family: Noto Sans KR;
  }
`;
const Label = styled.span`
  color: gray;
  font-size: 14px;
  font-family: Noto Sans KR;
`;
const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const StyledInput = styled.input`
  // border: ${({ error }) => `1px solid ${error ? "red" : "lightgray"}`};
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: ${({ theme }) => theme.form.padding};
  color: black;
  font-family: Noto Sans KR;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: lightgray;
  }
  :-ms-input-placeholder {
    color: lightgray;
  }
`;
const ErrorDiv = styled.div`
  border: none;
  color: red;
  font-family: Noto Sans KR;
  font-size: 13px;
`;
const LineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  * {
    flex-grow: 1;
  }
`;
