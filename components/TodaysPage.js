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

    let dateNow = new Date();

    dateNow.setHours(dateNow.getHours() - 24);
    let year_1 = dateNow.getFullYear(); 
    let day_1 = dateNow.getDate(); 
    let month_1 = dateNow.getMonth() + 1;
    dateNow.setHours(dateNow.getHours() - 24);
    let year_2 = dateNow.getFullYear(); 
    let day_2 = dateNow.getDate(); 
    let month_2 = dateNow.getMonth() + 1;
    dateNow.setHours(dateNow.getHours() - 24);
    let year_3 = dateNow.getFullYear(); 
    let day_3 = dateNow.getDate(); 
    let month_3 = dateNow.getMonth() + 1;
    dateNow.setHours(dateNow.getHours() - 24);
    let year_4 = dateNow.getFullYear(); 
    let day_4 = dateNow.getDate(); 
    let month_4 = dateNow.getMonth() + 1;

    const sendData = (today, month, year) => {
        setFirst(false);
        let todays = "";
        // 선택한 날짜 보내주기
        setDDD(today)
        todays = year.toString()+ month + today
        props.chooseDays(todays);
        console.log("todays -----------> ", todays)
    }
    useEffect(() => {
       if(first){
        setDDD(day)
       }
    },[])
    


    return (
        <View style={styles.todayy}>
            <View style={{height: 1, backgroundColor: 'lightgray'}} />
        <View style={styles.daystouch}>
            
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day_4, month_4, year_4)}><Text style={[styles.dayText2, ddd == (day_4) ?styles.todayText:null]}>{day_4}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day_3, month_3, year_3)}><Text style={[styles.dayText2, ddd == (day_3)?styles.todayText:null]}>{day_3}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day_2, month_2, year_2)}><Text style={[styles.dayText2, ddd == (day_2)?styles.todayText:null]}>{day_2}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day_1, month_1, year_1)}><Text style={[styles.dayText2, ddd == (day_1)?styles.todayText:null]}>{day_1}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.daystext} onPress={()=>sendData(day, month, year)}><Text style={[styles.dayText2, ddd == day?styles.todayText:null]}>{day}</Text></TouchableOpacity>
            <AllTodos />
        </View>
        <View style={{height: 1, backgroundColor: 'lightgray'}} />
        </View>
    );
}
const styles = StyleSheet.create({
    todayy:{
        marginTop: 30,
    },
    daystouch: {
        flexDirection: 'row',
        margin: 5,
     
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
        color: 'pink', 
        
    },
    imageStyle: {
        flex:1,
        justifyContent: "center",
        width: 30,
        height: 20,
        resizeMode: "contain",
        overflow: "hidden",
    },

});
export default TodaysPage;