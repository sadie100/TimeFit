//헬스장 배치도
import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import DraggableFromContainer from "components/common/dnd/DraggableFromContainer";
import DraggableToContainer from "components/common/dnd/DraggableToContainer";
import { useState, useRef, useEffect } from "react";
import machines from "assets/machines";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

const upListHeight = 200;
const gap = 50;
const heightGap = upListHeight + gap;
const iconSize = 60;

export default (props) => {
  const navigate = useNavigate();
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

  //회원가입 로직
  const onSubmit = () => {
    if (!window.confirm("배치도를 저장하시겠습니까?")) return;
    //세션스토리지에 현재 정보 저장, 헬스장 선택 후에 signup 리퀘스트 요청
    const data = window.sessionStorage.getItem("signup");
    data.layout = toItems;

    //서버 로직 하기

    //성공 시 페이지 이동
    navigate("/join/success");
  };

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
        <Button onClick={onSubmit}>저장하기</Button>
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
