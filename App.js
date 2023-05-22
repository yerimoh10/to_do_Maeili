import React, { useState } from 'react';

import { StatusBar } from 'react-native-web';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Navigation/StackNavigator'

export default function App() {
  console.disableYellowBox = true;
  return(
  <NavigationContainer>
    <StatusBar style="black"/>
  {/* <TodoApp/> */}
    <StackNavigator/>
  </NavigationContainer>
  )
}