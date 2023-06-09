import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';
import alls from "../assets/all.png";
import cancel from "../assets/cancel.png";

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const AllTodos = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [all, setAll] = useState([])

    const CallingTodos = async () => {
        let uniqueID
        if(isIOS){
          let iosId = await Application.getIosIdForVendorAsync();
          uniqueID=iosId;
          
        }else if(isAndroid){
          let androID = Application.androidId;
          uniqueID = androID
        }
        console.log('uniqueID :: ', uniqueID)
       
        let time = new Date();
        let todays = "";
        let year = time.getFullYear().toString();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        todays += year+month + day;
      
        
        await firebase_db.ref('/to_do/' + uniqueID+'/').once('value').then((snapshot) => {

           const todolist = [];

        
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
         for(var i in childData){

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
             <TouchableOpacity onPress={() => {{setModalVisible(!modalVisible); CallingTodos(); }}} activeOpacity={0.7}><Image source={alls} style={styles.imageStyle} /></TouchableOpacity>
                
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
                                <TouchableOpacity activeOpacity={0.7} onPress = { () => {setModalVisible(!modalVisible)}}>
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
    fontSize: 22,
    fontFamily: 'WomanFlowerB',
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
        backgroundColor: '#f6ebff',
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
        height: '60%',
        width: '80%'
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
      fontFamily: 'WomanFlower',
    },
    textTitleSty:{
      fontSize: 15,
      flex: 2,
      textAlignVertical: 'center',
      fontFamily: 'WomanFlower',
    },
    completedTotoTitle: {
      textDecorationLine: 'line-through',
      backgroundColor: '#A76EBE'
    },
    cancelsty: {
      //justifyContent: "center",
      flex: 1,
      width: 20,
      height: 20,
      //resizeMode: "cover",
      resizeMode: "contain",
      overflow: "hidden",
    },

})
export default AllTodos;