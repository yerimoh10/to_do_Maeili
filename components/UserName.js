import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import banner from "../assets/banner.jpg"
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';


const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export default function UserName() {
  const [name, setName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [showInput, setShowInput] = useState(true); // 처음 상태는 true
  const [uniqueID, setUniqueID] = useState('');
  const [pressed, setPressed] = useState(false);

   useEffect(() => {
    unique();

   }, [])

  useEffect( ()=> {
    if(uniqueID){
       loadUserName();
    }
    
  },[uniqueID])
      
  
  
  const unique = async () => {

    if(isIOS){
      let iosId = await Application.getIosIdForVendorAsync();
      setUniqueID(iosId)
      //console.log("Here is Android : ", iosId)
    }else if(isAndroid){
      let androID = Application.androidId;
      setUniqueID(androID);
      console.log("Here is Android : ", androID)
    }
  }

  const handleSave = async () => {
    try {
      if (name.trim()) {
        await saveUsername(name);
        const updatedUsernames = [name];
        setUsernames(updatedUsernames);
        //setName('');
        setShowInput(false);

        console.log("tthhdd", name)
        firebase_db.ref('/username/'+ uniqueID).set(name, function(error){
          if(null){
            console.log("This is error", error)
          }        
        });


      } else {
        setShowInput(!showInput);
        setUsernames([]);
        setName('');
        setPressed(false);
        console.log("저장누름")
        firebase_db.ref('/username/'+ uniqueID).remove();

      }
    } catch (error) {
      console.error('Failed to save username:', error);
    }
  };

  const handleNamePress = () => {
    setPressed(true);
    setShowInput(true);
    setUsernames([]); 
  };

  const saveUsername = async (username) => {
    
   
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Name saved:', username);
        resolve();
        // reject(new Error('Failed to save username'));
      });
    });
  };

  const loadUserName = async() => {
    await firebase_db.ref('/username/'+ uniqueID).once('value', (snapshot) => {
      var value = snapshot.val()
      //console.log("UniQUEID: ", uniqueID)
      if(value){
        console.log("This is", value)
        if(pressed == false){
            setName(value);
            const updatedUsernames = [value];
            setUsernames(updatedUsernames);
            setShowInput(false);
          }
        } else{
          // setShowInput(true);
          // setName('')
          console.log("엘스ㅡㅡ")
        }
      // let td = snapshot.val();
      // if(td){
      //   if(showInput){
      //     setShowInput(false);
      //     setName(td);
      //     const updatedUsernames = [td];
      //     setUsernames(updatedUsernames);
      //     console.log("[td]")
      //      console.log("loading user name: ", td);
      //   }
      //   //console.log("있음", td)
      //}
     
  });
  };

  return (
    <View style={styles.container}>
      {showInput ? (
        <View style={styles.userInput}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleNamePress}>
          <Text style={styles.savedName}>{usernames.length > 0 ? usernames[0] +'\'s' : '     '}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    //paddingTop: 20,
    //borderWidth: 1,
    height: 50,
  },
  userInput: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
    fontFamily: 'WomanFlower',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  savedName: {
    fontSize: 33,
    fontFamily: 'WomanFlower',
  },
  bannerSty: {

  }
});


// useState 훅을 사용하여 상태 변수를 초기화합니다. name은 사용자가 입력한 이름을, usernames는 입력한 이름들을 저장하는 배열을 나타냅니다. showInput은 입력 필드를 표시할지 여부를 결정하는 데 사용됩니다.

// handleSave 함수는 사용자가 이름을 저장하거나 수정할 때 호출됩니다. name.trim()을 사용하여 입력한 이름의 앞뒤 공백을 제거하고, 공백이 아닌지를 확인합니다. 공백이 아닐 경우 saveUsername 함수를 호출하여 이름을 저장하고, usernames 배열을 업데이트합니다. 그리고 입력 필드를 숨기기 위해 setShowInput(false)를 호출합니다. 공백일 경우 setShowInput(!showInput)을 호출하여 입력 필드를 표시하고, usernames 배열을 초기화합니다.

// handleNamePress 함수는 사용자가 저장된 이름을 터치할 때 호출됩니다. 입력 필드를 다시 표시하기 위해 setShowInput(true)을 호출하고, usernames 배열을 초기화합니다.

// saveUsername 함수는 비동기적으로 이름을 저장하는 가상의 비동기 작업을 수행합니다. 현재는 타이머를 사용하여 0초 후에 작업이 완료된 것으로 가정하고, 이름을 콘솔에 출력합니다. 이 부분은 실제로 데이터베이스에 저장되는 작업 등으로 대체될 수 있습니다.

// 컴포넌트의 렌더링 부분에서 showInput 상태 변수를 기반으로 입력 필드를 표시하거나 저장된 이름을 표시합니다. showInput이 true인 경우 TextInput 및 TouchableOpacity가 표시되고, false인 경우 저장된 이름이 표시됩니다.

// 스타일 시트(StyleSheet.create())를 사용하여 컴포넌트의 스타일을 정의합니다. 각 스타일은 컨테이너, 입력 필드, 버튼, 저장된 이름에 대한 스타일을 지정합니다.

// trim()은 문자열의 앞뒤에 있는 공백을 제거하는 JavaScript 메서드입니다. 이름 입력 필드에서 사용자가 입력한 이름의 앞뒤 공백을 제거하여 빈 칸으로만 입력된 경우를 확인하는 데 사용됩니다. 예를 들어, 사용자가 " John "과 같이 입력한 경우 trim()을 사용하면 "John"이 남게 됩니다.