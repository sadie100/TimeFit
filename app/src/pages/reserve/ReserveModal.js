import Modal from "components/common/Modal";
import { ModalContext } from "contexts/modalContext";
import { useContext, useState, useEffect } from "react";
import { StyledInput } from "components/form/StyledComponents";
import styled from "styled-components";
import Button from "components/common/Button";
import { useForm } from "react-hook-form";

const modalName = "ReserveModal";
const formId = "ReserveForm";

const ReserveModal = () => {
  const { modalProp, handleClose } = useContext(ModalContext);
  const [startTime, setStartTime] = useState([0, 0]);
  const [endTime, setEndTime] = useState([0, 0]);
  const { handleSubmit } = useForm();

  useEffect(() => {
    if (modalProp?.startTime) {
      setStartTime(modalProp.startTime);
    }
    if (modalProp?.endTime) {
      setEndTime(modalProp.endTime);
    }
  }, [modalProp]);

  const onSubmit = (data) => {
    if (!window.confirm("설정한 시간으로 예약하시겠습니까?")) return;
    //todo : 서버 로직
    alert("예약 완료");
    handleClose();
    //todo : 예약하기 서버 데이터 받아오는 함수 modalProp에 끌어오고 여기서 호출하기
  };
  return (
    <Modal modalName={modalName}>
      <WrapperDiv>
        <div className="title">예약 시간 설정</div>
        <StyledForm id={formId} onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            type="text"
            name="startHour"
            width="100px"
            placeholder={startTime[0]}
          />
          <div>:</div>
          <StyledInput
            type="text"
            name="startMin"
            width="100px"
            placeholder={startTime[1]}
          />
          <div>~</div>
          <StyledInput
            type="text"
            name="endHour"
            width="100px"
            placeholder={endTime[0]}
          />
          <div>:</div>
          <StyledInput
            type="text"
            name="endMin"
            width="100px"
            placeholder={endTime[1]}
          />
        </StyledForm>
        <div style={{ textAlign: "center" }}>
          <Button
            form={formId}
            type="submit"
            fontSize="18px"
            padding="20px 30px"
          >
            예약하기
          </Button>
        </div>
      </WrapperDiv>
    </Modal>
  );
};

const WrapperDiv = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
`;

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default ReserveModal;
