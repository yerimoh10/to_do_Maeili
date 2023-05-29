import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옴
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import ToDoListApp from '../pages/ToDoListApp';
import Memoirs from '../pages/Memoirs';
import CalendarPage from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';
import TodaysPage from '../components/TodaysPage';
import AllTodos from '../pages/AllTodos';
import RoutinePage from '../components/RoutinePage';
// 옮길 페이지 추가

//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();


const StackNavigator = ({screenName}) =>{
    //const Tab = createBottomTabNavigator();
    return (
      <Stack.Navigator>
        {screenName === 'all' ? (
        <Stack.Screen name="all" component={AllTodos}  />
      ) : null}
         <Stack.Screen name="home" component={ToDoListApp} />
         <Stack.Screen name="day" component={TodaysPage}/>
         {/* <Stack.Screen name="all" component={AllTodos} /> */}
      </Stack.Navigator>
    );

        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        // <Stack.Navigator>

        //     {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
        //     <Stack.Screen name=" " component={ToDoListApp}/>
        //     {/* 옮길 페이지 작성하기 */}
        // </Stack.Navigator>
      //   <Tab.Navigator
      //   screenOptions={({ route }) => ({
      //     headerShown: false,
      //     tabBarIcon: ({ color }) => {
      //       switch (route.name) {
      //         case "Home":
      //           return <Ionicons name="home-sharp" size={24} color={color} />;
      //         case "CalendarPage":
      //           return <Ionicons name="calendar-sharp" size={24} color={color} />
      //         case "Memoirs":
      //           return <Ionicons name="pencil" size={24} color={color} />;
      //         case "MyPage":
      //           return <Ionicons name="settings-outline" size={24} color={color} />;
      //       }
      //     },
      //     tabBarActiveTintColor: "black",
      //     tabBarInactiveTintColor: "gray",
      //   })}
      // >
      //    <Tab.Screen name="Home" component={ToDoListApp} />
      //     <Tab.Screen name="CalendarPage" component={CalendarPage} />
      //     <Tab.Screen name="Memoirs" component={Memoirs} />
      //     <Tab.Screen name="MyPage" component={MyPage} />
      //     <Tab.Screen name="routine" component={RoutinePage} />
      //   </Tab.Navigator>
  }

export default StackNavigator;