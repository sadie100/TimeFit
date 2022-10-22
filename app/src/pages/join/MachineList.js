//저장된 머신 리스트

import styled from "styled-components";
import blank_image from "assets/image/blank_image.png";
import { MACHINE_NAME } from "constants/center";
import useEquipment from "hooks/useEquipment";
import * as FormComponent from "components/form/StyledComponents";

const checkboxName = "equipment";

const MachineList = (props) => {
  const equipment = useEquipment();
  const { formStates, name } = props;
  const { control, register, watch } = formStates;
  const { StyledForm, Line, StyledInput, Label, LineContent, ErrorDiv } =
    FormComponent;
  const machines = watch(checkboxName) || [];
  console.log(watch(checkboxName));
  return (
    <>
      <div>
        <Label>머신 선택</Label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "start",
            flexGrow: 0,
            flexWrap: "wrap",
          }}
        >
          {equipment.map((equip, idx) => {
            return (
              <>
                <input
                  type="checkbox"
                  id={`${checkboxName}_${idx}`}
                  name={checkboxName}
                  value={idx}
                  {...register(checkboxName)}
                ></input>
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor={`${checkboxName}_${idx}`}
                >
                  {MACHINE_NAME[equip.name]}
                </label>
              </>
            );
          })}
        </div>
      </div>
      {machines.length > 0 && (
        <ListWrapper machines={machines}>
          {machines.map((machineIdx) => {
            const { id, img, name } = equipment[machineIdx];
            return (
              <MachineWrapper>
                <img
                  style={{
                    maxWidth: "60%",
                    maxHeight: "60%",
                  }}
                  src={img || blank_image}
                />
                <TextWrapper>
                  <CenterName>{MACHINE_NAME[name]}</CenterName>
                  <div style={{ fontFamily: "Noto Sans KR" }}>
                    개수 : <input {...register(name)} />
                  </div>
                </TextWrapper>
              </MachineWrapper>
            );
          })}
        </ListWrapper>
      )}
    </>
  );
};

export default MachineList;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  max-width: 100%;
`;

const MachineWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;
const CenterName = styled.div`
  font-family: Noto Sans KR;
  font-weight: bold;
  width: 100%;
`;
