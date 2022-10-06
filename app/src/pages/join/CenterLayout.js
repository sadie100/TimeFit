//헬스장 배치도
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableFromContainer from "components/common/dnd/DraggableFromContainer";
import DraggableToContainer from "components/common/dnd/DraggableToContainer";
import { useState, useRef, useEffect } from "react";
import Button from "components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Entrance } from "components/Center";
import { useTheme } from "styled-components";
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
  const { state } = useLocation();
  // const {
  //   machineList = [
  //     { name: "barbell", count: 3 },
  //     { name: "treadmill", count: 3 },
  //     { name: "benchpress", count: 3 },
  //   ],
  // } = props;

  //머신 리스트
  const [machines, setMachines] = useState([]);
  //처음 헬스장 모음
  const [fromItems, setFromItems] = useState([]);
  //헬스장 배치도 모음
  const [toItems, setToItems] = useState([]);

  useEffect(() => {
    //centerId 없으면 리다이렉트
    if (!state?.centerId) {
      alert("센터 id가 없습니다. 회원가입 페이지로 이동합니다.");
      navigate("/join");
    }
    //머신 가져오기
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
    setToItems([]);
    setFromItems([]);
    const machineArr = [];
    const selectedField = watch(fieldName);
    selectedField
      .filter((d) => !!d.equipment)
      .map(({ equipment, count }, idx) => {
        const machine = machines.find((element) => element.name === equipment);
        const { id, img } = machine;
        console.log(img);
        for (let i = 0; i < count; i++) {
          machineArr.push({
            //todo : 센터id 가져오는 걸로 변경
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

    //입구 일단 빼둠
    // machineArr.push({
    //   name: "entrance",
    //   equipment: "entrance",
    //   yloc: machineArr.length % 2 === 0 ? 10 : iconSize * 2,
    //   xloc: parseInt(machineArr.length / 2) * (iconSize + 20),
    // });
    setFromItems(machineArr);
  }, [watch(fieldName)]);

  //회원가입 로직
  const onSubmit = async () => {
    if (!window.confirm("배치도를 저장하시겠습니까?")) return;

    try {
      await Promise.all(
        toItems.map(async ({ xloc, yloc, equipment }) => {
          const item = {
            center: state.centerId,
            equipment,
            xloc,
            yloc,
          };
          await axios.post("/equipment/add-center", item);
        })
      );

      //성공 시 페이지 이동
      navigate("/join/success");
    } catch (e) {
      console.log(e);
      alert("에러가 발생했습니다.");
    }
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
        <Button onClick={async () => await onSubmit()}>저장하기</Button>
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
