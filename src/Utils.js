import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';


const Locker = () => {
    return(
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'transparent'
        }}>
        </View>
    )
}

const LockerGray = () => {
    return(
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'gray',
            opacity:0.1,
            borderRadius:15
        }}>
        </View>
    )
}

const GetUserId = async () => {
    const get_values = async() => {
        const idEmpleado = await AsyncStorage.getItem('idEmpleado');
        return idEmpleado
    }
    return get_values()

}

export { Locker, LockerGray, GetUserId }