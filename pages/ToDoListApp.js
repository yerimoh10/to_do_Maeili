import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,StyleSheet, Button, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

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
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a to-do item"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item}</Text>
            <Button
              title="Edit"
              onPress={() => {
                // Show edit modal or navigate to edit screen
              }}
            />
            <Button title="Delete" onPress={() => handleDeleteTodo(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        margin: 40
    }
})
export default ToDoListApp;