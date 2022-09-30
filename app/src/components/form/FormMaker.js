import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "components/common/Button";
import DaumPostcode from "components/form/DaumPostcode";
import * as FormComponent from "components/form/StyledComponents";
import LineMaker from "components/form/LineMaker";

export default (props) => {
  const { formData, onSubmit, formDownside = () => {}, formId } = props;
  const { StyledForm, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const formStates = useForm();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = formStates;

  console.log(watch());
  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)} id={formId}>
        {formData(formStates).map((formLine) => {
          return (
            <LineMaker
              formLine={formLine}
              formId={formId}
              formStates={formStates}
              errors={errors}
            />
          );
        })}
        {formDownside()}
      </StyledForm>
    </>
  );
};
