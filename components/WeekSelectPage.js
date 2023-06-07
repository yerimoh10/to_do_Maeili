import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';

const WeekSelectPage = (props) => {
    const [WeekModalVisible, setWeekModalVisible] = useState(false);
    const [weekValue, setWeekValue] = useState('');

    function sendData(){
        let value = 'Week, '+ weekValue;
        props.setValue(value);
    };

    const week = (value) => {
        switch (value){
            case '1':
                return setWeekValue("1")
            case '2':
                return setWeekValue("2")
            case '3':
                return setWeekValue("3")
            case '4':
                return setWeekValue("4")
            case '5':
                return setWeekValue("5")
            case '6':
                return setWeekValue("6")
            case '7':
                return setWeekValue("7")
            case '8':
                return setWeekValue("8")
            case '9':
                return setWeekValue("9")
            case '10':
                return setWeekValue("10")
            case '11':
                return setWeekValue("11")
            case '12':
                return setWeekValue("12")
        }
    };
    const complete = () => {
        console.log("시간은 : ", weekValue);
        sendData();
        setWeekModalVisible(!WeekModalVisible);
    }

    return(
        <View>
            <TouchableOpacity style={styles.weektouch} onPress={() => setWeekModalVisible(!WeekModalVisible)} activeOpacity={0.7}>
                <Text style={styles.weekHeader}> Week </Text>
            </TouchableOpacity>
            <Modal
            animationType='none'
            visible={WeekModalVisible} // 변수로 변경
            transparent={true}>
                <View style={styles.weekModalView}>
                    <View style={styles.scrollSty}>
                    <Text style={styles.chooseWeek}>반복할 주(week)를 선택하세요</Text>
                        <ScrollView>
                        <TouchableOpacity style={[styles.timesty, weekValue == '1'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('1')}>
                                <Text style={styles.weekTextsty}> 1 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '2'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('2')}>
                                <Text style={styles.weekTextsty}> 2 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '3'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('3')}>
                                <Text style={styles.weekTextsty}> 3 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '4'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('4')}>
                                <Text style={styles.weekTextsty}> 4 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '5'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('5')}>
                                <Text style={styles.weekTextsty}> 5 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '6'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('6')}>
                                <Text style={styles.weekTextsty}> 6 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '7'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('7')}>
                                <Text style={styles.weekTextsty}> 7 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '8'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('8')}>
                                <Text style={styles.weekTextsty}> 8 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '9'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('9')}>
                                <Text style={styles.weekTextsty}> 9 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '10'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('10')}>
                                <Text style={styles.weekTextsty}> 10 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '11'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('11')}>
                                <Text style={styles.weekTextsty}> 11 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, weekValue == '12'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => week('12')}>
                                <Text style={styles.weekTextsty}> 12 </Text></TouchableOpacity>
                           
                        </ScrollView>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => complete()} activeOpacity={0.7}>
                                <Text style={styles.textClose}> 닫기 </Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    weektouch: {
        backgroundColor: '#DCB3FE', 
        height: 50,
        width: 60,
        marginTop: 20,
        margin: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    weekHeader: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'WomanFlowerB',
        fontSize: 18,
    },
    weekModalView: {
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
    timesty: {
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
    weekTextsty: {
        marginTop: 4,
        color: 'white',
        fontSize: 20,
        fontFamily: 'WomanFlowerB',
    },
    chooseWeek: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'WomanFlowerB',
    },
});

export default WeekSelectPage;