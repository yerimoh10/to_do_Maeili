import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView, Alert  } from 'react-native';
import { TextInput } from 'react-native-web';
import Day from './DaySelectPage';
import Time from './TimeSelectPage';
import Week from './WeekSelectPage';
import Month from './MonthSelectPage';

// 루틴 설정 페이지

const RoutinePage = (props) => {
    //console.log(props.value)
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const [dayfromChild, setDayfromChild] = useState('');
    const [timefromChild, setTimefromChild] = useState('');
    
    function sendData(){ // 완료 버튼 때 실행되게 만들기
        props.setValue(dayfromChild);
    }
    
   

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
                        <Text style={styles.header}>루틴 설정</Text>
                        <View style={styles.contentsList}>
                          {/*<View style={styles.viewsty}></View>*/}
                            <Time setValue={setTimefromChild}></Time>

                            
                                {/*<Text style={styles.contentText}>요일 Day </Text>
                            <View style={styles.dayChildsty}></View>*/}
                            <Day setValue={setDayfromChild}></Day>
                            <Week></Week>
                            <Month></Month>
                            
                        </View>
                        <Text> - 반복할 시간 : {timefromChild}</Text>
                        <Text > - 선택한 요일은 {dayfromChild}</Text>

                        

                    <View style={styles.comcanBtn}>{/* complete/cancel button*/}
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
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
            
            <Button
            title='루틴'
            onPress={() => setModalVisible(!modalVisible)}>
            </Button>
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
        backgroundColor: 'white',
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
        height: 400,
        width: 350
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        flex: 1,
        height: 50,
        margin: 20,
        marginTop: 100
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
        color: '#A76EBE'
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
});

export default RoutinePage;