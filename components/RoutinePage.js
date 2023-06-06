import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, TouchableOpacity, Image, Alert  } from 'react-native';
import Day from './DaySelectPage';
import Time from './TimeSelectPage';
import Week from './WeekSelectPage';
import Month from './MonthSelectPage';
import setting from "../assets/setting_pic.png";
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';

// 루틴 설정 페이지

const RoutinePage = (props) => {
    //console.log(props.value)
    const [modalVisible, setModalVisible] = useState(false);
    const [whichRoutine, setWhichRoutine] = useState('');
    const [original, setOriginal] = useState('');
    const [days, setDays] = useState('');
    
    const CheckingDay = () => {
        if(props.rvalue == 'Day'){
            routineValue('Day, ' + props.rtime)
            console.log("Day, " , props.rtime);
        }
    }
    function sendData(){ // 완료 버튼 때 실행되게 만들기
        //props.setResult(props.value);
        let vvalue = original + ", " + props.value
        //console.log("vvalue : ", vvalue)
        props.setValue(vvalue);
    };
    
    const routineValue = (rvalue) => {
        let result = rvalue.split(',');
        setOriginal(rvalue);
        

        if(result[0] == 'Day'){ // 화면에 보여주기 위한 기능
            if(result[1] == 1) { routineText(result[0], '월'); }
            if(result[1] == 2) { routineText(result[0], '화'); }
            if(result[1] == 3) { routineText(result[0], '수'); }
            if(result[1] == 4) { routineText(result[0], '목'); }
            if(result[1] == 5) { routineText(result[0], '금'); }
            if(result[1] == 6) { routineText(result[0], '토'); }
            if(result[1] == 7) { routineText(result[7], '일'); }
        }else{
            routineText(result[0], result[1])
        }
        
        // console.log("resut1  ", typeof(result[1]))
        // console.log("resut1  ", result[1])
        // switch(result[0]){
        //     case 'Time':
        //         vv = result[1] + '시간 마다 반복';
        //         return setWhichRoutine(vv);
        //     case 'Day':
        //         vv = result[1] + '요일 마다 반복';
        //         return setWhichRoutine(vv);
        //     case 'Week':
        //         vv = result[1] + '주 마다 반복';
        //         return setWhichRoutine(vv);
        //     case 'Month':
        //         vv = result[1] + '달 마다 반복';
        //         return setWhichRoutine(vv);
        // }
    };
    const routineText = (textValue, rtime) => {
        let vv;
        console.log("This is ravale ", rtime.length)
        switch(textValue){
            case 'Time':
                if(rtime != " "){
                    vv = '선택한 루틴 : ' + rtime + '시간 마다 반복';
                    return setWhichRoutine(vv);
                }
            case 'Day':
                if(rtime != " "){
                vv = '선택한 루틴 : ' + rtime + '요일 마다 반복';
                return setWhichRoutine(vv);
                }
            case 'Week':
                if(rtime != " "){
                vv = '선택한 루틴 : ' + rtime + '주 마다 반복';
                return setWhichRoutine(vv);
                }
            case 'Month':
                if(rtime != " "){
                vv = '선택한 루틴 : ' + rtime + '달 마다 반복';
                return setWhichRoutine(vv);
                }
            default:
                vv = '루틴을 설정하지 않았습니다.';
                return setWhichRoutine(vv);
        }
    };

    const complete = () => {
        //console.log("original : ", original)
        sendData();
        setModalVisible(!modalVisible);
    };

    const Reset = () => {
        setOriginal(', ');
        routineText('', '')
        Alert.alert('초기화 되었습니다.');
    };

    return (
        <View>
             <Modal visible={modalVisible}
                animationType='slide'
                transparent={true}
                
                onRequestClose={() => {
                //Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalRoutineView}>
                    <View style={styles.modalView}>
                        <View style={styles.headingSty}>
                            <Text style={styles.header}>루틴 설정</Text>
                            <TouchableOpacity onPress ={() => Reset()}>
                                <Image source={setting} style={styles.imageStyle}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentsList}>
                          {/*<View style={styles.viewsty}></View>*/}
                            <Time setValue={routineValue}></Time>
                                {/*<Text style={styles.contentText}>요일 Day </Text>
                            <View style={styles.dayChildsty}></View>*/}
                            <Day setValue={routineValue}></Day>
                            <Week setValue={routineValue}></Week>
                            <Month setValue={routineValue}></Month>
                            
                        </View>
                        <Text>{whichRoutine}</Text>
                        {/* <Text>parents value: {props.value}</Text> */}
                        {/* <Text> - 반복할 시간 : {timefromChild}</Text>
                        <Text > - 선택한 요일은 {dayfromChild}</Text>
                        <Text> - 반복할 주 : {weekfromChild}주</Text>
                        <Text> - 반복할 달 : {monthfromChild}월 </Text> */}


                    <View style={styles.comcanBtn}>{/* complete/cancel button*/}
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => complete()}>{/* 여기서 루틴 설정 값 함수 호출 */}
                        <Text style={styles.textStyle}>  완료  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>  취소  </Text>
                    </TouchableOpacity>
                    </View>

                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.editTouch} onPress={() => {setModalVisible(!modalVisible); routineText(props.rvalue, props.rtime); CheckingDay();}}>
                <Text style={styles.editText}> 루틴 </Text>
            </TouchableOpacity>
            {/* <Button
            title='루틴'
            onPress={() => {setModalVisible(!modalVisible); routineText(props.rvalue, props.rtime); CheckingDay();}}>
            </Button> */}
            {/*<Text>전달 받은 {props.value}</Text>*/}
        </View>
    );
};

// 루틴 설정 페이지 화면 디자인 변경하려면 여기서! 
const styles = StyleSheet.create({
    modalRoutineView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView : {
        margin: 20,
        backgroundColor: '#f3e6ff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 350,
        width: 350
    },
    buttonClose: {
        backgroundColor: '#DCB3FE',
        flex: 1,
        height: 50,
        margin: 20,
        marginTop: 40,
        borderRadius: 15,
      },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15
    },
    comcanBtn:{
        flexDirection: 'row',
        flex: 1
    },
    header:{
        fontSize: 30,
        textDecorationLine: 'underline',
        padding: 10,
        color: '#A76EBE',
        flex: 2,
        marginLeft: 80,
    },
    contentsList:{
        flex: 1,
        flexDirection: 'row',
        
    },
    contentText: {
        flexGrow: 1,
        padding: 10,
    },
    dayChildsty:{
        flexGrow: 1,
        padding: 10,
    },
    viewsty: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        textAlignVertical: 'center'
    },
    headingSty:{
        flexDirection: "row",
    },
    imageStyle: {
        //marginLeft: 50,
        flex:1,
        borderWidth: 1,
        justifyContent: "center",
        
        width: 30,
        height: 20,
        resizeMode: "contain",
        overflow: "hidden",
    },
    editTouch:{
        backgroundColor: '#DCB3FE',
        justifyContent:'center',
        borderRadius: 15,
    },
    editText: {
        color: "#fff",
        margin: 5,
        fontSize: 17,
        fontFamily: 'WomanFlower',
    },
});

export default RoutinePage;