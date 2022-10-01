//헬스장 배치도
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableFromContainer from "components/common/dnd/DraggableFromContainer";
import DraggableToContainer from "components/common/dnd/DraggableToContainer";
import { useState, useRef, useEffect } from "react";
import machines from "assets/machines";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import { Layout, Entrance } from "components/Center";
import { useTheme } from "styled-components";
import FormMaker from "components/form/FormMaker";
import axios from "axios";
import Machines from "pages/join/Machines";
import { useForm } from "react-hook-form";
import {
  StyledForm,
  Line,
  LineContent,
} from "components/form/StyledComponents";

const formId = "CenterLayout";
const fieldName = "equipments";

export default (props) => {
  const {
    center: { iconSize },
  } = useTheme();
  const navigate = useNavigate();
  const {
    machineList = [
      { name: "barbell", count: 3 },
      { name: "treadmill", count: 3 },
      { name: "benchpress", count: 3 },
    ],
  } = props;

  //머신 리스트
  const [machines, setMachines] = useState([]);
  //처음 헬스장 모음
  const [fromItems, setFromItems] = useState([]);

  //머신 가져오기
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/equipment");
      setMachines(data);
    }
    fetchData();
  }, []);

  const formStates = useForm();
  const { watch } = formStates;

  //이전 페이지에서 machine 데이터 가져와서 그 수만큼 아이콘 배치하기
  useEffect(() => {
    const machineArr = [];
    const selectedField = watch(fieldName);
    console.log(selectedField);
    watch(fieldName)
      .filter((d) => !!d.equipment)
      .map(({ equipment, count }, idx) => {
        const machine = machines.find((element) => element.name === equipment);
        const { id, img } = machine;
        for (let i = 0; i < count; i++) {
          machineArr.push({
            center: "센터ID",
            equipment: id,
            name: `${id}_${i}`,
            yloc: machineArr.length % 2 === 0 ? 10 : iconSize * 2,
            xloc: parseInt(machineArr.length / 2) * (iconSize + 20),
            img: img,
            // component: (
            //   <img
            //     src={img}
            //     height={`${iconSize}px`}
            //     width={`${iconSize}px`}
            //     style={{ cursor: "pointer" }}
            //   ></img>
            // ),
          });
        }
      });

    machineArr.push({
      name: "entrance",
      yloc: machineArr.length % 2 === 0 ? 10 : iconSize * 2,
      xloc: parseInt(machineArr.length / 2) * (iconSize + 20),
      component: <Entrance>입구</Entrance>,
    });
    setFromItems(machineArr);
  }, [watch(fieldName)]);

  //헬스장 배치도 모음
  const [toItems, setToItems] = useState([]);

  //회원가입 로직
  const onSubmit = () => {
    if (!window.confirm("배치도를 저장하시겠습니까?")) return;
    //세션스토리지에 현재 정보 저장, 헬스장 선택 후에 signup 리퀘스트 요청
    const data = window.sessionStorage.getItem("signup");
    const layoutData = toItems.map(({ xloc, yloc, name }) => ({
      xloc,
      yloc,
      name,
    }));
    console.log(layoutData);
    data.layout = layoutData;

    //서버 로직 하기

    //성공 시 페이지 이동
    navigate("/join/success");
  };

  return (
    <>
      <Background>
        <div className="title">헬스장 배치도 설정</div>
        <StyledForm formId={formId}>
          <Line>
            <LineContent>
              <Machines
                formStates={formStates}
                machines={machines}
                name={fieldName}
              />
            </LineContent>
          </Line>
        </StyledForm>
        <DndProvider backend={HTML5Backend}>
          <MachineBox>
            <DraggableFromContainer
              items={fromItems}
              setItems={setFromItems}
              type="machine"
            />
          </MachineBox>
          <Layout>
            <DraggableToContainer
              fromItems={fromItems}
              items={toItems}
              setItems={setToItems}
              setFromItems={setFromItems}
              type="machine"
            />
          </Layout>
        </DndProvider>
        <Button onClick={onSubmit}>저장하기</Button>
      </Background>
    </>
  );
};

const Background = styled.div`
  padding: 10vh 0;
  min-width: 1000px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.center.gap}px;
`;

const MachineBox = styled.div`
  border: 1px solid gray;
  width: 800px;
  padding: 10px;
`;
