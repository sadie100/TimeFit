//
// 예약 화면
//
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reserve = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/?");
        //예약데이터를 받는 api
      } catch (e) {
        //에러 타입에 따라 처리
        //우선 로그인 없는 경우만 생각해서 구현. 추후수정
        alert("로그인 정보가 없습니다. 로그인 화면으로 이동합니다.");
        navigate("/login");
      }
    }
    fetchData();
  }, []);
  return <div>구현중 화면</div>;
};
export default Reserve;
