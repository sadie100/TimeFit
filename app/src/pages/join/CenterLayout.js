//헬스장 배치도
import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableFromContainer from "components/common/dnd/DraggableFromContainer";
import DraggableToContainer from "components/common/dnd/DraggableToContainer";
import { useState, useRef, useEffect } from "react";
import machines from "assets/machines";

const upListHeight = 200;
const gap = 50;
const heightGap = upListHeight + gap;
const iconSize = 60;

export default (props) => {
  const {
    machineList = [
      { name: "barbell", count: 5 },
      { name: "treadmill", count: 3 },
      { name: "benchpress", count: 5 },
    ],
  } = props;

  //처음 헬스장 모음
  const [fromItems, setFromItems] = useState([]);

  //이전 페이지에서 machine 데이터 가져와서 그 수만큼 아이콘 배치하기
  useEffect(() => {
    const machineArr = [];
    machineList.map(({ name, count }, idx) => {
      for (let i = 0; i < count; i++) {
        machineArr.push({
          name: `${name}_${i}`,
          top: machineArr.length % 2 === 0 ? 10 : iconSize * 2,
          left: parseInt(machineArr.length / 2) * (iconSize + 20),
          component: (
            <img
              src={machines[name]}
              height={`${iconSize}px`}
              width={`${iconSize}px`}
              style={{ cursor: "pointer" }}
            ></img>
          ),
        });
      }
    });
    machineArr.push({
      name: "entrance",
      top: machineArr.length % 2 === 0 ? 10 : iconSize * 2,
      left: parseInt(machineArr.length / 2) * (iconSize + 20),
      component: <Entrance>입구</Entrance>,
    });
    setFromItems(machineArr);
  }, []);

  //헬스장 배치도 모음
  const [toItems, setToItems] = useState([]);

  return (
    <>
      <Background>
        <div className="title">헬스장 배치도 설정</div>
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
              heightGap={heightGap}
            />
          </Layout>
        </DndProvider>
      </Background>
    </>
  );
};

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${gap}px;
`;

const MachineBox = styled.div`
  border: 1px solid gray;
  width: 800px;
  padding: 10px;
`;
const Layout = styled.div`
  height: 500px;
  border: 1px solid gray;
  width: 800px;
`;

const Entrance = styled.div`
  border: none;
  border-radius: 10px;
  background-color: lightgray;
  cursor: pointer;
  padding: 15px 20px;
  font-family: SLEIGothicTTF;
`;
