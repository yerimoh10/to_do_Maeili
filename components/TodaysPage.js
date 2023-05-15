import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, SafeAreaView,TouchableOpacity } from 'react-native';

// 위에 날짜 선택을 위한 컴포넌트 

const TestDays = () => {

    let time = new Date();
    let todays = "";
    let year = time.getFullYear().toString();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    todays += year+month + day + hours + mins + secs;
    return (
        <View style={styles.daystouch}>
            <TouchableOpacity style={styles.daystext}><Text style={styles.dayText2}>{day-2}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext}><Text style={styles.dayText2}>{day-1}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext}><Text style={[styles.dayText2, styles.todayText]}>{day}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext}><Text style={styles.dayText2}>{day+1}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext}><Text style={styles.dayText2}>{day+2}</Text></TouchableOpacity>
            
        </View>
    );
}
const styles = StyleSheet.create({
    daystouch: {
        flexDirection: 'row',
        margin: 5
    },
    daystext: {
        margin: 5,
        flex: 1,
    },
    dayText2: {
        fontSize: 25,
    },
    todayText:{
        fontWeight: 700,
        color: 'pink', // 나중에 변경
    },

});
export default TestDays;