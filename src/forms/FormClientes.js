import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ToastAndroid, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"
import ServicePrestamos from '../services/ServicePrestamos';

const FormClientes = ({navigation}) => {
    let service = new ServicePrestamos()
    function backMainScreen() {
        navigation.goBack()
    }
    const [top_label, setTopLabel] = useState('')
    const [button_label, setButtonLabel] = useState('')
    const [id_cliente, setIdCliente] = useState(0)
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [dom_cliente,         setDomCliente] = useState('');
    const [tel_cliente,         setTelCliente] = useState('');
    const [tipo_cliente,        setTipoCliente] = useState('');
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    const [editable, setEditable] = useState(true)
    const client_type_list = [{label:"Normal",value:"1"}]
    const route = useRoute()
    let client_type = "Cliente"

    useEffect(() => {
        if(route.params?.type == 1){
            client_type = "Aval"
        }else{
            client_type = "Cliente"
        }
        console.log(route.params?.label)
        if(route.params?.label){
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            get_detalle_prestamo(route.params?.id)

        }else{
            console.log("ASDA")
            setEditable(true)
            setTopLabel("Nuevo Prestamo")
            setButtonLabel("Registrar Prestamo")
            get_rutas()
            get_siguiente_id()
        }
    }, [get_detalle_prestamo, route.params?.type, setEditable, editable]);

    const get_rutas = useCallback(async () => {
        const data = await service.get_rutas()
        let temp_rutas = []
        for(let i = 0; i < data.length ; i++){
            temp_rutas.push({"label":data[i].ruta,"value":data[i].id_ruta})
        }
        setListaRutas(temp_rutas)
    }, [])
    const get_grupos = useCallback(async (id_ruta) => {
        const data = await service.get_grupos(id=id_ruta)
        let temp_grupos = []
        for(let i = 0; i < data.length ; i++){
            temp_grupos.push({"label":data[i].nom_grupo,"value":Number(data[i].id_grupo)})
        }
        setListaGrupos(temp_grupos)
    }, [])

    const get_siguiente_id = useCallback(async () => {
        const data = await service.get_siguiente_id()
        setIdCliente(String(data.next_id))
    }, [])

    const get_detalle_prestamo = useCallback(async (id) => {
        const data = await service.get_detalle_prestamo(id=id)
        setLoading(0)
        setIdPrestamo(String(data.id_prestamo))
        setNombreCliente(String(data.cliente.nombre))
        setDomCliente(String(data.cliente.domicilio))
        setTelCliente(String(data.cliente.telefono))
        setNombreAval(String(data.aval.nombre))
        setDomAval(String(data.aval.domicilio))
        setTelAval(String(data.aval.telefono))
        setImportePrestamo(String(data.prestamo.importe))
        setPlazoPrestamo(String(data.prestamo.plazo))
        setPagarePrestamo(String(data.prestamo.pagare))
        if(data.prestamo.gps_coords_lat != null && data.prestamo.gps_coords_lon != null)
        {
            setCoords({
                latitude:data.prestamo.gps_coords_lat,
                longitude:data.prestamo.gps_coords_lon
            })
        }else{
            setCoords('0')
        }

        setFotoDom(String(data.prestamo.foto_domicilio))
        setFotoIne(String(data.prestamo.foto_ine))
        setFotoGarantia(String(data.prestamo.foto_garantia))
        setInteresPrestamo(String(data.prestamo.interes))
        setSeguroPrestamo(String(data.prestamo.seguro))
        setAbonoPrestamo(String(data.prestamo.abono))
        setTotalPrestamo(String(data.prestamo.total))
        const year = String(data.prestamo.fecha).substring(0,4)
        const month = String(data.prestamo.fecha).substring(5,7)
        const day = String(data.prestamo.fecha).substring(8,10)
        setVisible(false)
        setFechaPrestamo(month+"/"+day+"/"+year)
        await get_rutas()
        await get_grupos(data.ruta.id_ruta)
        await setRutaText(data.ruta.ruta)
        await setGrupoText(data.grupo.grupo)
        await setEstatusPrestamoText(data.prestamo.estatus)
        let temp_abonos = []
        for(let i = 0; i < data.abonos.length ; i++){
            temp_abonos.push([data.abonos[i].id_abono,
                            data.abonos[i].abono,
                            data.abonos[i].fecha])
        }
        await setListaAbonos(temp_abonos)
    }, [])

    const registerCliente = () => {
        
    }

    return (
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
                    <Text style={styles.mainHeadersInverted}>Nuevo {client_type}</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Datos del {client_type}</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.spacer10}></View>
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
                                <Dropdown style={styles.comboBox}
                                data={lista_rutas} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={ruta}
                                onChange={item => {setRuta(item.value); get_grupos(item.value)}}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Grupo</Text>
                                <Dropdown style={styles.comboBox}
                                data={lista_grupos} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={grupo}
                                onChange={item => {setGrupo(item.value);}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Tipo de Cliente</Text>
                                <Dropdown style={styles.comboBox}
                                data={client_type_list}
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. Normal'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={tipo_cliente}
                                onChange={item => {setTipoCliente(item.value);}}/>
                    </View>
                </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <TouchableOpacity onPress={registerCliente}
                    style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Registrar Cliente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.spacer20}></View>
        </ScrollView>
    )
}

export default FormClientes;