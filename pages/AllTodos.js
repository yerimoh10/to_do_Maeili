import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';
import {Dimensions} from 'react-native';
import alls from "../assets/all.png";
import cancel from "../assets/cancel.png";

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const AllTodos = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [all, setAll] = useState([])

    const CallingTodos = async () => {
        let uniqueID
        if(isAndroid){
          let androID = await Application.androidId;
          //console.log("Here is Android : ", androID)
          uniqueID = androID
        }else{
          uniqueID = Application.getIosIdForVendorAsync();
        }
        //console.log('uniqueID :: ', uniqueID)
        let time = new Date();
        let todays = "";
        let year = time.getFullYear().toString();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        todays += year+month + day;
      
        
        await firebase_db.ref('/to_do/' + uniqueID+'/').once('value').then((snapshot) => {
          //let contents = snapshot.val();
           const todolist = [];
        //   //setWholeTo_do([]);
        //   console.log("=================================")
        //   setDic(snapshot.val())
        //  // console.log(dic)
        //   for (var i in snapshot.val()) {
        //     //console.log("snapshot::: :: ", snapshot.val()[i])
        //     snapshot.val()[i].map((toDo) => {
        //       todolist.push(toDo)
        //     })
        //    }
        // setWholeTo_do(todolist);
        
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
         for(var i in childData){
          //console.log("ChildDate -> ", childData[i].title);
          const newItem = {
              "key" : childKey, 
              "titles" : childData[i].title,
              "completed" : childData[i].completed
          };
          todolist.push(newItem);
         }
         setAll(todolist);
          
        });
         console.log("This is all --------------->", all)

        })
    };
    const renderItem = ({item}) => {
      return (
      <View >
        <View style={styles.listView}>
          
              <Text style={styles.textSty}>{item.key}</Text>
            <Text style={[styles.textTitleSty, item.completed ? styles.completedTotoTitle : null]}>{item.titles}</Text>
            
          </View>
      
      </View>)
      
    }


    return (
        <View>
             <TouchableOpacity onPress={() => {{setModalVisible(!modalVisible); CallingTodos(); }}}><Image source={alls} style={styles.imageStyle} /></TouchableOpacity>
                
                <Modal visible={modalVisible}
                        animationType='none'
                        transparent={true}     
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            
                        <View style={styles.modalAllTodayView}>
                            <View style={styles.modalView}>
                              <View style={styles.Header}>
                                <Text style={styles.title}>  작성한 TO DO 모아보기 </Text>
                                <TouchableOpacity onPress = { () => {setModalVisible(!modalVisible)}}>
                                  <Image source={cancel} style={styles.cancelsty}/>
                                </TouchableOpacity>
                              </View>
                             
                            <FlatList // 작성한 todo들이 FlatList에 의해 보여지게 됨.
                              style={styles.listSty}
                              data={all}    
                              renderItem={renderItem}
                          keyExtractor={(item, index) => index.toString()}
                        /> 
                              </View>
                        </View>
                   
                </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontSize: 30,
  },
    imageStyle: {
        //marginLeft: 50,
        //flex:1,
        //borderWidth: 1,
        justifyContent: "center",
        
        width: 40,
        height: 40,
        resizeMode: "cover",
        //overflow: "hidden",
    },
    Header: {
      flexDirection: 'row',
      //flexWrap: 'wrap',
    },
    modalAllTodayView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView : {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 480,
        width: 350
    },
    listSty: {
      paddingBottom: 20,
      marginTop: 20,
    }, 
    listView: {
      flexDirection: 'row',
      margin: 2,
      width: 270,
      height: 30,
      //borderWidth:1,
      flex: 1,
      padding: 2,
    },
    textSty: {
      flex: 1,
      fontSize: 20,
      justifyContent: 'center',
      textAlignVertical: 'center',
      padding: 2,
    },
    textTitleSty:{
      fontSize: 15,
      flex: 2,
      textAlignVertical: 'center',
    },
    completedTotoTitle: {
      textDecorationLine: 'line-through',
      backgroundColor: '#8E9DA5'
    },
    cancelsty: {
      justifyContent: "center",
      // flex: 'flex-end',
      width: 20,
      height: 20,
      resizeMode: "cover",
    },

})
export default AllTodos;