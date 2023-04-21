import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable } from 'react-native';

const RoutinePage = (props) => {
    //console.log(props.value)
    const [modalVisible, setModalVisible] = useState(false);

    function sendData(){
        props.setValue("자식 데이터");
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
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>  취소  </Text>
                    </Pressable>

                    </View>
                </View>
            </Modal>
            <Button
            title='루틴이'
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
        
        height: 50,
        width: 120,
        margin: 20,
        marginTop: 250
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15
    },
});

export default RoutinePage;