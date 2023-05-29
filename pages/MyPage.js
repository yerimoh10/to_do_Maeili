import { View, Text, Button } from "react-native";
import BasicButton from "../components/Button/BasicButton";
import { useState } from "react";
import BasicModal from "../components/Modal/BasicModal";
function MyPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = (boolean = false) => {
    setModalVisible(boolean);
  };

  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        <BasicButton
          title={"매일이 가이드"}
          onPress={handleModalVisible.bind(this, true)}
        />
        <BasicModal
          modalVisible={modalVisible}
          setModalVisible={handleModalVisible}
        >
          <Text>매일이 가이드 출력란</Text>
          <Button onPress={()=>{setModalVisible(!modalVisible)}} title="닫기"> </Button>
        </BasicModal>
      </View>
    </>
  );
}
export default MyPage;
