//헬스장 배치도
import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableContainer from "components/common/dnd/DraggableContainer";
import DragLayer from "components/common/dnd/DragLayer";
import { useState } from "react";
import machines from "assets/machines";

export default () => {
  const [items, setItems] = useState(
    Object.entries(machines).map(([key, value], idx) => {
      return {
        top: 10,
        left: idx * 70,
        component: <img src={value} height="50px" width="50px"></img>,
      };
    })
  );
  return (
    <>
      <Background>
        <div className="title">헬스장 배치도 설정</div>
        <DndProvider backend={HTML5Backend}>
          <MachineBox>
            <DraggableContainer
              items={items}
              setItems={setItems}
              type="machine"
            />
            <DragLayer />
          </MachineBox>
          <Layout></Layout>
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
  gap: 3rem;
`;

const MachineBox = styled.div`
  height: 200px;
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
