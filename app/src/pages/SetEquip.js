import FormMaker from "components/form/FormMaker";
import axios from "axios";

const SetEquip = () => {
  const onSubmit = async (data) => {
    try {
      const respond = await axios.post("/equipment/add", data);
      if (respond.status !== 200) {
        return alert("오류가 일어났습니다. 다시 시도해 주세요.");
      }
      console.log(respond);
      const id = respond.data.id;

      //센터 이미지 추가
      let formData = new FormData();
      formData.append("equipmentId", 3);
      formData.append("file", data.file);
      console.log("eid", formData.get("equipmentId"));
      console.log("efile", formData.get("file"));
      await axios.post("/upload-equipment", formData, {
        "Content-Type": "multipart/form-data",
      });
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
    <FormMaker formId="SetEquip" formData={formData} onSubmit={onSubmit} />
  );
};

export default SetEquip;
