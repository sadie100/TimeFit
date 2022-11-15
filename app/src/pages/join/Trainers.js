//트레이너 컴포넌트
import LineMaker from "components/form/LineMaker";
import * as FormComponent from "components/form/StyledComponents";
import { useFieldArray, Controller } from "react-hook-form";
import Button from "components/common/Button";

export default (props) => {
  const { formStates, name, formId } = props;
  const { control, register } = formStates;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: name, // unique name for your Field Array
    }
  );
  const { StyledForm, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const handleAppend = () => {
    append({ name: "", gender: "" });
  };
  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flex: "1 1 auto",
        width: "100%",
      }}
      key={`${formId}-${name}`}
    >
      {fields.map((item, index) => {
        return (
          <li
            style={{
              display: "flex",
              gap: "3%",
              alignItems: "center",
              width: "100%",
              // flexWrap: "wrap",
            }}
            key={item.id}
          >
            <Label>이름</Label>
            <StyledInput
              type="text"
              placeholder="이름을 입력해 주세요."
              maxWidth="40%"
              {...register(`${name}.${index}.name`)}
            ></StyledInput>
            <Label>성별</Label>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "start",
                flex: "1 0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "start",
                  flex: "0 0 auto",
                }}
              >
                <div>
                  <input
                    type="radio"
                    name={`${name}.${index}.gender`}
                    id={`${index}_male`}
                    value="남"
                    {...register(`${name}.${index}.gender`)}
                  />
                  <label
                    style={{ cursor: "pointer", flex: "1 0 auto" }}
                    htmlFor={`${index}_male`}
                  >
                    남성
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name={`${name}.${index}.gender`}
                    id={`${index}_female`}
                    value="여"
                    {...register(`${name}.${index}.gender`)}
                  />
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor={`${index}_female`}
                  >
                    여성
                  </label>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{ color: "red", border: "none", background: "none" }}
              onClick={() => handleRemove(index)}
            >
              x
            </button>
          </li>
        );
      })}
      <Button
        onClick={handleAppend}
        type="button"
        fontSize="14px"
        padding="10px 20px"
        secondary={true}
      >
        추가하기
      </Button>
    </ul>
  );
};
