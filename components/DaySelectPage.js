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
                return setDayValue("Saturday")
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
            <TouchableOpacity style={styles.daytouch}
            onPress={() => setDayModalVisible(!dayModalVisible)}>
                <Text style={styles.dayHeader}> Day </Text></TouchableOpacity>
            <Modal
                animationType='none'
                visible={dayModalVisible}
                transparent={true}
                onRequestClose={() => {
                    setDayModalVisible(!dayModalVisible)
                }}>
                    <View style={styles.daymodalView}>
                        <View style={styles.scrollSty}>
                        <Text style={styles.chooseDay}>반복할 요일을 선택하세요</Text>
                            <ScrollView>{/*contentContainerStyle={{flexGrow:1}}*/}
                                
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Monday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Mon')}>
                                    <Text style={styles.dayTextsty}>Mon</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Tuesday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Tue')} >
                                    <Text style={styles.dayTextsty}>Tue</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Wednesday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Wed')}>
                                    <Text style={styles.dayTextsty}>Wed</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Thursday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Thu')}>
                                    <Text style={styles.dayTextsty}>Thu</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Friday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Fri')}>
                                    <Text style={styles.dayTextsty}>Fri</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Saturday'? styles.completedTotoTitle : !styles.completedTotoTitle]}
                                    onPress={() => days('Sat')}>
                                    <Text style={styles.dayTextsty}>Sat</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == 'Sunday'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Sun')}>
                                    <Text style={styles.dayTextsty}>Sun</Text> 
                                </TouchableOpacity>   
                                
                            </ScrollView>
                            <TouchableOpacity 
                                    style={styles.buttonClose} 
                                    onPress={()=>complete()}><Text style={styles.textClose}> 닫기 </Text></TouchableOpacity>
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
        backgroundColor: 'skyblue',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        height: 300,
        width: 280,
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
    daysty:{
        borderWidth: 1,
        width: 150,
        height: 30,
        margin: 1,
        alignItems: 'center',
        
    },
    
    buttonClose: {
        backgroundColor: '#2196F3',
        height: 40,
        width: 120,
        marginTop: 10,
    },
    textClose: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 13,
    },
    completedTotoTitle: {
        textDecorationLine: 'line-through',
        backgroundColor: '#8E9DA5'
    },
    dayHeader: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
    },
    daytouch: {
        backgroundColor: '#2196F3',
        height: 40,
        margin: 10,
        width: 60,
        marginTop: 20
    },
    dayTextsty: {
        marginTop: 4,
    },
    chooseDay: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default DaySelectPage;