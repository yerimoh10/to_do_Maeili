import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.timerBox}>
    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    {!isRunning ? (
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.button} onPress={handleStop}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity style={styles.button} onPress={handleReset}>
      <Text style={styles.buttonText}>Reset</Text>
    </TouchableOpacity>
  </View>
  );
}


const styles = StyleSheet.create({
  timerBox: {
    flexDirection:"column",
    backgroundColor: "#F3E1DD",
    padding:50,
    borderRadius:10,
    textAlign: "center",
    height: '50%',
    width: '100%',
  
  },
  timerText: {
    textAlign: "center",
    fontSize:40,
    fontWeight:"600",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#CFC4E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Timer;
