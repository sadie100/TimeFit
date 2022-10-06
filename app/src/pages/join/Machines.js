//보유 운동기구 컴포넌트

import * as FormComponent from "components/form/StyledComponents";
import { useFieldArray, Controller } from "react-hook-form";
import Button from "components/common/Button";
import { useTheme } from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { MACHINE_NAME } from "constants/center";
import { useEffect, useState } from "react";
import axios from "axios";

export default (props) => {
  const { formStates, name, machines } = props;
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
                  defaultValue={""}
                  {...register(`${name}.${index}.equipment`)}
                >
                  <option value="" disabled style={{ display: "none" }}>
                    기구를 선택해 주세요.
                  </option>
                  {machines.map(({ name, id }) => (
                    <option key={id} value={name}>
                      {MACHINE_NAME[name]}
                    </option>
                  ))}
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
        secondary={true}
      >
        추가하기
      </Button>
    </ul>
  );
};
