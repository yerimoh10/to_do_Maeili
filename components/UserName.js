import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import banner from "../assets/banner.jpg"

export default function UserName() {
  const [name, setName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [showInput, setShowInput] = useState(true);

  const handleSave = async () => {
    try {
      await saveUsername(name);
      const updatedUsernames = [...usernames, name];
      setUsernames(updatedUsernames);
      setShowInput(false);
    } catch (error) {
      console.error('Failed to save username:', error);
    }
  };

  const saveUsername = async (username) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Name saved:', username);
        resolve();
        // reject(new Error('username 저장 실패'));
      });
    });
  };

  return (
    <View style={styles.container}>
      {showInput && (
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
      )}
      {usernames.length > 0 && (
        <>
          {usernames.map((username) => (
            <Text style={styles.savedName} key={username}>
              {username} {name ? "'s" : ""}
            </Text>
          ))}
          {/* <Image source={banner} style={styles.bannerSty}></Image> */}
        </>
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
