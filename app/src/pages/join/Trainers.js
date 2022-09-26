//트레이너 컴포넌트
import LineMaker from "components/form/LineMaker";
import * as FormComponent from "components/form/StyledComponents";
import { useFieldArray, Controller } from "react-hook-form";

export default (props) => {
  const { formStates, name, formId, formLine } = props;
  const { watch, setValue, getValues, control, register } = formStates;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: name, // unique name for your Field Array
    }
  );
  const { StyledForm, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;

  const formData = (registered) => [
    {
      name: "name",
      label: "이름",
      type: "text",
      register: { value: registered.name },
    },
    {
      name: "gender",
      label: "성별",
      type: "radio",
      buttons: [
        { label: "남성", value: "male" },
        { label: "여성", value: "female" },
      ],
    },
    {
      type: "button",
      text: "추가",
      name: "addBtn",
      onClick: () => {
        append({ name: watch("name"), gender: watch("gender") });
        console.log(watch());
        setValue("name", "");
        setValue("gender", "");
      },
    },
  ];
  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }} key={field.id}>
            <StyledInput
              type="text"
              {...register(`${name}.${index}.name`)}
            ></StyledInput>
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
                  <Controller
                    control={control}
                    name=""
                    key={`${formId}-${formLine.name}-${index}-${btn.value}-div`}
                    render={(props) => (
                      <>
                        <input
                          type="radio"
                          key={`${formId}-${formLine.name}-${index}-${btn.value}`}
                          name={formLine.name}
                          {...formLine}
                          {...props}
                          {...register(`${name}.${index}.gender`)}
                        />
                        <label
                          style={{ cursor: "pointer" }}
                          htmlFor={btn.value}
                        >
                          {btn.label}
                        </label>
                      </>
                    )}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: "1rem" }}>
        {formData({}).map((data) => (
          <LineMaker {...props} formLine={data} />
        ))}
      </div>
    </div>
  );
};
