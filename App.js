import React from 'react';

import Login from './src/forms/Login';
import MainScreen from './src/forms/MainScreen';
import FormPrestamos from './src/forms/FormPrestamos';
import NuevoCliente from './src/forms/NuevoCliente';
import Abonos from './src/forms/Abonos';
import AbonoDetalle from './src/forms/AbonoDetalle';
import Camara from './src/forms/Camera';
import Mapa from './src/forms/Mapa';
import Acuerdo from './src/forms/Acuerdo';
import ConsultaPrestamos from './src/forms/ConsultaPrestamos';
import ConsultaClientes from './src/forms/ConsultaClientes';
import ConsultaAcuerdos from './src/forms/ConsultaAcuerdos';
import Preview from './src/forms/Preview';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
          name="NuevoCliente"
          component={NuevoCliente}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="Abonos"
          component={Abonos}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="AbonoDetalle"
          component={AbonoDetalle}
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
          name="Acuerdo"
          component={Acuerdo}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

