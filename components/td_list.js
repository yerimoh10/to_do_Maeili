import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';

export default function td_list({content}){
    const customAlert = () => {
        Alert.alert("TouchableOpacity에도 onPress 속성이 있습니다")
      }
     const [text, onChangeText] = useState("")

     return(
        <View style={styles.listview}>
              <TouchableOpacity style={styles.btn1} onPress={customAlert}><Text>new</Text></TouchableOpacity>  
            <TextInput
              style={styles.input}
              value={content.list_content}>
              </TextInput>
              <TouchableOpacity style={styles.rout_btn} onPress={customAlert}><Text>routine</Text></TouchableOpacity>  
        </View>
  
    )
}


const styles = StyleSheet.create({
    listview:{
      flex:1,
      flexDirection: 'row',
      margin: 10
    }, 
    btn1:{
      flex:1,
      width: 30,
      height:40,
      borderWidth:1,
      marginRight: 10
    },
    input: {
      flex:4,
      height: 40,
      width: 300,
      borderWidth: 1
    },
    rout_btn: {
        borderWidth: 1,
        borderRadius:20,
        marginLeft: 10,
        justifyContent: 'center',
        textAlign: 'center'
    }
  });