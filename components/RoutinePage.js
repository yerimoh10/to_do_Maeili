import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-web';
import Day from './DaySelectPage';

// class Drop extends Component {
//     render() {
//         let data = [{
//             value: 'Banana',
//           }, {
//             value: 'Mango',
//           }, {
//             value: 'Pear',
//           }];
//         return (
//             <Dropdown 
//                 label = 'favorite'
//                 data={data}
//             />
//         );
//     }
// }


const RoutinePage = (props) => {
    //console.log(props.value)
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const [dayfromChild, setdayfromChild] = useState('');
    
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
                            <Text style={styles.contentText}>시간 Time </Text>

                            <View style={styles.dayviewsty}>
                                <Text style={styles.contentText}>요일 Day </Text>
                                <View style={styles.dayChildsty}><Day setValue={setdayfromChild} ></Day></View>
                                
                            </View>
                            <Text > - 선택한 요일은 {dayfromChild}</Text>
                            <Text style={styles.contentText}>주 Week </Text>
                            <Text style={styles.contentText}>달 Month </Text>
                        </View>

                        

                    <View style={styles.comcanBtn}>
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
    },
    contentText: {
        flexGrow: 1,
        padding: 10,
    },
    dayChildsty:{
        flexGrow: 1,
        padding: 10,
    },
    dayviewsty: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        textAlignVertical: 'center'
    },
});

export default RoutinePage;