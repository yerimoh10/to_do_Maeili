import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import * as Location from "expo-location";
import { Fontisto } from '@expo/vector-icons'; 

const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function Weather() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(null);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 4 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    if (location.length > 0 && location[0]) {
      setCity(location[0].city);
    }
    console.log("city : " , location.length);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json.daily);
    setCurrentTemp(json.current.temp);
    console.log(city)
  };

  useEffect(() => {
    getWeather();
  }, []);
  return (
    
      <View style={styles.container}>
        <View style={styles.day}>
          <View style={styles.left}>
            {days.length > 0 && days[0] && days[0].weather && (
              <View>
                <Text style={styles.weather}>{days[0].weather[0].main}</Text>
                <Fontisto name={icons[days[0].weather[0].main]} size={25} color="black" />
              </View>
            )}
          </View>
          <View style={styles.descreption}>
              <Text style={styles.temp}>{currentTemp}</Text>
              <Text style={styles.city}>{city}</Text>
          </View>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
  },
  day: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  weather: {
    fontSize: 20,
    marginBottom: 5,
    height: 25,
    fontFamily: 'WomanFlower',
  },
  descreption: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  temp: {
    fontSize: 30,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'WomanFlowerB',
  },
  city: {
    fontSize: 20,
    fontFamily: 'WomanFlower',
  },
  left:{
    flexDirection: "column", 
    alignItems: "center",
    padding: 5,
  },

});