//보유 운동기구 컴포넌트

import * as FormComponent from "components/form/StyledComponents";
import { useFieldArray, Controller } from "react-hook-form";
import Button from "components/common/Button";
import { useTheme } from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

export default (props) => {
  const { formStates, name, formId } = props;
  const { control, register, watch } = formStates;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: name, // unique name for your Field Array
    }
  );
  const { StyledSelect, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const handleAppend = () => {
    append({ equipment: "", count: "" });
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
      }}
    >
      {fields.map((item, index) => {
        return (
          <li
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            key={item.id}
          >
            <Line>
              <LineContent>
                <Label>기구 선택</Label>
                <StyledSelect
                  name="equipment"
                  {...register(`${name}.${index}.equipment`)}
                >
                  <option value="러닝머신">러닝머신</option>
                  <option value="사이클">사이클</option>
                  <option value="일립티컬">일립티컬</option>
                  <option value="스텝퍼">스텝퍼</option>
                  <option value="로잉머신">로잉머신</option>
                  <option value="벤치프레스">벤치프레스</option>
                  <option value="스쿼트머신">스쿼트머신</option>
                  <option value="치닝디핑">치닝디핑</option>
                  <option value="바벨">바벨</option>
                  <option value="덤벨">덤벨</option>
                  <option value="케틀벨">케틀벨</option>
                  <option value="요가매트">요가매트</option>
                  <option value="짐볼&보수볼">짐볼&보수볼</option>
                  <option value="기타">기타(직접입력)</option>
                </StyledSelect>
              </LineContent>
              <LineContent>
                {watch(`${name}.${index}.equipment`) === "기타" && (
                  <StyledInput
                    type="text"
                    placeholder="기구 이름을 입력해 주세요."
                    {...register(`${name}.${index}.name`)}
                  ></StyledInput>
                )}
              </LineContent>
              <LineContent>
                <Label>개수</Label>
                <StyledInput
                  type="number"
                  placeholder="해당 기구의 보유개수를 입력해 주세요."
                  {...register(`${name}.${index}.count`)}
                ></StyledInput>
              </LineContent>
            </Line>
            <Button
              fontSize="14px"
              padding="5px"
              primary={false}
              border="1px solid gray"
              onClick={() => handleRemove(index)}
            >
              <DeleteIcon />
            </Button>
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
