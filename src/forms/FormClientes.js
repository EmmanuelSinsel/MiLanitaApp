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
    const [top_label, setTopLabel] = useState('')
    const [button_label, setButtonLabel] = useState('')
    const [cancel, setCancel] = useState('')
    const [id_cliente, setIdCliente] = useState(0)
    const [id_cliente_edit, setIdClienteEdit] = useState('')
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [dom_cliente,         setDomCliente] = useState('');
    const [tel_cliente,         setTelCliente] = useState('');
    const [tipo_cliente,        setTipoCliente] = useState('');
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [ruta_edit,                setRutaEdit] = useState('');
    const [grupo_edit,               setGrupoEdit] = useState('');
    const [tipo_cliente_edit,               setTipoClienteEdit] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    const [editable, setEditable] = useState(true)
    const [loading, setLoading] = useState(0);
    const [load_flag, setLoadFlag] = useState(0)
    const client_type_list = [{label:"Normal",value:"1"},{label:"Coordinador",value:"2"}]
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
            if(load_flag == 0){
                get_detalle_cliente(route.params?.id)
            }
        }else{
            setEditable(true)
            setTopLabel("Nuevo Prestamo")
            setButtonLabel("Registrar Prestamo")
            get_rutas()
            get_siguiente_id()
        }
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [get_detalle_cliente, route.params?.type, setEditable, editable, ]);

    const get_rutas = useCallback(async () => {
        const res = await service.get_rutas()
        const data = res.data
        let temp_rutas = []
        for(let i = 0; i < data.length ; i++){
            temp_rutas.push({"label":data[i].ruta,"value":data[i].id_ruta})
        }
        setListaRutas(temp_rutas)
    }, [])
    const get_grupos = useCallback(async (id_ruta) => {
        const res = await service.get_grupos(id=id_ruta)
        const data = res.data
        let temp_grupos = []
        for(let i = 0; i < data.length ; i++){
            temp_grupos.push({"label":data[i].nom_grupo,"value":Number(data[i].id_grupo)})
        }
        setListaGrupos(temp_grupos)
    }, [])

    const get_siguiente_id = useCallback(async () => {
        const data = await serviceClientes.get_siguiente_id()
        setIdCliente(data.next_id)
    }, [])

    const eliminar_preregistro = useCallback(async (id_usuario) => {
        const response = await serviceClientes.eliminar_preregistro(id_usuario)
    }, [])

    const get_detalle_cliente = useCallback(async (id) => {
        const res = await serviceClientes.get_detalle_cliente(id=id)
        const data = res.data
        console.log(data)
        setLoading(0)   
        setIdClienteEdit(data.id_cliente)
        setNombreCliente(data.nom_cliente)
        setDomCliente(data.dom_cliente)
        setTelCliente(data.tel_cliente)
        setRutaEdit(data.ruta.nom_ruta)
        setGrupoEdit(data.grupo.nom_grupo)
        if(data.tipo_cliente == 1){
            setTipoClienteEdit("Normal")
        }
    }, [])

    const registerCliente = async (
        new_id_cliente,
        new_nom_cliente,
        new_dom_cliente,
        new_tel_cliente,
        new_grupo_cliente,
        new_tipo_cliente) => {
        nuevo_cliente = {
            "id_cliente":new_id_cliente,
            "nom_cliente":new_nom_cliente,
            "domicilio":new_dom_cliente,
            "tipo_cliente":new_tipo_cliente,
            "pagare":"",
            "celular":new_tel_cliente,
            "id_grupo":new_grupo_cliente,
            "aval":"",
            "aval_dom":"",
            "aval_tel":"",
            "estatus":"Activo"
        }
        console.log(nuevo_cliente)
        const data = await serviceClientes.registrar_cliente(nuevo_cliente)
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
                                onPress={() => {eliminar_preregistro(id_cliente); navigation.goBack()}}>
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
                            <Text style={styles.mainHeadersInverted}>{top_label}</Text>
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
                                        id_cliente_edit === '' ?
                                        <TextInput style={styles.textBox}
                                        onChangeText={value => setIdCliente(value)}
                                        value={String(id_cliente)}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(id_cliente_edit)}/>
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
                                defaultValue={nombre_cliente}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder} >
                                <Text style={styles.textBoxLabel}>Domicilio</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Calle, Numero, Colonia'
                                onChangeText={value => setDomCliente(value)}
                                defaultValue={dom_cliente}/>
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
                                defaultValue={tel_cliente}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Ruta</Text>
                                    {
                                        ruta_edit === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={lista_rutas}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={ruta}
                                        onChange={item => {setRuta(item.value); get_grupos(item.value)}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(ruta_edit)}/>
                                    }
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Grupo</Text>
                                    {
                                        grupo_edit === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={lista_grupos}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={grupo}
                                        onChange={item => {setGrupo(item.value);}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(grupo_edit)}/>
                                    }
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Tipo de Cliente</Text>
                                    {
                                        tipo_cliente_edit === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={client_type_list}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Normal'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={tipo_cliente}
                                        onChange={item => {setTipoCliente(item.value);}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(tipo_cliente_edit)}/>
                                    }
                        </View>
                    </View>
                <View style={styles.spacer20}></View>
                {
                    load_flag === 0 &&
                    <View style={styles.formRow}>
                    <TouchableOpacity onPress={() => registerCliente(
                        id_cliente,
                        nombre_cliente,
                        dom_cliente,
                        tel_cliente,
                        grupo,
                        tipo_cliente
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