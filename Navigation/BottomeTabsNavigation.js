import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import ToDoListApp from '../pages/ToDoListApp';
import Memoirs from '../pages/Memoirs';
import CalendarPage from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  
    return (

        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            switch (route.name) {
              case "Home":
                return <Ionicons name="home-sharp" size={30} color={color} />;
              case "CalendarPage":
                return <Ionicons name="calendar-sharp" size={30} color={color} />
              case "Memoirs":
                return <Ionicons name="pencil" size={30} color={color} />;
              case "MyPage":
                return <Ionicons name="settings-outline" size={30} color={color} />;
            }
          },
          tabBarStyle: {
            height: '8%',
          },
          tabBarLabelStyle: {
            fontFamily: 'WomanFlower',
            marginBottom: 5,          
          },
          tabBarActiveTintColor: "#A76EBE",
          tabBarInactiveTintColor: "#DCB3FE",
        })}
        initialRouteName='Home'
        
      >          
         <Tab.Screen name="Home" component={ToDoListApp} />
          <Tab.Screen name="CalendarPage" component={CalendarPage} />
          <Tab.Screen name="Memoirs" component={Memoirs} />
          <Tab.Screen name="MyPage" component={MyPage} />
        </Tab.Navigator>

    )
}
export default BottomTabsNavigation;