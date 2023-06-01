import { StyleSheet, View, Text, FlatList, Pressable, Button, Modal, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { v4 as uuidv4 } from "uuid";
import isSameObj from "../utils/isSameObj";
import SelectYearModal from "./Modal/SelectYearModal";
import SelectMonthModal from "./Modal/SelectMonthModal";

import { firebase_db } from "../firebaseConfig";
import * as Application from 'expo-application';

function Calendar() {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date, setDate] = useState(DAY);
  const moveToNextMonth = (month) => {
    if (month === 12) {
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else {
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  const moveToPreviousMonth = (month) => {
    if (month === 1) {
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else {
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year, month) => {
    setYear(year);
    setMonth(month);
  };
  
  return (
    <View style={S.calendarContainer}>
      <Header
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
      <Body
        month={month}
        year={year}
        today={today}
        date={date}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
    </View>
  );
}
export default Calendar;

function Header(props) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  return (
    <>
      <View style={S.header}>
        <Pressable
          onPress={props.moveToPreviousMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={setMonthModalVisible.bind(this, true)}>
            <Text>{props.month}월 </Text>
          </Pressable>
          <Pressable onPress={setYearModalVisible.bind(this, true)}>
            <Text>{props.year}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={props.moveToNextMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>
      <SelectMonthModal
        year={props.year}
        modalVisible={monthModalVisible}
        setModalVisible={setMonthModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
      <SelectYearModal
        month={props.month}
        year={props.year}
        modalVisible={yearModalVisible}
        setModalVisible={setYearModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
    </>
  );
}
//Year,Monty,date
function Body(props) {
  const [totalDays, setTotalDays] = useState({});
  const [pressedDate, setPressedDate] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });

  const { year, month, date } = props;
  const [todos, setTodos] = useState([]);
  const isAndroid = Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';
  const [edited, setEdited] = useState('');
  const [editID, setEditID] = useState(0); 
  const [editTitle, setEditTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [todayDate, setTodayDate] = useState('')

  useEffect(() => {
    getTotalDays(year, month);  // 오늘 날짜

  }, [year, month, date]);

  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); //이 전달의 마지막 날짜 체크
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); //이 전 달의 마지막 날짜의 요일
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();

    const previousDays = Array.from(
      { length: previousMonthLastDay + 1 },
      (v, i) => previousMonthLastDate - previousMonthLastDay + i
    );
    const currentDays = Array.from(
      { length: currentMonthLastDate },
      (v, i) => i + 1
    );
    const nextDays = Array.from(
      { length: 6 - currentMonthLastDay },
      (v, i) => i + 1
    );
    setTotalDays({
      prev: {
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: { daysList: currentDays, year: year, month: month },
      next: {
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  const handlePressDay = (pressedDate) => {
    setPressedDate(pressedDate);
    if (pressedDate.state === "prev" || pressedDate.state === "next") {
      props.moveToSpecificYearAndMonth(pressedDate.year, pressedDate.month);
    }
  };
  //{({ pressed }) => pressed && styles.pressedItem}
  useEffect(() => {
    loadingfromFirebase();
    if(pressedDate.date != 0){

      
      setTodayDate(pressedDate.year.toString() + pressedDate.month + pressedDate.date);
      console.log("todayDate ", todayDate)
    }
  }, [pressedDate]);
  
  useEffect(() => {
    if(pressedDate.date != 0){
      savingtoFirebase();
      
    }
  }, [todos])


  const loadingfromFirebase = async () => {
    if(pressedDate.date != 0){
      let uniqueID;
      if(isAndroid){
        let androID = Application.androidId;
        //console.log("Here is Android : ", androID)
        uniqueID = androID;
      }else{
        uniqueID = Application.getIosIdForVendorAsync();
      }
      const final_day = pressedDate.year.toString() + pressedDate.month + pressedDate.date;
      //console.log("ppppp", final_day);
      await firebase_db.ref('/to_do/'+uniqueID+'/'+ final_day).once('value').then((snapshot) => {
        let td = snapshot.val();

        if(td){
          setTodos(td)
          //console.log("td --> ", td)
        }else{
          setTodos([])
          console.log("엘스ㅡㅡ")
        }
      }); 
    }
  }; 

  const savingtoFirebase = async () => {
    let uniqueID;
      if(isAndroid){
        let androID = Application.androidId;
        //console.log("Here is Android : ", androID)
        uniqueID = androID;
      }else{
        uniqueID = Application.getIosIdForVendorAsync();
      }
      const final_day = pressedDate.year.toString() + pressedDate.month + pressedDate.date;
      //console.log("ppppp", final_day);
      firebase_db.ref('/to_do/'+ uniqueID +'/'+ final_day).set(todos, function(error){
        if(null){
          console.log("This is error", error)
        }        
      });
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
    console.log("현재 todososo", id)
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    loadingfromFirebase(todayDate);  // 로드
  };

  return (
    <View>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.box} key={idx}>
            <Text style={changeColorByDay(day).dayOfWeek}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={S.totalDays}>
        {Object.keys(totalDays).map((state) =>
          totalDays[state].daysList.map((day) => {
            const checkPressedDate = {
              state: state,
              year: totalDays[state].year,
              month: totalDays[state].month,
              date: day,
            };
            return (
              <View style={S.box} key={uuidv4()}>
                <Pressable
                  onPress={handlePressDay.bind(this, checkPressedDate)}
                  style={({ pressed }) => {
                    return [
                      pressedDate.date === checkPressedDate.date &&
                      pressedDate.month === checkPressedDate.month &&
                      pressedDate.year === checkPressedDate.year
                        ? S.pressedDate
                        : null,
                      pressed && S.pressed,
                    ];
                  }}
                >
                  <Text
                    style={[
                      [
                        isSameObj(
                          { state: "curr", ...props.today },
                          checkPressedDate
                        )
                          ? S.today
                          : state === "prev" || state === "next"
                          ? S.prev
                          : S.curr,
                      ],
                    ]}
                  >
                    {day}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>
      <FlatList // 작성한 todo들이 FlatList에 의해 보여지게 됨.
        style={S.listSty}
        data={todos} //todos    wholeTo_do
        renderItem={({ item, index }) => (
          <View >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
              <Text style={S.headerText}>날짜별 TODO</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
            {/* <View style={{flex: 1, height: 1, backgroundColor: 'black', marginBottom:3,}} /> */}
            
            <View style={S.listView}>

                <Text style={[S.textSty, item.completed ? S.completedTotoTitle : null]}
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
              
            </View>
           
          </View>
          
        )}
        
        keyExtractor={(item, index) => index.toString()}
      /> 
      <Modal visible={modalVisible} // <-- edit 모달을 위에다 미리 작성함
        animationType='slide'
        transparent={true}
        
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
         <View style={S.modalEditView}>
          <View style={S.modalView}>
            <TextInput
                //value={edited}//edited
                defaultValue= {editTitle}
                style={S.editSty}
                onChangeText={setEdited}
                //onPressIn={() => console.log("edit: ", editTitle)}
            ></TextInput>
            <View style={S.comcanBtn}>
            <TouchableOpacity
              style={[S.button, S.buttonClose]}
              onPress={() => realEdit()}
            ><Text style={S.textStyle}>  완료  </Text></TouchableOpacity>
            <TouchableOpacity
              style={[S.button, S.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            ><Text style={S.textStyle}>  취소  </Text></TouchableOpacity>
            </View>
          </View>
          </View>
      </Modal>
    </View>
  );
}

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    minHeight: "50%",
    borderBottomColor: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayOfWeek: {
    flexDirection: "row",
  },
  totalDays: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "14.2%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  prev: {
    color: "gray",
    fontSize: 24,
  },
  next: {
    color: "gray",
    fontSize: 24,
  },
  curr: {
    color: "black",
    fontSize: 24,
  },
  today: {
    color: "#2196f3",
    fontSize: 24,
  },
  pressedDate: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },

  headerText:{
    fontWeight: 700,
    fontSize: 20,
    width: 150,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  listSty: {
    paddingBottom: 20,
    marginBottom: 40
  }, 
  listView: {
    flexDirection: 'row',
    margin: 2,
  },
  modalEditView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //backgroundColor: "#fff",
  },
  modalView : {
    margin: 20,
    backgroundColor: '#fff',
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
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  textSty: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});
const changeColorByDay = (day) =>
  StyleSheet.create({
    dayOfWeek: {
      color: day === "Sun" ? "red" : day === "Sat" ? "blue" : "gray",
      fontSize: 16,
    },
  });
