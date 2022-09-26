//트레이너 컴포넌트
import LineMaker from "components/form/LineMaker";
import * as FormComponent from "components/form/StyledComponents";
import { useFieldArray, Controller } from "react-hook-form";
import Button from "components/common/Button";

export default (props) => {
  const { formStates, name, formId } = props;
  const { watch, setValue, getValues, control, register } = formStates;
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
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flex: "1 1 auto",
      }}
    >
      {fields.map((item, index) => {
        return (
          <li
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            key={item.id}
          >
            <Label>이름</Label>
            <StyledInput
              type="text"
              placeholder="이름을 입력해 주세요."
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
              {/* todo : 라디오 버튼 클릭했다가 추가/삭제하면 클릭 value 사라지는 오류 수정하기 */}
              <Controller
                control={control}
                name={`${name}.${index}.gender`}
                key={`${formId}-gender`}
                render={({ field }) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "start",
                      flex: "0 0 auto",
                    }}
                  >
                    <div>
                      <input type="radio" id={`${index}_male`} {...field} />
                      <label
                        style={{ cursor: "pointer", flex: "1 0 auto" }}
                        htmlFor={`${index}_male`}
                      >
                        남성
                      </label>
                    </div>
                    <div>
                      <input type="radio" id={`${index}_female`} {...field} />
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor={`${index}_female`}
                      >
                        여성
                      </label>
                    </div>
                  </div>
                )}
              />
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
      >
        추가하기
      </Button>
    </ul>
  );
};
