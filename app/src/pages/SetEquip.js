import FormMaker from "components/form/FormMaker";
import axios from "axios";
import { useEffect, useState } from "react";

const SetEquip = () => {
  const [equips, setEquips] = useState([]);

  const getEquip = async (data) => {
    try {
      const { data } = await axios.get("/equipment");
      setEquips(data);
    } catch (e) {
      console.log(e);
      alert("에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    getEquip();
  }, []);

  const onSubmit = async (data) => {
    try {
      const respond = await axios.post("/equipment/add", data);
      if (respond.status !== 200) {
        return alert("오류가 일어났습니다. 다시 시도해 주세요.");
      }
      const id = respond.data;
      const fileList = data.file;

      //센터 이미지 추가
      let formData = new FormData();
      formData.append("equipmentId", id);
      for (let i = 0; i < fileList.length; i++) {
        formData.append("file", fileList[i]);
      }

      await axios({
        method: "post",
        url: "/upload-equipment",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("저장되었습니다.");
      getEquip();
    } catch (e) {
      console.log(e);
      alert("에러가 일어났습니다.");
    }
  };

  const formData = () => [
    {
      label: "기구 이름(서버에 저장되는 값)",
      name: "name",
      type: "text",
      register: { required: "입력해 주세요" },
    },
    {
      label: "기구 이미지 이름(연결될 이름)",
      name: "img",
      type: "text",
      register: { required: "입력해 주세요" },
    },
    {
      label: "기구 이미지 파일",
      name: "file",
      type: "file",
      register: { required: "등록해 주세요" },
    },
    {
      type: "submit",
      text: "저장",
      name: "submit",
    },
  ];

  return (
    <>
      <div>{equips.map((d) => d.name).join()}</div>
      <FormMaker formId="SetEquip" formData={formData} onSubmit={onSubmit} />
    </>
  );
};

export default SetEquip;
