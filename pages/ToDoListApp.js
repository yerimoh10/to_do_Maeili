import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,StyleSheet, Button, Text, Modal, SafeAreaView, Pressable, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-web';

const ToDoListApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [edited, setEdited] = useState('');
  // const [modalInfo, setModalInfo] = React.useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  
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

  // const renderItem = ({item}) => (
  //   <TouchableOpacity onPress = {() => setModalInfo(item.title)}>
  //     <Text>{item.title}</Text>
  //   </TouchableOpacity>
  // );


  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now().toString(),
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };
  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map((todo)=>
    todo.id === id ? {... todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }
  const handleEditTodo = (id, updatedTodo) => {
    // const updatedTodos = [...todos];
    // updatedTodos[index] = updatedTodo;
    //editTitle = updatedTodo;
    console.log("tiottlelel: ", updatedTodo)
    setModalVisible(true);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: edited } : todo // 3항 연산
    );
    setTodos(updatedTodos);
    setEdited('');
  };

  const handleDeleteTodo = (id) => {
    //const updatedTodos = [...todos];
    //updatedTodos.splice(index, 1);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    // Save todos to JSON file whenever the todos state changes
    saveTodosToJson();
  }, [todos]);

  return (
    <SafeAreaView  style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <View style={styles.addView}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter a to-do item"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button style={styles.addBtn} title="  👈  " onPress={handleAddTodo} />
      </View>
      <View>
      <Modal visible={modalVisible}
        animationType='slide'
        transparent={true}
        
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
         <View style={styles.modalEditView}>
          <View style={styles.modalView}>
            <TextInput
                value={edited}
                style={styles.editSty}
                onChangeText={setEdited}
            ></TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            ><Text style={styles.textStyle}>Hide Modal</Text></Pressable>
          </View>
          </View>
      </Modal>
      </View>
      <FlatList
        style={styles.listSty}
        data={todos}
        renderItem={({ item, index }) => (
          <View >
            <View style={styles.listView}>
              <Text style={styles.textSty}>{item.title}</Text>
              <Button
                title="Edit"
                onPress={() => {handleEditTodo(item.id, item.title)}}
                  //() => {handleEditTodo(item.id, item.title)
                  // Show edit modal or navigate to edit screen
                //}}
              />
              <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
              <Button title=" 루틴 " />
            </View>
            
          </View>
          
        )}
        
        keyExtractor={(item, index) => index.toString()}
      /> 
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginBottom: 40,
    paddingBottom: 20
  },
  heading:{
    fontSize: 50,
    marginTop: 20
  },
  modalEditView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView : {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
    height: 200,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // scrollSty: {
  //   marginBottom: 20
  // },
  addView:{
    flexDirection: 'row',
    marginTop: 30,
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
  },
  editSty: {
    borderWidth: 1,
    margin: 3,
    width: 300,
    paddingLeft: 5,
    justifyContent: 'center',
    
  }
})
export default ToDoListApp;