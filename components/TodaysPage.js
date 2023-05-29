import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, SafeAreaView,TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AllTodos from '../pages/AllTodos';
// 위에 날짜 선택을 위한 컴포넌트 

const TodaysPage = (props) => {
    const [ddd, setDDD] = useState("");
    const [first, setFirst] = useState(true);
    let time = new Date();
    let todays = "";
    let year = time.getFullYear().toString();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    todays += year+month;
    //setDDD(day)
    const sendData = (today) => {
        setFirst(false);
        let todays = "";
        // 선택한 날짜 보내주기
        setDDD(today)
        todays = year+month + today
        props.chooseDays(todays);
        //console.log("todays -----------> ", todays)
    }
    useEffect(() => {
       if(first){
//        let day = time.getDate();
        setDDD(day)
       }
    },[])

    return (
        <View style={styles.daystouch}>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day-4)}><Text style={[styles.dayText2, ddd == (day-4) ?styles.todayText:null]}>{day-4}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day-3)}><Text style={[styles.dayText2, ddd == (day-3)?styles.todayText:null]}>{day-3}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day-2)}><Text style={[styles.dayText2, ddd == (day-2)?styles.todayText:null]}>{day-2}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day-1)}><Text style={[styles.dayText2, ddd == (day-1)?styles.todayText:null]}>{day-1}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day)}><Text style={[styles.dayText2, ddd == day?styles.todayText:null]}>{day}</Text></TouchableOpacity>
            <AllTodos />
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
    imageStyle: {
        //marginLeft: 50,
        flex:1,
        //borderWidth: 1,
        justifyContent: "center",
        
        width: 30,
        height: 20,
        resizeMode: "contain",
        overflow: "hidden",
    },

});
export default TodaysPage;