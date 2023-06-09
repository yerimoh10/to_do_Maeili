import React, { useEffect, useState} from 'react';

import { StatusBar } from 'react-native-web';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigator from './Navigation/BottomeTabsNavigation'
import * as Font from 'expo-font';

export default function App() {
  console.disableYellowBox = true;
  
  const [isLoading, onChangeLoading] = useState(false);
  const getFonts = async () => {
    await Font.loadAsync({
      'DancingScript-Bold' : require('./assets/fonts/DancingScript-Bold.ttf'),
      'WomanFlower' : require('./assets/fonts/DXWomanflowerM-KSCpc-EUC-H.ttf'),
      'WomanFlowerB' : require('./assets/fonts/DXWomanflowerB-KSCpc-EUC-H.ttf')
    });
    onChangeLoading(true);
  }

  useEffect ( () => {
    getFonts();
  },[])

  if(isLoading){

    return(
      <NavigationContainer>
        <StatusBar style="black"/>
      
        <BottomNavigator />
        
      </NavigationContainer>
      )
  }
}