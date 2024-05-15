import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, ScrollView, Image, BackHandler, Platform } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"
import ServicePrestamos from '../services/ServicePrestamos';
import ServiceClientes from '../services/ServiceClientes';
import Toast from 'react-native-root-toast';

const FormClientes = ({navigation}) => {
    let service = new ServicePrestamos()
    let serviceClientes = new ServiceClientes()
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
    const [idCliente, setIdCliente] = useState(0)
    const [idClienteNoEditable, setIdClienteEdit] = useState('')
    const [nombreCliente,      setNombreCliente] = useState('');
    const [domicilioCliente,         setDomCliente] = useState('');
    const [telefonoCliente,         setTelCliente] = useState('');
    const [tipoCliente,        setTipoCliente] = useState('');
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
    const clientTypeList = [{label:"Normal",value:"1"},{label:"Coordinador",value:"2"}]
    const route = useRoute()
    let client_type = "Cliente"
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

        if(route.params?.type == 1){
            client_type = "Aval"
        }else{
            client_type = "Cliente"
        }
        if(route.params?.label){
            setLoadFlag(1)
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            if(loadFlag == 0){
                getDetalleCliente(route.params?.id)
            }
        }else{
            setEditable(true)
            setTopLabel("Nuevo Prestamo")
            setButtonLabel("Registrar Prestamo")
            getRutas()
            getSiguienteId()
        }
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [getDetalleCliente, route.params?.type, setEditable, editable, ]);

    const getRutas = useCallback(async () => {
        const res = await service.getRutas()
        const data = res.data
        let tempRutas = []
        for(let i = 0; i < data.length ; i++){
            tempRutas.push({"label":data[i].ruta,"value":data[i].idRuta})
        }
        setListaRutas(tempRutas)
    }, [])
    const getGrupos = useCallback(async (idRuta) => {
        const res = await service.getGrupos(id=idRuta)
        const data = res.data
        let tempGrupos = []
        for(let i = 0; i < data.length ; i++){
            tempGrupos.push({"label":data[i].nomGrupo,"value":Number(data[i].idGrupo)})
        }
        setListaGrupos(tempGrupos)
    }, [])

    const getSiguienteId = useCallback(async () => {
        const data = await serviceClientes.getSiguienteId()
        setIdCliente(data.nextId)
    }, [])

    const eliminarPreregistro = useCallback(async (id_usuario) => {
        const response = await serviceClientes.eliminarPreregistro(id_usuario)
    }, [])

    const getDetalleCliente = useCallback(async (id) => {
        const res = await serviceClientes.getDetalleCliente(id=id)
        const data = res.data
        console.log(data)
        setLoading(0)   
        setIdClienteEdit(data.idCliente)
        setNombreCliente(data.nomCliente)
        setDomCliente(data.domicilioCliente)
        setTelCliente(data.telefonoCliente)
        setRutaEdit(data.ruta.nom_ruta)
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
        const data = await serviceClientes.registrar_cliente(nuevoCliente)
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
                            <Text style={styles.mainHeadersInverted}>Nuevo {client_type}</Text>
                            :
                            <Text style={styles.mainHeadersInverted}>{topLabel}</Text>
                        }
                        
                    </View>
                    <View style={styles.spacer20}></View>
                </View>
                <View style={styles.spacer10}></View>
                <View style={styles.mainHeaderContainer}>
                    <Text style={styles.mainHeaders}>Datos del {client_type}</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.spacer10}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Cliente</Text>
                                    {
                                        idClienteNoEditable === '' ?
                                        <TextInput style={styles.textBox}
                                        onChangeText={value => setIdCliente(value)}
                                        value={String(idCliente)}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(idClienteNoEditable)}/>
                                    }
                                
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Nombre Apellido Apellido'
                                onChangeText={value => setNombreCliente(value)}
                                defaultValue={nombreCliente}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder} >
                                <Text style={styles.textBoxLabel}>Domicilio</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Calle, Numero, Colonia'
                                onChangeText={value => setDomCliente(value)}
                                defaultValue={domicilioCliente}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Telefono</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholder='Ej. 6681234567'
                                onChangeText={value => setTelCliente(value)}
                                defaultValue={telefonoCliente}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.formRow}>
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
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(rutaNoEditable)}/>
                                    }
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Grupo</Text>
                                    {
                                        grupoNoEditable === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={listaGrupos}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={grupo}
                                        onChange={item => {setGrupo(item.value);}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(grupoNoEditable)}/>
                                    }
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Tipo de Cliente</Text>
                                    {
                                        tipoClienteNoEditable === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={clientTypeList}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Normal'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={tipoCliente}
                                        onChange={item => {setTipoCliente(item.value);}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(tipoClienteNoEditable)}/>
                                    }
                        </View>
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
                        <Text style={styles.mainButtonText}>Registrar Cliente</Text>
                    </TouchableOpacity>
                </View>
                }

                <View style={styles.spacer20}></View>
            </ScrollView>
        </View>
        
    )
}

export default FormClientes;