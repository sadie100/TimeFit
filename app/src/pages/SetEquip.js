import FormMaker from "components/form/FormMaker";
import axios from "axios";

const SetEquip = () => {
  const onSubmit = async (data) => {
    try {
      const { status } = await axios.post("/equipment/add", data);
      if (status === 200) {
        alert("저장되었습니다.");
      }
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
