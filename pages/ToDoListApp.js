import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,StyleSheet, Button, Text, SafeAreaView, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

//import { ScrollView } from 'react-native-web';

const ToDoListApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Load saved todos from JSON file on component mount
    loadTodosFromJson();
  }, []);

  const loadTodosFromJson = async () => {
    try {
      const result = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + 'todos.json'
      );
      const todosData = JSON.parse(result);
      setTodos(todosData.todos || []);
    } catch (error) {
      console.log('Error while reading todos from JSON file: here', error);
    }
  };

  const saveTodosToJson = async () => {
    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'todos.json',
        JSON.stringify({ todos })
      );
    } catch (error) {
      console.log('Error while saving todos to JSON file:', error);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleEditTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    // Save todos to JSON file whenever the todos state changes
    saveTodosToJson();
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addView}>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter a to-do item"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button style={styles.addBtn} title="  👈  " onPress={handleAddTodo} />
      </View>
      
      <FlatList style={styles.listSty}
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.listView}>
            <Text style={styles.textSty}>{item}</Text>
            <Button
              title="Edit"
              onPress={() => {
                // Show edit modal or navigate to edit screen
              }}
            />
            <Button title="Delete" onPress={() => handleDeleteTodo(index)} />
            <Button title=" 루틴 " onPress={() => handleDeleteTodo(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginBottom: 40,
        paddingBottom: 20
    },
    // scrollSty: {
    //   marginBottom: 20
    // },
    addView:{
      flexDirection: 'row',
      marginTop: 50,
      marginBottom: 20
    },
    inputBox: {
      flex: 2,
      borderWidth:1
    },
    addBtn: {
      flex: 1,
      fontWeight: 700,
      padding: 60
    },
    listSty: {
      paddingBottom: 20,
      marginBottom: 40
    }, 
    listView: {
      flexDirection: 'row'
    },
    textSty: {
      flex: 1
    }
})
export default ToDoListApp;