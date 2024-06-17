import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, ScrollView, Image, BackHandler, Platform } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"
import ServiceClientes, {  eliminarPreregistroClienteAPI, getDetalleClienteAPI, getSiguienteIdClienteAPI, registrar_clienteAPI } from '../services/ServiceClientes';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locker, LockerGray } from '../Utils';
import { getGruposAPI, getRutasAPI } from '../services/ServiceOtros';
import { getSiguienteIdEmpleadoAPI } from '../services/ServiceAuth';

const FormUsuarios = ({navigation}) => {
    function backMainScreen() {
        if(editable == true){
            setCancel(1)
        }else{
            navigation.goBack()
        }

    }
    const [topLabel, setTopLabel] = useState('')
    const [buttonLabel, setButtonLabel] = useState('')
    const [cancel, setCancel] = useState('')
    const [idEmpleado, setIdEmpleado] = useState(0)
    const [idEmpleadoNoEditable, setIdEmpleadoEdit] = useState('')
    const [nombreUsuario,      setNombreUsuario] = useState('');
    const [nombreEmpleado,      setNombreEmpleado] = useState('');
    const [rolEmpleado,        setRolEmpleado] = useState('');
    const [rolEmpleadoNoEditable,        setRolEmpleadoNoEditable] = useState('');
    const [password,      setPassword] = useState('');
    const [confirmarPassword,      setConfirmarPassword] = useState('');
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [rutaNoEditable,                setRutaEdit] = useState('');
    const [grupoNoEditable,               setGrupoEdit] = useState('');
    const [tipoClienteNoEditable,               setTipoClienteEdit] = useState('');
    const [listaRutas, setListaRutas] = useState([]);
    const [listaGrupos, setListaGrupos] = useState([]);
    const [editable, setEditable] = useState(true)
    const [loading, setLoading] = useState(0);
    const [loadFlag, setLoadFlag] = useState(0)
    const listaRoles = [{label:"Administrador",value:"1"},{label:"Auxiliar",value:"2"}]
    const route = useRoute()
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
        if(route.params?.label){
            setLoadFlag(1)
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            if(loadFlag == 0){
                getDetalleEmpleado(route.params?.id)
            }
        }else{
            setEditable(true)
            const getPermissions = async () => {
                let tempRutas = await getRutas()
                const rol = await AsyncStorage.getItem('nombreRol');
                if(rol != "ADMINISTRADOR"){
                    const rutaEmpleado = await AsyncStorage.getItem('idRuta');
                    setRuta(String(rutaEmpleado))
                    getGrupos(Number(rutaEmpleado))
                    for(let r = 0 ; r < tempRutas.length ; r++){
                        if(tempRutas[r].value == rutaEmpleado){
                            setRutaEdit(String(tempRutas[r].label))
                            break;
                        }
                    }
                    
                }
            }
            getPermissions()
            getSiguienteId()
        }
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [getDetalleEmpleado, route.params?.type, setEditable, editable, ]);

    const getRutas = useCallback(async () => {
        const res = await getRutasAPI()
        const data = res.data
        let tempRutas = []
        for(let i = 0; i < data.length ; i++){
            tempRutas.push({"label":data[i].ruta,"value":data[i].idRuta})
        }
        setListaRutas(tempRutas)
        return tempRutas;
    }, [])
    const getGrupos = useCallback(async (idRuta) => {
        const res = await getGruposAPI(id=idRuta)
        const data = res.data
        let tempGrupos = []
        for(let i = 0; i < data.length ; i++){
            tempGrupos.push({"label":data[i].nomGrupo,"value":Number(data[i].idGrupo)})
        }
        setListaGrupos(tempGrupos)
    }, [])

    const getSiguienteId = useCallback(async () => {
        const data = await getSiguienteIdEmpleadoAPI()
        setIdEmpleado(data.nextId)
    }, [])

    const eliminarPreregistro = useCallback(async (id_usuario) => {
        const response = await eliminarPreregistroClienteAPI(id_usuario)
    }, [])

    const getDetalleEmpleado = useCallback(async (id) => {
        const res = await getDetalleClienteAPI(id=id)
        const data = res.data
        setLoading(0)   
        setIdEmpleadoEdit(data.idCliente)
        setNombreCliente(data.nomCliente)
        setDomCliente(data.domCliente)
        setTelCliente(data.telCliente)
        setRutaEdit(data.ruta.nomRuta)
        setGrupoEdit(data.grupo.nomGrupo)
        if(data.tipoCliente == 1){
            setTipoClienteEdit("Normal")
        }
    }, [])

    const registerCliente = async (
        newIdCliente,
        newNomCliente,
        newDomCliente,
        newTelCliente,
        newGrupoCliente,
        newTipoCliente) => {
        nuevoCliente = {
            "id_cliente":newIdCliente,
            "nom_cliente":newNomCliente,
            "domicilio":newDomCliente,
            "tipo_cliente":newTipoCliente,
            "pagare":"",
            "celular":newTelCliente,
            "id_grupo":newGrupoCliente,
            "aval":"",
            "aval_dom":"",
            "aval_tel":"",
            "estatus":"Activo"
        }
        const data = await registrar_clienteAPI(nuevoCliente)
        let toast = Toast.show('Cliente Registrado', {
            duration: Toast.durations.SHORT,
        });
        navigation.goBack()
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
                                onPress={() => {eliminarPreregistro(idCliente); navigation.goBack()}}>
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
                            <Text style={styles.mainHeadersInverted}>Nuevo Empleado</Text>
                            :
                            <Text style={styles.mainHeadersInverted}>{topLabel}</Text>
                        }
                        
                    </View>
                    <View style={styles.spacer20}></View>
                </View>
                <View style={styles.spacer10}></View>
                <View style={styles.mainHeaderContainer}>
                    <Text style={styles.mainHeaders}>Datos del Usuario</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.spacer10}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Nombre de Usuario</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Nombre de Usuario'
                                onChangeText={value => setNombreCliente(value)}
                                defaultValue={nombreUsuario}/>
                                {
                                    idClienteNoEditable !== '' &&
                                    <Locker></Locker>
                                }
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Contraseña</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Contraseña'
                                secureTextEntry={true}
                                onChangeText={value => setNombreCliente(value)}
                                defaultValue={password}/>
                                {
                                    idClienteNoEditable !== '' &&
                                    <Locker></Locker>
                                }
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Confirmar Contraseña</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Contraseña'
                                secureTextEntry={true}
                                onChangeText={value => setNombreCliente(value)}
                                defaultValue={confirmarPassword}/>
                                {
                                    idClienteNoEditable !== '' &&
                                    <Locker></Locker>
                                }
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Rol</Text>
                                        {
                                            grupoNoEditable === '' ?
                                            <Dropdown style={styles.comboBox}
                                            data={listaRoles}
                                            labelField="label" valueField="value"
                                            searchPlaceholder="Grupo.." placeholder='Ej. Admin'
                                            placeholderStyle={styles.comboBoxPlaceholder}
                                            selectedTextStyle={styles.comboBoxSelected}
                                            value={rolEmpleado}
                                            onChange={item => {setGrupo(item.value);}}/>
                                            :
                                            <View>
                                                <TextInput style={styles.textBox}
                                                selection={{start:0, end:0}}
                                                defaultValue={String(rolEmpleadoNoEditable)}/>
                                                <Locker></Locker>
                                            </View>
                                        }
                        </View>
                    </View>
                </View>
                <View style={styles.spacer10}></View>
                <View style={styles.mainHeaderContainer}>
                    <Text style={styles.mainHeaders}>Datos del Empleado</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.spacer10}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Empleado</Text>
                                    {
                                        idEmpleadoNoEditable === '' ?
                                        <View>
                                            <TextInput style={styles.textBox}
                                            onChangeText={value => setIdCliente(value)}
                                            value={String(idEmpleado)}/>
                                            <Locker></Locker>
                                        </View>
                                        :
                                        <View>
                                            <TextInput style={styles.textBox}
                                            selection={{start:0, end:0}}
                                            defaultValue={String(idEmpleadoNoEditable)}/>
                                            <Locker></Locker>
                                        </View>

                                    }
                                
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Ruta</Text>
                                    {
                                        rutaNoEditable === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={listaRutas}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={ruta}
                                        onChange={item => {setRuta(item.value); getGrupos(item.value)}}/>
                                        :
                                        <View>
                                            <TextInput style={styles.textBox}
                                            selection={{start:0, end:0}}
                                            defaultValue={String(rutaNoEditable)}/>
                                            <Locker></Locker>
                                        </View>
                                    }
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Nombre del Empleado</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Nombre Apellido Apellido'
                                onChangeText={value => setNombreCliente(value)}
                                defaultValue={nombreEmpleado}/>
                                {
                                    idEmpleadoNoEditable !== '' &&
                                    <Locker></Locker>
                                }
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.formRow}>
                    
                </View>
                <View style={styles.spacer20}></View>
                {
                    loadFlag === 0 &&
                    <View style={styles.formRow}>
                    <TouchableOpacity onPress={() => registerCliente(
                        idCliente,
                        nombreCliente,
                        domicilioCliente,
                        telefonoCliente,
                        grupo,
                        tipoCliente
                    )}
                        style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>Registrar Empleado</Text>
                    </TouchableOpacity>
                </View>
                }

                <View style={styles.spacer20}></View>
            </ScrollView>
        </View>
        
    )
}

export default FormUsuarios;