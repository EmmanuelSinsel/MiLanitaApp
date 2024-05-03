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

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const FormAvales = ({navigation}) => {
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
    const [cancel, setCancel] = useState('')
    const [id_aval, setIdAval] = useState(0)
    const [id_aval_edit, setIdAvalEdit] = useState('')
    const [nombre_aval,      setNombreAval] = useState('');
    const [dom_aval,         setDomAval] = useState('');
    const [tel_aval,         setTelAval] = useState('');
    const [editable, setEditable] = useState(true)
    const [loading, setLoading] = useState(0);
    const [load_flag, setLoadFlag] = useState(0)
    const route = useRoute()
    let client_type = "Cliente"
    const [id_cliente, setIdCliente] = useState("")
    useEffect(() => {
        const backAction = () => {
            if(route.params?.label){
                return false;
            }else{
                setCancel(1)
                return true;
            }
        };
        if(route.params?.id_cliente){
            setIdCliente(route.params?.id_cliente)
        }
        const backHandlerClientes = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        get_siguiente_id()
        
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [get_detalle_cliente, route.params?.type, setEditable, editable, ]);


    const get_siguiente_id = useCallback(async () => {
        const data = await serviceClientes.get_siguiente_id_aval(route.params?.id_cliente)
        setIdAval(data.next_id)
    }, [])

    const eliminar_preregistro = useCallback(async (id_aval) => {
        const response = await serviceClientes.eliminar_preregistro_aval(id_aval)
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

    const registerAval = async (
        new_id_aval,
        new_id_cliente,
        new_nom_aval,
        new_dom_aval,
        new_tel_aval) => {
        nuevo_aval = {
            "id_aval":new_id_aval,
            "id_cliente":new_id_cliente,
            "nombre_aval":new_nom_aval,
            "domicilio_aval":new_dom_aval,
            "telefono_aval":new_tel_aval
        }
        if(new_tel_aval.length == 10){
            const data = await serviceClientes.registrar_aval(nuevo_aval)
            let toast = Toast.show('Aval Registrado', {
                duration: Toast.durations.SHORT,
            });
            // let aval_data = {
            //     id: new_id_aval,
            //     title: new_nom_aval,
            //     dom: new_dom_aval,
            //     tel: new_tel_aval
            // }
            //route.params?.update_aval(aval_data)
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
                                onPress={() => {eliminar_preregistro(id_aval); navigation.goBack()}}>
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
                            <Text style={styles.mainHeadersInverted}>{top_label}</Text>
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
                                        id_aval_edit === '' ?
                                        <TextInput style={styles.textBox}
                                        onChangeText={value => setIdAval(value)}
                                        value={String(id_aval)}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={String(id_aval_edit)}/>
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
                                defaultValue={nombre_aval}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder} >
                                <Text style={styles.textBoxLabel}>Domicilio del Aval</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Calle, Numero, Colonia'
                                onChangeText={value => setDomAval(value)}
                                defaultValue={dom_aval}/>
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
                                defaultValue={tel_aval}/>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                {
                    load_flag === 0 &&
                    <View style={styles.formRow}>
                    <TouchableOpacity onPress={() => registerAval(
                            id_aval,
                            id_cliente,
                            nombre_aval,
                            dom_aval,
                            tel_aval,
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