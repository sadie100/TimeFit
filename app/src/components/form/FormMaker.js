import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
              key={`LineMaker-${formId}-${formLine.name}`}
            />
          );
        })}
        {formDownside()}
      </StyledForm>
    </>
  );
};
