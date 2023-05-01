import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';

const TimeSelectPage = (props) => {
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [timeValue, setTimeValue] = useState('');

    function sendData(){
        props.setValue(timeValue);
    };
    const time = (value) => {
        switch(value){
            case '1':
                return setTimeValue('1')
            case '2':
                return setTimeValue('2')
            case '3':
                return setTimeValue('3')
            case '4':
                return setTimeValue('4')
            case '5':
                return setTimeValue('5')
            case '6':
                return setTimeValue('6')
            case '7':
                return setTimeValue('7')
            case '8':
                return setTimeValue('8')
            case '9':
                return setTimeValue('9')
            case '10':
                return setTimeValue('10')
            case '11':
                return setTimeValue('11')
            case '12':
                return setTimeValue('12')
            case '13':
                return setTimeValue('13')
            case '14':
                return setTimeValue('14')
            case '15':
                return setTimeValue('15')
            case '16':
                return setTimeValue('16')
            case '17':
                return setTimeValue('17')
            case '18':
                return setTimeValue('18')
            case '19':
                return setTimeValue('19')
            case '20':
                return setTimeValue('20')
            case '21':
                return setTimeValue('21')
            case '22':
                return setTimeValue('22')
            case '23':
                return setTimeValue('23')
            case '24':
                return setTimeValue('24')
        }
    }

    const complete = () => {
        console.log("시간은 : ", timeValue);
        sendData();
        setTimeModalVisible(!timeModalVisible);
    }

    return (
        <View>
            <TouchableOpacity style={styles.timetouch} onPress={() => setTimeModalVisible(!timeModalVisible)}>
                <Text style={styles.timeHeader}> Time </Text>
            </TouchableOpacity>
            
            <Modal
                animationType='none'
                visible={timeModalVisible} // 변수로 변경
                transparent={true}>
                <View style={styles.timeModalView}>
                    <View style={styles.scrollSty}>
                        <ScrollView>
                            <TouchableOpacity style={[styles.timesty, timeValue == '1'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('1')}>
                                <Text> 1 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '2'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('2')}>
                                <Text> 2 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '3'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('3')}>
                                <Text> 3 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '4'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('4')}>
                                <Text> 4 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '5'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('5')}>
                                <Text> 5 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '6'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('6')}>
                                <Text> 6 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '7'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('7')}>
                                <Text> 7 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '8'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('8')}>
                                <Text> 8 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '9'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('9')}>
                                <Text> 9 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '10'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('10')}>
                                <Text> 10 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '11'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('11')}>
                                <Text> 11 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '12'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('12')}>
                                <Text> 12 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '13'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('13')}>
                                <Text> 13 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '14'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('14')}>
                                <Text> 14 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '15'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('15')}>
                                <Text> 15 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '16'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('16')}>
                                <Text> 16 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '17'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('17')}>
                                <Text> 17 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '18'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('18')}>
                                <Text> 18 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '19'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('19')}>
                                <Text> 19 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '20'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('20')}>
                                <Text> 20 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '21'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('21')}>
                                <Text> 21 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '22'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('22')}>
                                <Text> 22 </Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.timesty, timeValue == '23'? styles.completedTotoTitle : !styles.completedTotoTitle]} onPress={() => time('23')}>
                                <Text> 23 </Text></TouchableOpacity>
                            
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => complete()}>
                                <Text style={styles.textClose}> 닫기 </Text></TouchableOpacity>
                        </ScrollView>
                    </View>
                    
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    timeModalView: {
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
        height: 200,
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
    timesty: {
        borderWidth: 1,
        width: 100,
        height: 30,
        alignItems: 'center',

    },
    buttonClose: {
        backgroundColor: '#2196F3', 
        height: 40,
        margin: 40,
        marginTop: 20,
        
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
    timeHeader: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
    },
    timetouch: {
        backgroundColor: '#2196F3', 
        height: 40,
        width: 60,
        marginTop: 20,
        margin: 10,
    }
});

export default TimeSelectPage;