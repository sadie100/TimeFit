import Modal from "components/common/Modal";
import { ModalContext } from "contexts/modalContext";
import { useContext, useState, useEffect } from "react";
import { ErrorBorderInput } from "components/form/StyledComponents";
import styled from "styled-components";
import Button from "components/common/Button";
import { useForm } from "react-hook-form";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import { useAuth } from "hooks/useAuthContext";
import { ReservePopperContext } from "contexts/reservePopperContext";

const modalName = "ReserveModal";
const formId = "ReserveForm";

const ReserveModal = () => {
  const { modalProp, handleClose } = useContext(ModalContext);
  const [startTime, setStartTime] = useState([0, 0]);
  const [endTime, setEndTime] = useState([0, 0]);
  const { user } = useAuth();
  const { id, handleClose: reserveClose } = useContext(ReservePopperContext);
  const axios = useAxiosInterceptor();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (modalProp?.startTime) {
      setStartTime(modalProp.startTime);
    }
    if (modalProp?.endTime) {
      setEndTime(modalProp.endTime);
    }
  }, [modalProp]);

  const onSubmit = async (submitData) => {
    if (!window.confirm("설정한 시간으로 예약하시겠습니까?")) return;
    try {
      const { startHour, startMin, endHour, endMin } = submitData;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();

      const start = new Date(
        year,
        month,
        date,
        startHour,
        startMin
      ).toISOString();
      const end = new Date(year, month, date, endHour, endMin).toISOString();

      await axios.post(`/center/${user.center.id}/reserve`, {
        centerEquipmentId: id,
        start,
        end,
      });
      alert("예약이 완료되었습니다.");
      reset();
      handleClose();
      reserveClose();
    } catch (e) {
      console.log(e);
      alert("예약하기 진행 중 에러가 일어났습니다.");
    }
  };
  return (
    <Modal modalName={modalName}>
      <WrapperDiv>
        <div className="title">예약 시간 설정</div>
        <StyledForm id={formId} onSubmit={handleSubmit(onSubmit)}>
          <ErrorBorderInput
            type="text"
            name="startHour"
            width="100px"
            placeholder={startTime[0]}
            error={errors.startHour}
            {...register("startHour", { required: true })}
          />
          <div>:</div>
          <ErrorBorderInput
            type="text"
            name="startMin"
            width="100px"
            placeholder={startTime[1]}
            error={errors.startMin}
            {...register("startMin", { required: true })}
          />
          <div>~</div>
          <ErrorBorderInput
            type="text"
            name="endHour"
            width="100px"
            placeholder={endTime[0]}
            error={errors.endHour}
            {...register("endHour", { required: true })}
          />
          <div>:</div>
          <ErrorBorderInput
            type="text"
            name="endMin"
            width="100px"
            placeholder={endTime[1]}
            error={errors.endMin}
            {...register("endMin", { required: true })}
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
