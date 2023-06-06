import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

// 로딩 -> 스플래시 화면 넣을 곳.

export default function Loading(){
    return(<View style={styles.container}><Text style={styles.title}>준비중입니다...</Text></View>)
}


const styles = StyleSheet.create({
    container: {
        //앱의 배경 색
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fbfbff',
    },
    title: {
        fontSize:20,
        fontWeight:'600',
        fontFamily: 'WomanFlower',
    }

}) 