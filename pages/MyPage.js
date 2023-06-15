import { View, Text, Button, StyleSheet, Image, StatusBar } from "react-native";
import BasicButton from "../components/Button/BasicButton_mypage";
import { useState } from "react";
import BasicModal from "../components/Modal/BasicModal";
import Timer from "../components/Timer"
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
function MyPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 각 버튼의 상태를 저장할 변수

  const handleModalVisible = (step) => {
    setCurrentStep(step); // 현재 단계를 설정
    setModalVisible(true); // 모달을 열기
  };

  const handleModalClose = () => {
    setModalVisible(false); // 모달을 닫기
  };

  // 버튼에 대한 이미지 경로를 반환하는 함수
  const getImageSource = (step) => {
    return imagePaths[step] || null;
  };

  const imagePaths = {
    1: require("../assets/가이드화면/홈가이드(1).png"),
    2: require("../assets/가이드화면/홈가이드(2).png"),
    3: require("../assets/가이드화면/홈가이드(3).png"),
    4: require("../assets/가이드화면/홈가이드(4).png"),
    5: require("../assets/가이드화면/홈가이드(5).png"),
    6: require("../assets/가이드화면/홈가이드(6).png"),
    7: require("../assets/가이드화면/홈가이드(7).png"),
    8: require("../assets/가이드화면/홈가이드(8).png"),
    9: require("../assets/가이드화면/홈가이드(9).png"),
    10: require("../assets/가이드화면/홈가이드(10).png"),
    11: require("../assets/가이드화면/홈가이드(11).png"),
    12: require("../assets/가이드화면/홈가이드(12).png"),
    13: require("../assets/가이드화면/홈가이드(13).png"),
    14: require("../assets/가이드화면/홈가이드(14).png"),
    15: require("../assets/가이드화면/홈가이드(15).png"),
    16: require("../assets/가이드화면/홈가이드(16).png"),
    17: require("../assets/가이드화면/홈가이드(17).png"),
    18: require("../assets/가이드화면/홈가이드(18).png"),
    19: require("../assets/가이드화면/캘린더(1).png"),
    20: require("../assets/가이드화면/캘린더(2).png"),
    21: require("../assets/가이드화면/캘린더(3).png"),
    22: require("../assets/가이드화면/캘린더(4).png"),
    23: require("../assets/가이드화면/캘린더(5).png"),
    24: require("../assets/가이드화면/캘린더(6).png"),
    25: require("../assets/가이드화면/캘린더(7).png"),
    26: require("../assets/가이드화면/캘린더(8).png"),
    27: require("../assets/가이드화면/회고록(1).png"),
    28: require("../assets/가이드화면/회고록(2).png"),
    29: require("../assets/가이드화면/회고록(3).png"),
    30: require("../assets/가이드화면/환경설정(1).png"),
    31: require("../assets/가이드화면/환경설정(2).png"),
    //32: require("../assets/가이드화면/환경설정(3).png"), 
  };

  const handleNextStep = () => {
    // 다음 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    // 이전 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    
    <View style={S.Safeareaview}>
      <StatusBar
        animated={true}
        backgroundColor="#fbfbff"
        barStyle={'dark-content'}
      />
      <View style={S.headerview}> 

        <Text style={[S.header]}>
          환경설정
        </Text>
      </View>
      

      <View style={[S.container]}>

        <View style={S.buttonSty}>
          <View style={S.firstBtn}>
            <BasicButton
              title={"홈 가이드"}
              onPress={() => handleModalVisible(1)}
              style={S.text} // 스타일 추가
            />

            <BasicButton
              title={"캘린더\n가이드"}
              onPress={() => handleModalVisible(19)}
              style={S.text}
            />
          </View>
          <View style={S.firstBtn}> 
            <BasicButton
              title={"회고록\n가이드"}
              onPress={() => handleModalVisible(27)} 
              style={S.text}
              />

            <BasicButton
              title={"환경설정\n 가이드"}
              onPress={() => handleModalVisible(30)} 
              style={S.text}
              /> 
          </View>
        </View>
        <Timer />
        

        <BasicModal
          modalVisible={modalVisible}
          setModalVisible={handleModalClose}
        >
         
            <View style={S.modalContainer}>
              <Image source={getImageSource(currentStep)} style={S.image} />

              <View style={S.buttonContainer}>
                <>
                  {currentStep > 1 && currentStep !== 19 && currentStep !== 27 && currentStep !== 30 && (
                    <Button
                      title="이전"
                      onPress={handlePreviousStep}
                      color="#DCB3FE"
                    />
                  )}
                  {currentStep < 18 && (
                    <Button
                      title="다음"
                      onPress={handleNextStep}
                      color="#DCB3FE"
                    />
                  )}
                  {currentStep >= 19 && currentStep < 26 && (
                    <Button
                      title="다음"
                      onPress={handleNextStep}
                      color="#DCB3FE"
                    />
                  )}
                  {currentStep >= 27 && currentStep < 29 && (
                    <Button
                      title="다음"
                      onPress={handleNextStep}
                      color="#DCB3FE"
                    />
                  )}
                  {currentStep >= 30 && currentStep < 31 && (
                    <Button
                      title="다음"
                      onPress={handleNextStep}
                      color="#DCB3FE"
                    />
                  )}
                 </>
                
              </View>
              <Button
                title="닫기"
                onPress={handleModalClose}
                color="#A76EBE"
              />
            </View>
            
        </BasicModal>
      </View>
      </View>
   
  );
}
export default MyPage;

const S = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbfbff",
    flex: 1,
    //height: '100%',
  },
  buttonSty:{
    //marginTop: '10%',
    marginBottom: '10%',
    width: '80%',
    height: '50%'
  },
  firstBtn:{
    //width: '80%',
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  Safeareaview:{
    flex: 1,
    backgroundColor: "#fbfbff",

  },
  headerview:{
   
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 1,
    marginVertical: 10,
    
  },
  header: {
    fontFamily: "WomanFlower",
    marginTop: 10,
    fontSize: 40,
    fontWeight: "600",
    padding: 20,
    textAlign: "left",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 25,
    marginBottom: 35, // 버튼 간 간격
    activeOpacity: 0.7
  },

});