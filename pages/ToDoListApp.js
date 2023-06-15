import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,StyleSheet, Button, Text, Modal, SafeAreaView, Image, Alert,TouchableOpacity, Platform, StatusBar, } from 'react-native';
import Routine from '../components/RoutinePage';  // 루틴관리하는 자식 컴포넌트
import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';
import Loading from '../components/Loading';
import Today from '../components/TodaysPage';
import Weather from './Weather';
import {Dimensions} from 'react-native';
import User from '../components/UserName';


const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

// 메인 페이지: 여기서 투두 작성, 수정, 삭제 다 관리하는 페이지
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ToDoListApp = ({navigation, route}) => {
  console.disableYellowBox = true;
  const [todos, setTodos] = useState([]);  // 리스트에 새로운 todo 생성시키는 함수
  const [newTodo, setNewTodo] = useState(''); // input에 글이 입력될 때마다 변하는 값들을 저장하는 함수
  const [edited, setEdited] = useState(''); // edit 모달의 input 에서 입력되는 사항을 저장하는 함수
  const [modalVisible, setModalVisible] = useState(false);  // edit 모달을 보여주게 하는 함수
  const [editTitle, setEditTitle] = useState(''); // edit 하기 위해 원래 todo의 내용을 가져오는 함수
  const [editID, setEditID] = useState(0);  // edit할 리스트의 ID 가져오는 함수
  const [todayDate, setTodayDate] = useState('')
  const [ready, setReady] = useState(true);
  const [firstSave, setFirstSave] = useState(false);
  const [wholeTo_do, setWholeTo_do] = useState([]);


  var timer_id=-1;
 function checkRoutine() // 투두의 루틴 설정 기능 (반복 기능 함수)
 {
    //console.log('check Routine!');
    todos.map((todo) => {
      //console.log(todo.type) // 투두의 타입 가져오기
      //console.log(Number(todo.id))
    
      if (todo.type){
        if (todo.type == 'Time') {
          let routine = Number(todo.routine);
          
          let createTime = new Date(Number(todo.id))
          let org_sec = Math.floor((createTime.getTime()) / 1000); 
          console.log(todo.title, "org sec : ", org_sec);

          const date = new Date();
          const diff = Math.floor((date.getTime()) / 1000);
          console.log(todo.title, "cur sec : ", diff);
          const diff_sec = diff - org_sec;
          const calcu_min = Math.floor(diff_sec %(routine*60)); // 60-> 분, / 3600 -> 시간으로

          if (calcu_min == 0 && todo.completed) {
            //db 저장
            // active
            console.log("commmmmmmmm  : ", todo.completed)
            todo.completed = false

            console.log("changeeeeeee  : ", todo.completed)
            saveTodosToJson(todayDate);
            loadTodosFromJson(todayDate);
          }
          const minee = (diff/60)
          console.log("분으로 : ", calcu_min);
        } 
        if (todo.type == 'Day') {
          let routine = Number(todo.routine);

          const date = new Date();

          if (date.getHours()==0 && date.getMinutes()==0 && date.getSeconds() == 0 &&  
              routine == date.getDay() && todo.completed) { // 요일 
            //db 저장
            // active
            console.log("commmmmmmmm  : ", todo.completed)
            todo.completed = false 
            
            console.log("changeeeeeee  : ", todo.completed)
            saveTodosToJson(todayDate);
            loadTodosFromJson(todayDate); 
          }
        }
        if (todo.type == 'Week') {
          let routine = Number(todo.routine);
          
          let createTime = new Date(Number(todo.id))
          const org_time = new Date(createTime.getFullYear(),createTime.getMonth()+1,createTime.getDate(),0,0,0)
          let org_sec = Math.floor((org_time.getTime()) / 1000); 
          console.log(todo.title, "org sec : ", org_sec);

          const date = new Date();
          const diff = Math.floor((date.getTime()) / 1000);
          console.log(todo.title, "cur sec : ", diff);
          const diff_sec = diff - org_sec;
          const calcu_min = Math.floor(diff_sec %(routine*3600*24*7)); // Week 계산

          if (calcu_min == 0 && todo.completed) {
            //db 저장
            // active
            console.log("commmmmmmmm  : ", todo.completed)
              todo.completed = false
            console.log("changeeeeeee  : ", todo.completed)
            saveTodosToJson(todayDate);
            loadTodosFromJson(todayDate); 
          }

          console.log("주으로 : ", calcu_min);
        } 
        if (todo.type == 'Month') {
          let routine = Number(todo.routine);
          
          let createTime = new Date(Number(todo.id))

          const org_time = new Date(createTime.getFullYear(),createTime.getMonth()+1,createTime.getDate(),0,0,0)
          let org_sec = Math.floor((org_time.getTime()) / 1000); 
          console.log(todo.title, "org sec : ", org_sec);

          const date = new Date();

          if (createTime.getFullYear() == date.getFullYear() && createTime.getDate() == date.getDate() ){
            let cMonth = createTime.getMonth() + 1
            if((cMonth % 12) == date.getMonth() ){
              if(date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0 && todo.completed){
                todo.completed = false
                console.log("changeeeeeee  : ", todo.completed)
                saveTodosToJson(todayDate);
                loadTodosFromJson(todayDate);   
              }
            }
          }
        } 

      }
    });

    if (timer_id!=-1) 
        clearTimeout(timer_id);

    timer_id = setTimeout(() => {
      checkRoutine();
    }, 1000);
 }
 
 checkRoutine();
  useEffect(() => {
    setTimeout(() => {

      loadTodosFromJson(); 
      todaysDate();
      setFirstSave(true);
      setReady(false);
    }, 2000 ) // 2초 지연 시간 줌
    
    console.log("todos : ", todos)
    
  }, []); // 컴포넌트가 화면에 가장 처음 렌더링 될 때 한 번만 실행하고 싶을 때는 deps 위치에 빈 배열을 넣는다.
 
  useEffect(() => { // 투두 리스트를 계속적으로 저장시켜주게 도와주는 함수
    // Save todos to JSON file whenever the todos state changes
    console.log("상태    : ", firstSave);
    //saveTodosToJson(); //-<< 저장된 값이 있다면 새로 저장하게 하면 안됨.... 
    if(firstSave){
      saveTodosToJson(todayDate);
    }
    
  //});  // 배열을 생략한다면 리렌더링 될 때 마다 실행된다.
   }, [todos]);  // [] 안에 있는 조건이 변경될 때마다 실행

  const todaysDate = async () => {
    let uniqueID
    if(isIOS){
      let iosId = await Application.getIosIdForVendorAsync();
      uniqueID=iosId;
    }else if(isAndroid){
      let androID = Application.androidId;
      uniqueID = androID
    }
  

    let time = new Date();
    let todays = "";
    let year = time.getFullYear().toString();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    
    todays += year+month + day;
    currentTime = todays + hours + mins + secs;
    todos.map((todo) => {
      if(todo.type){
        let createTime = new Date(Number(todo.id))
        const diff = (Date.now() - createTime.getTime()) / 1000;
        console.log(todo.title, "Herer : ", diff)
        const minee = (diff/60)
        console.log("밀리 초 --> 분으로 : ", minee)
      }

    });

  }
  const todo_array =[];

  const loadTodosFromJson = async (today) => {   // 내장된 파일에 저장되어 있는 todo를 로딩하는 함수
      try {
        let uniqueID
        if(isIOS){
          let iosId = await Application.getIosIdForVendorAsync();
          uniqueID=iosId;
         
        }else if(isAndroid){
          let androID = Application.androidId;
          uniqueID = androID
        }
        let time = new Date();
        let todays = "";
        let year = time.getFullYear().toString();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        todays += year+month + day;
        todo_array.length = 0;
        let tt = today;
        
        final_day = tt?tt:todays
        await firebase_db.ref('/to_do/'+uniqueID+'/'+ final_day).once('value').then((snapshot) => {
          let td = snapshot.val();
          // 모든 todo 불러오기 
          // 해당되는 todo - 루틴 설정 된 것들만 time 무조건, day: 해당 요일 되는 얘들만 출력. 
          // 루틴 설정을 안 한 얘들 다 보여줌. --> 취소. 그대로 감.
          if(td){
            setTodos(td)
          }else{
            setTodos([])
            console.log("엘스ㅡㅡ")
          }
      });
    } catch (error) {
      console.log('Error while reading todos from JSON file: here', error);
    }
  };

  const saveTodosToJson = async (today) => {       // 생성된 투두를 내장 파일에 저장하는 함수
     try {
      //firebase에 투두 저장
      let uniqueID;

      if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
        uniqueID=iosId;
        //console.log("Here is Android : ", androID)
      }else if(isAndroid){
        let androID = Application.androidId;
        uniqueID = androID
      }
      let time = new Date();
      let todays = "";
      let year = time.getFullYear().toString();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      todays += year+month + day;
      let tt = today;
      final_day = tt?tt:todays
      firebase_db.ref('/to_do/'+ uniqueID +'/'+ final_day).set(todos, function(error){
        if(null){
          console.log("This is error", error)
        }        
      });
    } catch (error) {
      console.log('Error while saving todos to JSON file:', error);
      
    }
  };

  const handleAddTodo = async () => {       // add 버튼 누르면 실행되는 함수. 
    if (newTodo.trim()) {
      
              let time = new Date();
              let todays = "";
              let year = time.getFullYear().toString();
              let month = time.getMonth() + 1;
              let day = time.getDate();
              let hours = time.getHours();
              let mins = time.getMinutes();
              let secs = time.getSeconds();
              todays += year+month + day + hours + mins + secs;
      //todaysDate(todays)
      const newTodoItem = {           // todo ID, todo 내용, 완료 flag 가 하나의 리스트가 됨.
        "id": Date.now().toString(), //todays
        "title": newTodo,
        "completed": false,
        "routine": "",
        "type": ""
      };
      setTodos([...todos, newTodoItem]);      // 기존 리스트에 새로운 todo를 추가시킴.
      setWholeTo_do([... wholeTo_do, newTodoItem]);
      setNewTodo('');
      console.log(todos);
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

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    loadTodosFromJson(todayDate);  
  };

  const checkingRoutine = (rvalue) => {
    if(rvalue){
      let result = rvalue.split(', ');
      console.log("main result : ", result[0], ", main result 2 : ", result[1], ", main result 3 : ", result[2]);
      let r_id
      if(result[2]){
        r_id=result[2].trim();
      }
      
      let r_num = result[1]
      console.log("루틴 숫자들 : ", r_num);
  
      const updatedTodos = todos.map((todo) =>
        todo.id === r_id ? { ...todo, routine: r_num, type: result[0] } : todo // 3항 연산
      );
      setTodos(updatedTodos);
      console.log("todos : ", todos);
    }
  };
  const chooseDay = async (day) => {
    let uniqueID;
    let today = day;
    if(isIOS){
      let iosId = await Application.getIosIdForVendorAsync();
      uniqueID=iosId;
    }else if(isAndroid){
      let androID = Application.androidId;
      uniqueID = androID
    }
     setTodayDate(today)
   
    loadTodosFromJson(today)
  };
  
  return  ready ? <Loading /> : (    // 실제 화면에서 보여지는 내용
    <View  style={styles.container}>{/* SafeAreaView는 핸드폰 노치나 상태바에 화면이 가져지지 않도록 도와주는 도구*/}
      <StatusBar
        animated={true}
        backgroundColor="#fbfbff"
        barStyle={'dark-content'}
      />
       <View style={styles.user}>
        <User  />
       </View>
      <View style={styles.Headings}>
        <Text style={styles.headingText}>To-Do List</Text>
        <Weather />
      </View>
      
      <Today chooseDays={chooseDay} />
      
      <View style={styles.addView}>
        <TextInput
          style={styles.inputBox}
          placeholder="to do를 입력하세요"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTodo} activeOpacity={0.7}><Text style={isAndroid? styles.addText_andro : styles.addText_ios}> + </Text></TouchableOpacity>
      
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
                
                defaultValue= {editTitle}
                style={styles.editSty}
                onChangeText={setEdited}
                
            ></TextInput>
            <View style={styles.comcanBtn}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, styles.buttonClose]}
              onPress={() => realEdit()}
            ><Text style={styles.textStyle}>  완료  </Text></TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7} 
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
                <View style={[item.type? styles.typeView : null]}><Text style={styles.typeSty}>{item.type}</Text></View>
                <TouchableOpacity  style={styles.editTouch}onPress={() => {handleEditTodo(item.id, item.title)}} activeOpacity={0.7}>
                  <Text style={styles.editText}> 수정 </Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.editTouch} onPress={() => handleDeleteTodo(item.id)} activeOpacity={0.7}>
                  <Text style={styles.editText}> 삭제 </Text>
                </TouchableOpacity>
              
              
              <Routine value={item.id} rvalue={item.type} rtime={item.routine} setValue={checkingRoutine} />{/* 자식컴포넌트에서 직접 그림 setResult={checkingID}*/}
                {/*{value} 사용해서 자식 컴포넌트에서 넘어오는 값 사용할 수 있음 */}
            </View>
           
          </View>
          
        )}
        
        keyExtractor={(item, index) => index.toString()}
      /> 
      
    </View>
  );
};
// 스타일 입력 ↓
const styles = StyleSheet.create({  //각 이름 검색해보면 어디서 사용되는 스타일인지 알 수 있음 
  touchh:{
    borderWidth: 1,
  },
  container: {
    padding: 30,
    paddingBottom: 20,
    backgroundColor: "#fbfbff",
    height: windowHeight,
    
  },
  Headings: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: "DancingScript-Bold",
    //marginTop: 20,
  },
  user: {
   // flex: 1,
   height: 40,
   marginTop: 10,
   marginBottom: 10,

  },
  headingText:{
    flex: 1.5,
    fontSize: 40,
    fontFamily: 'DancingScript-Bold'
    //textAlign: 'center',
   // marginTop: 20,
  },
  modalEditView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView : {
    margin: 20,
    backgroundColor: '#f3e6ff',
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
    backgroundColor: '#DCB3FE',
    flex: 1,
    height: 50,
    margin: 20,
    marginTop: 40,
    borderRadius: 15,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'WomanFlowerB',
  },
  addView:{
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },
  inputBox: {
    flex: 6,
    borderWidth:1,
    borderColor: 'darkgray',
    padding: 3,
    paddingLeft: 7,
    borderRadius: 12,
    fontFamily: 'WomanFlower',
  },
  addBtn: {
    flex: 1,
    backgroundColor: "#DCB3FE", //<----- A 버튼 색상 값
    borderRadius: 15,
    marginLeft: 10,
    
  },
  addText_ios: {
    fontWeight: 700,
    fontSize: 40, 
    //textAlign: 'center',
    justifyContent: 'center',
    color: "#fff",    
  },
  addText_andro: {
    fontWeight: 700,
    fontSize: 40, 
    textAlign: 'center',
    justifyContent: 'center',
    color: "#fff",    
  },
  listSty: {
    paddingBottom: 20,
    marginBottom: 40,

  }, 
  listView: {
    flexDirection: 'row',
    margin: 2,
    marginBottom: 5,
  },
  textSty: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'WomanFlower',
  },
  editSty: {
    borderWidth: 1,
    margin: 3,
    width: 300,
    paddingLeft: 5,
    justifyContent: 'center',
    borderColor: 'darkgray',
    fontFamily: 'WomanFlower',
    fontSize: 25,
  },
  editText: {
    color: "darkgray",
    margin: 5,
    fontSize: 17,
    fontFamily: 'WomanFlower',
  },
  editTouch:{
    backgroundColor: '#f6ebff',
    justifyContent:'center',
    marginRight: 6,
    borderRadius: 15,
  },
  completedTotoTitle: {
    textDecorationLine: 'line-through',
    backgroundColor: '#A76EBE'
  },
  comcanBtn:{ // 완료 취소 버튼
    flexDirection: 'row',
    flex: 1
  },
  typeSty:{
    color: "#fff",
    margin: 5,
    fontSize: 17,
    fontFamily: 'WomanFlower',
    //backgroundColor: '#f6ebff',
  },
  typeView:{
    backgroundColor: '#a76fbd',
    justifyContent:'center',
    marginRight: 6,
    borderRadius: 15,
  }
})
export default ToDoListApp;