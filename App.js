import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';

import Login from './src/forms/Login';
import MainScreen from './src/forms/MainScreen';
import FormPrestamos from './src/forms/FormPrestamos';
import FormClientes from './src/forms/FormClientes';
import Abonos from './src/forms/Abonos';
import ConsultaExtraCobranza from './src/forms/ConsultaExtraCobranza';
import Camara from './src/forms/Camera';
import Mapa from './src/forms/Mapa';
import Acuerdo from './src/forms/Acuerdo';
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
            name="Abonos"
            component={Abonos}
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
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

