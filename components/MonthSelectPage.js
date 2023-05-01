import React, { useState, useEffect, Component } from 'react';
import { View, Button, StyleSheet, Text, Modal, Pressable, TouchableOpacity, ScrollView  } from 'react-native';

const MonthSelectPage = (props) => {
    return(
        <TouchableOpacity style={styles.montouch}>
            <Text style={styles.monHeader}> Month </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    montouch: {
        backgroundColor: '#2196F3', 
        height: 40,
        width: 60,
        marginTop: 20,
        margin: 10,
    },
    monHeader: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
    },
});

export default MonthSelectPage;