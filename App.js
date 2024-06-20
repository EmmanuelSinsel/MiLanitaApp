import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { useHeaderHeight } from '@react-navigation/elements';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import Login from './src/forms/Login';
import MainScreen from './src/forms/MainScreen';
import FormPrestamos from './src/forms/FormPrestamos';
import FormClientes from './src/forms/FormClientes';
import FormAbonos from './src/forms/FormAbonos';
import ConsultaExtraCobranza from './src/forms/ConsultaExtraCobranza';
import Camara from './src/forms/Camera';
import Mapa from './src/forms/Mapa';
import FormAcuerdos from './src/forms/FormAcuerdos';
import ConsultaPrestamos from './src/forms/ConsultaPrestamos';
import ConsultaClientes from './src/forms/ConsultaClientes';
import ConsultaAcuerdos from './src/forms/ConsultaAcuerdos';
import Preview from './src/forms/Preview';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import FormExtraCobranza from './src/forms/FormExtraCobranza';
import FormAvales from './src/forms/FormAvales';
import Corte from './src/forms/FormCorte';
import Cajas from './src/forms/FormCajas';
import ListaCajas from './src/forms/ListaCajas';
import FormCajas from './src/forms/FormCajas';
import FormGaleria from './src/forms/FormGaleria';
import GaleriaPreview from './src/forms/GaleriaPreview';
import ComparePreview from './src/forms/ComparePreview';
import FormUsuarios from './src/forms/FormUsuarios';
import FormAbonosAcuerdos from './src/forms/FormAbonosAcuerdos';

// import { LogBox } from 'react-native';

// // Ignore log notification by message
// LogBox.ignoreLogs(['Warning: ...']);

// //Ignore all log notifications
// LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

console.disableYellowBox = true; 

export default function App() {


  
  const LOCATION_TASK_NAME = 'background-location-task-buzz-v2';

  useEffect(() => {

    requestPermissions()
  })

  const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 10000, // Check every 10 seconds
          distanceInterval: 0,
          showsBackgroundLocationIndicator: true,
        });
      }
    }
  };
  
  const PermissionsButton = () => (
    <View style={styles.container}>
      <Button onPress={requestPermissions} title="Enable background location" />
    </View>
  );
  
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error)
      return;
    }
    if (data) {
      const { locations } = data;
    }
  });
  return (
    <AutocompleteDropdownContextProvider >
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormPrestamos"
            component={FormPrestamos}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormClientes"
            component={FormClientes}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormAvales"
            component={FormAvales}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormAbonos"
            component={FormAbonos}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ConsultaExtraCobranza"
            component={ConsultaExtraCobranza}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormExtraCobranza"
            component={FormExtraCobranza}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="Camara"
            component={Camara}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="Mapa"
            component={Mapa}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormAcuerdos"
            component={FormAcuerdos}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ConsultaPrestamos"
            component={ConsultaPrestamos}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ConsultaClientes"
            component={ConsultaClientes}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ConsultaAcuerdos"
            component={ConsultaAcuerdos}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="Preview"
            component={Preview}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="Corte"
            component={Corte}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ListaCajas"
            component={ListaCajas}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormCajas"
            component={FormCajas}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormGaleria"
            component={FormGaleria}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="GaleriaPreview"
            component={GaleriaPreview}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="ComparePreview"
            component={ComparePreview}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormUsuarios"
            component={FormUsuarios}
            options={{headerShown: false}}/>
          <Stack.Screen
            name="FormAbonosAcuerdos"
            component={FormAbonosAcuerdos}
            options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
    </AutocompleteDropdownContextProvider>
  );
}

