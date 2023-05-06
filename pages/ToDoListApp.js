import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,StyleSheet, Button, Text, Modal, SafeAreaView, Pressable, Alert,TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Routine from '../components/RoutinePage';  // 루틴관리하는 자식 컴포넌트

// 메인 페이지: 여기서 투두 작성, 수정, 삭제 다 관리하는 페이지

const ToDoListApp = () => {
  const [todos, setTodos] = useState([]);  // 리스트에 새로운 todo 생성시키는 함수
  const [newTodo, setNewTodo] = useState(''); // input에 글이 입력될 때마다 변하는 값들을 저장하는 함수
  const [edited, setEdited] = useState(''); // edit 모달의 input 에서 입력되는 사항을 저장하는 함수
  const [modalVisible, setModalVisible] = useState(false);  // edit 모달을 보여주게 하는 함수
  const [editTitle, setEditTitle] = useState(''); // edit 하기 위해 원래 todo의 내용을 가져오는 함수
  const [editID, setEditID] = useState(0);  // edit할 리스트의 ID 가져오는 함수
  const [routineID, setRoutineID] = useState('');

  useEffect(() => {
    // Load saved todos from JSON file on component mount
    loadTodosFromJson();
  }, []);

  const loadTodosFromJson = async () => {   // 내장된 파일에 저장되어 있는 todo를 로딩하는 함수
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

  const saveTodosToJson = async () => {       // 생성된 투두를 내장 파일에 저장하는 함수
    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'todos.json',
        JSON.stringify({ todos })
      );
    } catch (error) {
      console.log('Error while saving todos to JSON file:', error);
    }
  };

  const handleAddTodo = () => {       // add 버튼 누르면 실행되는 함수. 
    if (newTodo.trim()) {
      const newTodoItem = {           // todo ID, todo 내용, 완료 flag 가 하나의 리스트가 됨.
        id: Date.now().toString(),
        title: newTodo,
        completed: false,
        routine: "",
        type: ""
      };
      setTodos([...todos, newTodoItem]);      // 기존 리스트에 새로운 todo를 추가시킴.
      setNewTodo('');
    }
  };
  const toggleTodoCompletion = (id) => {      // 투두 완료시 실행되는 함수
    const updatedTodos = todos.map((todo)=>
    todo.id === id ? {... todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }
  const handleEditTodo = (id, updatedTodo) => { //edit 버튼 누르면 실행되는 함수
    setEditTitle(updatedTodo);        // 누른 todo의 내용 가져오는 함수 실행
    setEditID(id);                    // 누른 todo의 id 가져오는 함수 실행
    setModalVisible(!modalVisible);    // edit 모달 보여주는 함수 실행
  };
  const realEdit = () => {      //  실제로 todo 수정이 이루어지게 하는 함수
    if (edited.trim()) {
      console.log("edited: ", edited);
      console.log("editTitle: ", editTitle);
      const updatedTodos = todos.map((todo) =>
        todo.id === editID ? { ...todo, title: edited } : todo // 3항 연산
      );
      setTodos(updatedTodos);
      setEdited('');
      //setEditTitle('');
      setModalVisible(!modalVisible);
    }
  };
  const handleDeleteTodo = (id) => {    // delete 버튼 눌렀을 떄 실행되는 함수
    //const updatedTodos = [...todos];
    //updatedTodos.splice(index, 1);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // const checkingID = (itemID) => {
  //   //setRoutineID("");
  //   console.log("넘어오는 값: ", itemID);
  //   setRoutineID(itemID);
  //   console.log("루틴 아이디: ", routineID);
  // };

  const checkingRoutine = (rvalue) => {
    if(rvalue){
      let result = rvalue.split(', ');
      console.log("main result : ", result[0], ", main result 2 : ", result[1], ", main result 3 : ", result[2]);
      let r_id
      if(result[2]){
        r_id=result[2].trim();
      }
      
      //setRoutineID(result[2]);
      //console.log("result[2]   :  ", result[2], "       루틴 아이디: ", routineID);
      //let r_num = Number(result[1]);
      let r_num = result[1]
      console.log("루틴 숫자들 : ", r_num);
      console.log("============================================", r_id);
      //console.log("todos : ", todos);
      const updatedTodos = todos.map((todo) =>
        todo.id === r_id ? { ...todo, routine: r_num, type: result[0] } : todo // 3항 연산
      );
      setTodos(updatedTodos);
      console.log("todos : ", todos);
    }
  };
  // useEffect(() => {
  //   console.log("업데이트")
  // })

  useEffect(() => { // 투두 리스트를 계속적으로 저장시켜주게 도와주는 함수
    // Save todos to JSON file whenever the todos state changes
    saveTodosToJson();
  }, [todos]);

  return (    // 실제 화면에서 보여지는 내용
    <SafeAreaView  style={styles.container}>{/* SafeAreaView는 핸드폰 노치나 상태바에 화면이 가져지지 않도록 도와주는 도구*/}
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
      <Modal visible={modalVisible} // <-- edit 모달을 위에다 미리 작성함
        animationType='slide'
        transparent={true}
        
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
         <View style={styles.modalEditView}>
          <View style={styles.modalView}>
            <TextInput
                //value={edited}//edited
                defaultValue= {editTitle}
                style={styles.editSty}
                onChangeText={setEdited}
                //onPressIn={() => console.log("edit: ", editTitle)}
            ></TextInput>
            <View style={styles.comcanBtn}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => realEdit()}
            ><Text style={styles.textStyle}>  완료  </Text></TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            ><Text style={styles.textStyle}>  취소  </Text></TouchableOpacity>
            </View>
          </View>
          </View>
      </Modal>
      </View>
      <FlatList // 작성한 todo들이 FlatList에 의해 보여지게 됨.
        style={styles.listSty}
        data={todos}
        renderItem={({ item, index }) => (
          <View >
            <View style={styles.listView}>

                <Text style={[styles.textSty, item.completed ? styles.completedTotoTitle : null]}
                onPress={() => toggleTodoCompletion(item.id)}>{item.title}</Text>
                <Text>{item.type}</Text>
              <Button
                //value={edited}
                title='EDIT'
                onPress={() => {handleEditTodo(item.id, item.title)}}
                  //() => {handleEditTodo(item.id, item.title)
                  // Show edit modal or navigate to edit screen
                //}}
              />
              <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
              <Routine  value={item.id} rvalue={item.type} rtime={item.routine} setValue={checkingRoutine} />{/* 자식컴포넌트에서 직접 그림 setResult={checkingID}*/}
                {/*{value} 사용해서 자식 컴포넌트에서 넘어오는 값 사용할 수 있음 */}
            </View>
            
          </View>
          
        )}
        
        keyExtractor={(item, index) => index.toString()}
      /> 
      {/*<Text>{value}</Text>*/}
    </SafeAreaView>
  );
};
// 스타일 입력 ↓
const styles = StyleSheet.create({  //각 이름 검색해보면 어디서 사용되는 스타일인지 알 수 있음 
  touchh:{
    borderWidth: 1,
  },
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
    flex: 1,
    height: 50,
    margin: 20,
    marginTop: 50
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
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
    flexDirection: 'row',
    margin: 2,
  },
  textSty: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  editSty: {
    borderWidth: 1,
    margin: 3,
    width: 300,
    paddingLeft: 5,
    justifyContent: 'center',
    
  },
  completedTotoTitle: {
    textDecorationLine: 'line-through',
    backgroundColor: '#8E9DA5'
  },
  comcanBtn:{ // 완료 취소 버튼
    flexDirection: 'row',
    flex: 1
  }
})
export default ToDoListApp;