import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, TouchableOpacity, ScrollView  } from 'react-native';

const DaySelectPage = (props) => {
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [dayValue, setDayValue] = useState("");

    const days = (sday) => {
        switch (sday){
            case 'Mon':
                return setDayValue("1")
            case 'Tue':
                return setDayValue("2")
            case 'Wed':
                return setDayValue("3")
            case 'Thu':
                return setDayValue("4")
            case 'Fri':
                return setDayValue("5")
            case 'Sat':
                return setDayValue("6")
            case 'Sun':
                return setDayValue("0")
        }
        
        
    };
    
    function sendData(){
        let value = 'Day, '+ dayValue;
        props.setValue(value);
    };
    const complete = () => {
        console.log("여기는 : ", dayValue);
        sendData();
        setDayModalVisible(!dayModalVisible);
    }
    return (
        <View>
            <TouchableOpacity style={styles.daytouch}
            onPress={() => setDayModalVisible(!dayModalVisible)} activeOpacity={0.7}>
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
                            <ScrollView>
                                
                                <TouchableOpacity style={[styles.daysty, dayValue == '1'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Mon')}>
                                    <Text style={styles.dayTextsty}>월요일</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '2'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Tue')} >
                                    <Text style={styles.dayTextsty}>화요일</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '3'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Wed')}>
                                    <Text style={styles.dayTextsty}>수요일</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '4'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Thu')}>
                                    <Text style={styles.dayTextsty}>목요일</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '5'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Fri')}>
                                    <Text style={styles.dayTextsty}>금요일</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '6'? styles.completedTotoTitle : !styles.completedTotoTitle]}
                                    onPress={() => days('Sat')}>
                                    <Text style={styles.dayTextsty}>토요일</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.daysty, dayValue == '0'? styles.completedTotoTitle : !styles.completedTotoTitle]} 
                                    onPress={() => days('Sun')}>
                                    <Text style={styles.dayTextsty}>일요일</Text> 
                                </TouchableOpacity>   
                                
                            </ScrollView>
                            <TouchableOpacity 
                                    activeOpacity={0.7}
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
        backgroundColor: '#e0baff',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        height: 300,
        width: 280,
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
        width: 180,
        height: 33,
        margin: 1.5,
        alignItems: 'center',
        borderColor: '#f3e6ff',
        borderRadius: 15,
    },
    
    buttonClose: {
        backgroundColor: '#A76EBE', 
        height: 40,
        width: 120,
        marginTop: 10,
        borderRadius: 15,
        //justifyContent: 'center',
    },
    textClose: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'WomanFlowerB',
    },
    completedTotoTitle: {
        backgroundColor: '#A76EBE'
    },
    dayHeader: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'WomanFlowerB',
        fontSize: 18,
    },
    daytouch: {
        backgroundColor: '#DCB3FE', 
        height: 50,
        width: 60,
        marginTop: 20,
        margin: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    dayTextsty: {
        marginTop: 4,
        color: 'white',
        fontFamily: 'WomanFlowerB',
        fontSize: 20,
    },
    chooseDay: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'WomanFlowerB',
    },
});

export default DaySelectPage;