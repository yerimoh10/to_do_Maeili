import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, FlatList, StatusBar} from 'react-native';
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';


const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export default function Memoirs() {
  const [writeMode, setWriteMode] = useState(false);
  const [txt,setTxt] = useState(""); //입력하는 memoir은 text에 저장됨
  const [memoirs, setMemoirs] = useState([]);
  const [firstSave, setFirstSave] = useState(false);

  const originmemoir = [];
  useEffect(()=> {
    loadMemoir();
    setFirstSave(true);
  },[])
  
  useEffect(() => {
    if(firstSave){
      saveMemoir()
    }
  }, [memoirs] );

  // const [memoirs, setMemoirs] = useState(originmemoir); //setMemoirs에 값을 넣으면 memoirs에 들어감
  const [idx, setIdx] = useState(1); 

  const addMemoir = () =>{

     let num = {memoir:txt};
     //await setMemoirs(prev => [...prev,num]); //originMemoir을 배열로 만들었으므로 배열로 감싸줌
     setMemoirs([...memoirs, num]);
     
     setWriteMode(false); //화면 닫음
     setIdx(prev=>prev+1);
     saveMemoir();
  }
  const saveMemoir = async() => {
    //firebase에 추가 
     // memos 밑에 사용자 밑에 쭉 기록하는 방식으로 저장함
    let uniqueID
    if(isIOS){
      let iosId = await Application.getIosIdForVendorAsync();
      uniqueID=iosId;
    }else if(isAndroid){
      let androID = Application.androidId;
      uniqueID = androID;
    }
   await firebase_db.ref('/memos/' + uniqueID).set(memoirs, function(error){
    if(null){
      console.log("This is error", error)
    }  
   });
   console.log("Thjis is ", memoirs)
  }

  const loadMemoir = async() => {
     //firebase에 추가 
     // 사용자  밑에 memos 밑에 쭉 기록하는 방식으로 저장함
     let uniqueID
     if(isIOS){
      let iosId = await Application.getIosIdForVendorAsync();
      uniqueID=iosId;
    }else if(isAndroid){
      let androID = Application.androidId;
      uniqueID = androID;
    }
    await firebase_db.ref('/memos/' + uniqueID).once('value').then((snapshot) => {
      let mms = snapshot.val();
      console.log("mmms---------> ", mms);
      if(mms){
        setMemoirs(mms)
      }else{
        //setTodos(tdList)
        console.log("엘스ㅡㅡ")
      }

    })
  }

  const renderMemoir = ({item}) => {
    return(
      <View style={styles.memoirsList}>
        <Text style={styles.memoirList}>{item.memoir}</Text>
      </View>
    )
  }


  const quotes = [
    'I never dreamed about success, I worked for it',
    'Do not try to be original, just try to be good.',
    'Do not be afraid to give up the good to go for the great',
    'If you cannot fly then run. If you cannot run, then walk. And if you cannot walk, then crawl, but whatever you do, you have to keep moving forward.',
    'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.',
    'The fastest way to change yourself is to hang out with people who are already the way you want to be',
    'Money is like gasoline during a road trip. You do not want to run out of gas on your trip, but you are not doing a tour of gas stations',
    'Some people dream of success, while other people get up every morning and make it happen',
    'The only thing worse than starting something and falling.. is not starting something',
    'If you really want to do something, you will find a way. If you do not, you will find an excuse.',
  ];


  const [quote, setquote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  

  
  if(writeMode){ 
    return (
      <View style={styles.firSafeAreaView}>
        <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
        <View style={styles.firContainer}>

          <View style={styles.btnWork}>
            <TouchableOpacity style={styles.btnClick} onPress={()=>setWriteMode(false)} activeOpacity={0.7}>
              <Text style={styles.btnText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnClick} onPress={()=>addMemoir()} activeOpacity={0.7}>
              <Text style={styles.btnText}>저장</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputArea}>
            <TextInput style={styles.TextInput} onChangeText={text => setTxt(text)} multiline  />
          </View>

          <View >
             <Text style={styles.quoteView}>{quote}</Text>
          </View>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.secSafeAreaView}>
      <View style={styles.header}>
        <Text style={styles.memoTitle}>회고록</Text>
      </View>

      <View style={styles.memoArea}>

        <View style={styles.addBtn}>
          <View style={styles.addBtnStyle}>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setWriteMode(true)}>
              <Text style={styles.font}>Write</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.writeText}>
          <FlatList data={memoirs} renderItem={renderMemoir} style={styles.flatList} />
        </View>

      </View>
        <View style={styles.qView}>
          <Text style={styles.quoteView}>{quote}</Text>{/* 첫 화면이 좀 심심해서 넣었습니당.. */}
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
 firContainer: {
  flex:1,
  backgroundColor: "#fbfbff",
 },
 firSafeAreaView:{
  flex:1,
  backgroundColor: "#fbfbff",
  padding: 15,
 },
 secSafeAreaView:{
  flex:1,
  backgroundColor: "#fbfbff",
 },
 header:{
  marginVertical: 10,
  borderBottomColor: "rgba(0,0,0,0.3)",
  borderBottomWidth: 1,
  //marginTop: 10,
 },
 memoTitle:{
  fontSize: 40,
  fontWeight: 600,
  padding: 20,
  textAlign: "left",
  marginTop: 10,
  fontFamily: 'WomanFlower',
 },
 memoArea:{
  flex:1, 
  backgroundColor:"#fbfbff",
  margin: 10,
 },
 btnWork:{
  flexDirection: "row",
  justifyContent:"space-between",
  //margin: 10,
  padding: 15,
 },
 addBtn: {
  position: "absolute",
  right:50,
  bottom:70,
  zIndex:10
 },
 addBtnStyle: {
  width: 70, 
  height:70,
  backgroundColor: "#DCB3FE",
  borderRadius:35,
  justifyContent:"center",
  alignItems:"center",
 },
 inputArea: {
  flex:1,
  backgroundColor:"#fbfbff",
  margin: 10
 },
 btnClick: {
  padding: 15,
 },
 btnText: {
  fontSize: 20
 },
 flatList: {
  flex:1,
 },
 memoirsList: {
  flexDirection: "row",
  padding:10,
  // borderBottomColor: "rgba(0,0,0.5)",
  // borderBottomWidth: 1,
 },
 memoirList: {
  marginRight:10,
  fontFamily: 'WomanFlower',
  fontSize: 17,
 },
 TextInput:{
  flex: 0.9,
  borderRadius: 13,
  backgroundColor: "#eee",
  padding: 15,
 },
 writeText: {
  flex:1,
  textAlign: "center",
 },
 qView: {
  justifyContent: "center",
 },
 quoteView: { 
  textAlign: "center",
  padding: 10,
  marginBottom: 10,
  margin: 5,
  backgroundColor: '#f6ebff',
  fontFamily: 'WomanFlower',
  fontWeight: 600,
  fontSize: 20,
 },
 font: {
  fontFamily: 'WomanFlower',
  fontSize: 25,
 }

});
