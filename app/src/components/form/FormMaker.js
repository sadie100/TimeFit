import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "components/common/Button";
import DaumPostcode from "components/form/DaumPostcode";
import * as FormComponent from "components/form/StyledComponents";
import LineMaker from "components/form/LineMaker";

export default (props) => {
  const {
    formData,
    onSubmit,
    formDownside = () => {},
    formId,
    defaultValues = {},
  } = props;
  const { StyledForm } = FormComponent;
  const formStates = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = formStates;

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
