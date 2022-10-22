//저장된 머신 리스트

import { useEffect } from "react";
import styled from "styled-components";
import blank_image from "assets/image/blank_image.png";
import { MACHINE_NAME } from "constants/center";
import useEquipment from "hooks/useEquipment";
import * as FormComponent from "components/form/StyledComponents";

const MachineList = (props) => {
  const { formStates, resetIcon, name, equipment } = props;
  const { setValue, register, watch } = formStates;
  const { StyledInput, Label, LineContent, ErrorDiv } = FormComponent;
  const machines = watch(name) || [];
  // const equipment = useEquipment();

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
                  id={`${name}_${idx}`}
                  name={name}
                  value={idx}
                  {...register(name)}
                ></input>
                <label style={{ cursor: "pointer" }} htmlFor={`${name}_${idx}`}>
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
                  <div
                    style={{
                      fontFamily: "Noto Sans KR",
                      display: "flex",
                      width: "100%",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <div>개수 : </div>
                    <StyledInput
                      fontSize="16px"
                      width="50%"
                      type="number"
                      padding="3px"
                      placeholder="0"
                      {...register(name, {
                        onChange: (e) => {
                          const val = e.currentTarget.value;
                          if (val < 0) {
                            setValue(name, 0);
                          }
                          resetIcon();
                        },
                      })}
                    />
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
