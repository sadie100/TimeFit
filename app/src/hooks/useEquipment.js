import { useEffect, useState } from "react";
import axios from "axios";

const useEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  useEffect(() => {
    try {
      const fetch = async () => {
        const { data } = await axios.get("/equipment");
        setEquipment(data);
      };
      fetch();
    } catch (e) {
      console.log(e);
      alert("운동기구 불러오기를 실패하였습니다.");
    }
  }, []);

  return equipment;
};

export default useEquipment;
