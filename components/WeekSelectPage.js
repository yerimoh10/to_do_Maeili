import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';

const WeekSelectPage = (props) => {
    return(
        <TouchableOpacity style={styles.weektouch}>
            <Text style={styles.weekHeader}> Week </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    weektouch: {
        backgroundColor: '#2196F3', 
        height: 40,
        width: 60,
        marginTop: 20,
        margin: 10,
    },
    weekHeader: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
    },
});

export default WeekSelectPage;