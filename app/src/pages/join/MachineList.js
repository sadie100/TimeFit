//저장된 머신 리스트

import styled from "styled-components";
import blank_image from "assets/image/blank_image.png";
import { MACHINE_NAME } from "constants/center";

const MachineList = (props) => {
  const { formStates, name, machines } = props;
  const { control, register, watch } = formStates;
  return (
    <div>
      <div>헬스장 머신</div>
      <ListWrapper>
        {machines.map(({ id, img, name }) => (
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
        ))}
      </ListWrapper>
    </div>
  );
};

export default MachineList;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  width: ${({ theme }) => theme.form.width};
  max-width: ${({ theme }) => theme.form.maxWidth};
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
