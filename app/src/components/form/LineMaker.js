import * as FormComponent from "components/form/StyledComponents";
import Button from "components/common/Button";
import DaumPostcode from "components/form/DaumPostcode";

export default (props) => {
  const { formId, formLine, formStates, errors } = props;
  const { StyledForm, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const { register } = formStates;
  return (
    <>
      <Line key={`line-${formId}-${formLine.name}`}>
        {formLine.type === "address" ? (
          <DaumPostcode
            key={`postcode-${formId}-${formLine.name}`}
            formLine={formLine}
            errors={errors}
            {...formStates}
            {...props}
          ></DaumPostcode>
        ) : (
          <>
            {!!formLine.label && !!formLine?.register?.required ? (
              <Label key={`label-${formId}-${formLine.name}`}>
                {formLine.label} <span style={{ color: "red" }}>*</span>
              </Label>
            ) : (
              <Label key={`label-${formId}-${formLine.name}`}>
                {formLine.label}
              </Label>
            )}
            <LineContent>
              {formLine.type === "email" ? (
                <StyledInput
                  type="email"
                  name={formLine.name}
                  key={`${formId}-${formLine.name}`}
                  error={errors[formLine.name]}
                  {...formLine}
                  {...register(formLine.name, formLine.register)}
                ></StyledInput>
              ) : formLine.type === "password" ? (
                <StyledInput
                  type="password"
                  name={formLine.name}
                  key={`${formId}-${formLine.name}`}
                  error={errors[formLine.name]}
                  {...formLine}
                  {...register(formLine.name, formLine.register)}
                ></StyledInput>
              ) : formLine.type === "text" ? (
                <StyledInput
                  type="text"
                  name={formLine.name}
                  key={`${formId}-${formLine.name}`}
                  error={errors[formLine.name]}
                  {...formLine}
                  {...register(formLine.name, formLine.register)}
                ></StyledInput>
              ) : formLine.type === "submit" ? (
                <Button
                  type="submit"
                  key={`${formId}-${formLine.name}`}
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
                  key={`${formId}-${formLine.name}`}
                  error={errors[formLine.name]}
                  {...formLine}
                  {...register(formLine.name, formLine.register)}
                ></StyledInput>
              ) : formLine.type === "button" ? (
                <Button
                  type="button"
                  key={`${formId}-${formLine.name}`}
                  padding="8px"
                  fontSize="16px"
                  {...formLine}
                >
                  {formLine.text}
                </Button>
              ) : formLine.type === "radio" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "start",
                    flexGrow: 0,
                  }}
                  key={`${formId}-${formLine.name}`}
                >
                  {formLine.buttons.map((btn, idx) => {
                    return (
                      <div key={`${formId}-${formLine.name}-${btn.value}`}>
                        <input
                          type="radio"
                          id={btn.value}
                          name={formLine.name}
                          error={errors[formLine.name]}
                          {...formLine}
                          {...register(formLine.name, formLine.register)}
                        />
                        <label
                          style={{ cursor: "pointer" }}
                          htmlFor={btn.value}
                        >
                          {btn.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : formLine.type === "custom" ? (
                <formLine.render {...props} {...formLine}></formLine.render>
              ) : (
                <StyledInput
                  type={formLine.type}
                  key={`${formId}-${formLine.name}`}
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
                  onClick={formLine.buttonOnClick || (() => {})}
                  disabled={formLine.buttonDisabled}
                  type={formLine.buttonType ? formLine.buttonType : "button"}
                >
                  {formLine.button}
                </Button>
              )}
            </LineContent>

            {!!errors?.[formLine.name] && (
              <ErrorDiv>{errors[formLine.name].message}</ErrorDiv>
            )}
          </>
        )}
      </Line>
    </>
  );
};
