//헬스장 배치도
import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableFromContainer from "components/common/dnd/DraggableFromContainer";
import DraggableToContainer from "components/common/dnd/DraggableToContainer";
import DragLayer from "components/common/dnd/DragLayer";
import { useState, useRef, useEffect } from "react";
import machines from "assets/machines";

const upListHeight = 200;
const gap = 50;
const heightGap = upListHeight + gap;

export default (props) => {
  const {
    machineList = [
      { name: "barbell", count: 3 },
      { name: "treadmill", count: 2 },
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
          top: machineArr.length % 2 === 0 ? 10 : 100,
          left: parseInt(machineArr.length / 2) * 70,
          component: (
            <img
              src={machines[name]}
              height="50px"
              width="50px"
              style={{ cursor: "pointer" }}
            ></img>
          ),
        });
      }
    });
    setFromItems(machineArr);
  }, []);

  //헬스장 배치도 모음
  const [toItems, setToItems] = useState([]);

  //layout 절대높이 알기 위한 로직
  const layoutRef = useRef(null);
  const [layoutTop, setLayoutTop] = useState(0);

  useEffect(() => {
    if (layoutRef.current) {
      setLayoutTop(layoutRef.current.offsetTop);
    }
  }, []);

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
          <Layout ref={layoutRef}>
            <DraggableToContainer
              fromItems={fromItems}
              items={toItems}
              setItems={setToItems}
              setListItems={setFromItems}
              type="machine"
              heightGap={heightGap}
              layoutTop={layoutTop}
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
  height: ${upListHeight}px;
  border: 1px solid gray;
  width: 800px;
  padding: 10px;
`;
const Layout = styled.div`
  height: 500px;
  // minheight: 300px;
  border: 1px solid gray;
  width: 800px;
  // minwidth: 300px;
`;
