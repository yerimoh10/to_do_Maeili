import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import ToDoListApp from '../pages/ToDoListApp';
import Memoirs from '../pages/Memoirs';
import CalendarPage from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';
import StackNavigator from './StackNavigator';
import All from '../pages/AllTodos';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabsNavigation = () => {
  
    return (

        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            switch (route.name) {
              case "Home":
                return <Ionicons name="home-sharp" size={24} color={color} />;
              case "CalendarPage":
                return <Ionicons name="calendar-sharp" size={24} color={color} />
              case "Memoirs":
                return <Ionicons name="pencil" size={24} color={color} />;
              case "MyPage":
                return <Ionicons name="settings-outline" size={24} color={color} />;
            }
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
        initialRouteName='Home'
      >
        
        {/* <Tab.Screen name="allPage" > */}
          {/* bottomTab이랑 stack이랑 연결시켜주는 부분.
          이 부분 집중해서 볼것!!, bottomTab이랑 stack연결 시, component는 stack에서 설정함,!! */}
          
        {/* {() => <StackNavigator screenName="all" />} */}
       {/* </Tab.Screen> */}
          
         <Tab.Screen name="Home" component={ToDoListApp} />
          <Tab.Screen name="CalendarPage" component={CalendarPage} />
          <Tab.Screen name="Memoirs" component={Memoirs} />
          <Tab.Screen name="MyPage" component={MyPage} />
          {/* <Tab.screen name="all" component={MyStack} /> */}
        </Tab.Navigator>

    )
}
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
          name="all"
          component={All}
          options={{
            headerShown: flase,
          }}/>
    </Stack.Navigator>
  )
}
export default BottomTabsNavigation;