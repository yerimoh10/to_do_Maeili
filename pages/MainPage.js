import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert,SafeAreaView, TextInput } from 'react-native';
import data from '../to_do_list.json';
import TdList from '../components/td_list';

export default function MainPage() {
    console.disableYellowBox = true;
  const customAlert = () => {
    Alert.alert("TouchableOpacity에도 onPress 속성이 있습니다")
  }
 const [text, onChangeText] = useState("")
 
 const onChange = (e) => {
  //onChangeText(e.target.value)
  console.log(e.target)
 }
   /*const addTextBox = () => {useState([<TextBox />])}
  const TextBox = () => (
    <TextInput 
    style={styles.input}
    onChangeText={onChangeText}
    value={text}
    placeholder='오늘의 to-do를 입력하세요'
    ></TextInput> 
  )*/
  let to_do = data.to_do;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>@@'s To-Do List</Text>
      <SafeAreaView style={styles.areaCon}>{/* 리스트 전체를 묶는 컨테이너 */}
      {
        to_do.map((content, i) => {
          return(<TdList content={content} key={i}/>

          )
        })
      }
        
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  areaCon:{
    borderWidth: 1,
    marginTop:10,
    marginLeft: 10
  },
  listview:{
    flex:1,
    flexDirection: 'row',
    margin: 10
  }, 
  btn1:{
    flex:1,
    width: 30,
    height:40,
    borderWidth:1
  },
  input: {
    flex:4,
    height: 40,
    width: 300,
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 50,
    marginLeft: 30
  }
});

