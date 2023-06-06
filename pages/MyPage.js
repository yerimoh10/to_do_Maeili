import { View, Text, Button, StyleSheet} from "react-native";
import BasicButton from "../components/Button/BasicButton";
import { useState } from "react";
import BasicModal from "../components/Modal/BasicModal";
function MyPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = (boolean = false) => {
    setModalVisible(boolean);
  };

  return (
    <View style={{backgroundColor: "#fbfbff"}}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 350,
          marginBottom: 400, // 배경화면 채우기 위한 margin 
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
           <View style={S.modalContainer}>
          <Text style={S.modalText}>매일이 가이드에 오신걸 환영합니다!</Text>
          <Text style={S.modalText}>첫번째 단계입니다.</Text>
          <Text style={S.modalText}>다음으로 넘어가 주세요.</Text>

          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
        </BasicModal>
      </View>
    </View>
  );
}
export default MyPage;

const S = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalText: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "700",
    color: 'white',
    marginBottom: 20,
  },
});