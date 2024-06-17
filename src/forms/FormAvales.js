import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, ScrollView, Image, BackHandler, Platform } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { useRoute } from "@react-navigation/native"
import { eliminarPreregistroAvalAPI, getSiguienteIdAvalAPI } from '../services/ServiceClientes';
import Toast from 'react-native-root-toast';

import { LogBox } from 'react-native';

import { getSiguienteIdAval, eliminarPreregistroAval, registrar_aval } from '../services/ServiceClientes';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const FormAvales = ({navigation}) => {
    function backMainScreen() {
        if(editable == true){
            setCancel(1)
        }else{
            navigation.goBack()
        }
    }
    const [topLabel, setTopLabel] = useState('')
    const [cancel, setCancel] = useState('')
    const [idAval, setIdAval] = useState(0)
    const [idAvalNoEditable, setIdAvalEdit] = useState('')
    const [nombreAval,      setNombreAval] = useState('');
    const [domicilioAval,         setDomAval] = useState('');
    const [telefonoAval,         setTelAval] = useState('');
    const [editable, setEditable] = useState(true)
    const [loading, setLoading] = useState(0);
    const [loadFlag, setLoadFlag] = useState(0)
    const route = useRoute()
    let client_type = "Cliente"
    const [idCliente, setIdCliente] = useState("")
    useEffect(() => {
        const backAction = () => {
            if(route.params?.label){
                return false;
            }else{
                setCancel(1)
                return true;
            }
        };
        const backHandlerClientes = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        getSiguienteId()
        
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [route.params?.type, setEditable, editable, ]);


    const getSiguienteId = useCallback(async () => {
        const data = await getSiguienteIdAvalAPI(route.params?.idCliente)
        setIdAval(data.nextId)
    }, [])

    const eliminarPreregistro = useCallback(async (idAval) => {
        const response = await eliminarPreregistroAvalAPI(idAval)
    }, [])

    const registerAval = async (
        newIdAval,
        newIdCliente,
        newNomAval,
        newDomAval,
        newTelAval) => {
        nuevoAval = {
            "idAval":newIdAval,
            "idCliente":newIdCliente,
            "nombreAval":newNomAval,
            "domicilio_aval":newDomAval,
            "telefono_aval":newTelAval
        }
        if(newTelAval.length == 10){
            const data = await registrar_aval(nuevoAval)
            let toast = Toast.show('Aval Registrado', {
                duration: Toast.durations.SHORT,
            });
            // let aval_data = {
            //     id: newIdAval,
            //     title: newNomAval,
            //     dom: newDomAval,
            //     tel: newTelAval
            // }
            //route.params?.updateAval(aval_data)
            navigation.goBack()
        }else{
            let toast = Toast.show('Telefono Invalido', {
                duration: Toast.durations.SHORT,
            });
        }
    }

    return (
        <View style={{height:"100%"}}>
            {
                cancel === 1 &&
                <View style={{position:"absolute", height:"100%", width:"100%", zIndex:20}}>
                    <View style={styles.alertBackground}></View>
                    <View style={styles.alert}>
                        <View style={styles.spacer30}></View>
                        <Text style={{fontSize:22, alignSelf:"center", textAlign:"center"}}>Estas seguro que deseas cancelar el registro?</Text>
                        <View style={styles.spacer20}></View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:"50%"}}>
                                <TouchableOpacity 
                                style={{alignSelf:"center", width:'70%', backgroundColor:"green", height:50, justifyContent:"center", borderRadius:15}}
                                onPress={() => {eliminarPreregistro(idAval); navigation.goBack()}}>
                                    <Text style={{fontSize:22, alignSelf:"center", color:"white"}}>Si</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:"50%"}}>
                                <TouchableOpacity 
                                style={{alignSelf:"center", width:'70%', backgroundColor:"red", height:50, justifyContent:"center", borderRadius:15}}
                                onPress={() => setCancel(0)}>
                                    <Text style={{fontSize:22, alignSelf:"center", color:"white"}}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }

            <ScrollView style={styles.background}>
                <View style={styles.mainTopBar}>
                    <View style={styles.spacer30}></View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.topBarContainer}>
                        <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                                <Image style={styles.invertedImageTopBar}
                                    source={ImageIndex.back}>
                                </Image>
                        </TouchableOpacity>
                        {
                            editable === true ?
                            <Text style={styles.mainHeadersInverted}>Nuevo Aval</Text>
                            :
                            <Text style={styles.mainHeadersInverted}>{topLabel}</Text>
                        }
                        
                    </View>
                    <View style={styles.spacer20}></View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.spacer10}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Aval</Text>
                                    {
                                        idAvalNoEditable === '' ?
                                        <TextInput style={styles.textBox}
                                        onChangeText={value => setIdAval(value)}
                                        value={String(idAval)}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(idAvalNoEditable)}/>
                                    }
                                
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Nombre del Aval</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Nombre Apellido Apellido'
                                onChangeText={value => setNombreAval(value)}
                                defaultValue={nombreAval}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder} >
                                <Text style={styles.textBoxLabel}>Domicilio del Aval</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Calle, Numero, Colonia'
                                onChangeText={value => setDomAval(value)}
                                defaultValue={domicilioAval}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Telefono del Aval</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholder='Ej. 6681234567'
                                onChangeText={value => setTelAval(value)}
                                defaultValue={telefonoAval}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                {
                    loadFlag === 0 &&
                    <View style={styles.formRow}>
                    <TouchableOpacity onPress={() => registerAval(
                            idAval,
                            idCliente,
                            nombreAval,
                            domicilioAval,
                            telefonoAval,
                        )}
                        style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>Registrar Aval</Text>
                    </TouchableOpacity>
                </View>
                }

                <View style={styles.spacer20}></View>
            </ScrollView>
        </View>
        
    )
}

export default FormAvales;