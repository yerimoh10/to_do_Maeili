import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';

const MonthSelectPage = (props) => {
    const [MonthModalVisible, setMonthModalVisible] = useState(false);
    const [monthValue, setMonthValue] = useState('');

    function sendData(){
        let value = 'Month, '+ monthValue;
        props.setValue(value);
    };

    const month = (value) => {
        switch (value){
            case '1':
                return setMonthValue("1")
            case '2':
                return setMonthValue("2")
            case '3':
                return setMonthValue("3")
            case '4':
                return setMonthValue("4")
            case '5':
                return setMonthValue("5")
            case '6':
                return setMonthValue("6")
            case '7':
                return setMonthValue("7")
            case '8':
                return setMonthValue("8")
            case '9':
                return setMonthValue("9")
            case '10':
                return setMonthValue("10")
            case '11':
                return setMonthValue("11")
            case '12':
                return setMonthValue("12")
        }
    };
    const complete = () => {
        console.log("시간은 : ", monthValue);
        sendData();
        setMonthModalVisible(!MonthModalVisible);
    }

    return(
        <View>
            <TouchableOpacity style={styles.montouch} onPress={() => setMonthModalVisible(!MonthModalVisible)} activeOpacity={0.7}>
                <Text style={styles.monHeader}> Month </Text>
            </TouchableOpacity>
            <Modal
            animationType='none'
            visible={MonthModalVisible} // 변수로 변경
            transparent={true}>
                <View style={styles.monthModalView}>
                    <View style={styles.scrollSty}>
                    <Text style={styles.chooseMon}>반복할 달(month)을 선택하세요</Text>
                        <ScrollView>
                        <TouchableOpacity style={[styles.monthsty, monthValue == '1'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('1')}>
                                <Text style={styles.monthTextsty}> 1월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '2'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('2')}>
                                <Text style={styles.monthTextsty}> 2월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '3'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('3')}>
                                <Text style={styles.monthTextsty}> 3월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '4'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('4')}>
                                <Text style={styles.monthTextsty}> 4월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '5'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('5')}>
                                <Text style={styles.monthTextsty}> 5월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '6'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('6')}>
                                <Text style={styles.monthTextsty}> 6월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '7'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('7')}>
                                <Text style={styles.monthTextsty}> 7월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '8'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('8')}>
                                <Text style={styles.monthTextsty}> 8월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '9'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('9')}>
                                <Text style={styles.monthTextsty}> 9월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '10'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('10')}>
                                <Text style={styles.monthTextsty}> 10월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '11'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('11')}>
                                <Text style={styles.monthTextsty}> 11월 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.monthsty, monthValue == '12'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => month('12')}>
                                <Text style={styles.monthTextsty}> 12월 </Text></TouchableOpacity>
                            
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
    montouch: {
        backgroundColor: '#DCB3FE', 
        height: 50,
        width: 60,
        marginTop: 20,
        margin: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    monHeader: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'WomanFlowerB',
        fontSize: 18,
    },
    monthModalView: {
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
    monthsty: {
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
      //  justifyContent: 'center',
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
    monthTextsty: {
        marginTop: 4,
        color: 'white',
        fontSize: 20,
        fontFamily: 'WomanFlowerB',
    },
    chooseMon: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'WomanFlowerB',
    },
});

export default MonthSelectPage;