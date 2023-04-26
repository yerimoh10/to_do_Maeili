import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, TouchableOpacity, ScrollView  } from 'react-native';

const DaySelectPage = (props) => {
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [dayValue, setDayValue] = useState("");

    const days = (sday) => {
        switch (sday){
            case 'Mon':
                return setDayValue("Monday")
            case 'Tue':
                return setDayValue("Tuesday")
            case 'Wed':
                return setDayValue("Wednesday")
            case 'Thu':
                return setDayValue("Thursday")
            case 'Fri':
                return setDayValue("Friday")
            case 'Sat':
                return setDayValue("saturday")
            case 'Sun':
                return setDayValue("Sunday")
        }
        
    };
    
    function sendData(){
        props.setValue(dayValue);
    };
    const complete = () => {
        console.log("여기는 : ", dayValue);
        sendData();
        setDayModalVisible(!dayModalVisible);
    }
    return (
        <View>
            <TouchableOpacity 
            onPress={() => setDayModalVisible(!dayModalVisible)}>
                <Text>요일 선택하기</Text>
            </TouchableOpacity>
            <Modal
                animationType='none'
                visible={dayModalVisible}
                transparent={true}
                onRequestClose={() => {
                    setDayModalVisible(!dayModalVisible)
                }}>
                    <View style={styles.daymodalView}>
                        <View style={styles.scrollSty}>
                            <ScrollView  >{/*contentContainerStyle={{flexGrow:1}}*/}
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Mon')}>
                                    <Text>Mon</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Tue')} >
                                    <Text>Tue</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Wed')}>
                                    <Text>Wed</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Thu')}>
                                    <Text>Thu</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Fri')}>
                                    <Text>Fri</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Sat')}>
                                    <Text>Sat</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weeksty} onPress={() => days('Sun')}>
                                    <Text>Sun</Text> 
                                </TouchableOpacity>   
                                <TouchableOpacity onPress={()=>complete()}><Text>닫기 </Text></TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    daymodalView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    scrollSty: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        height: 150,
        width: 180,
        //borderWidth:1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    weeksty:{
        borderWidth: 1,
        width: 150,
        height: 25,
        alignItems: 'center',
        
    },
});

export default DaySelectPage;