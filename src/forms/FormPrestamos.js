import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, ToastAndroid, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { styles } from '../../Style';
import React, { useEffect, useState, useCallback } from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { useRoute } from "@react-navigation/native"
import ServicePrestamos from '../services/ServicePrestamos';
import ServiceClientes from '../services/ServiceClientes';
import CurrencyInput from 'react-native-currency-input';
import {Dimensions} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useHeaderHeight } from '@react-navigation/elements';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import * as FileSystem from 'expo-file-system';

const FormPrestamos = ({navigation}) => {
    let service = new ServicePrestamos()
    let serviceClientes= new ServiceClientes()
    const headerHeight = useHeaderHeight();
    const [editable, setEditable] = useState(true)
    const [coords, setCoords] = useState(null)
    const [visible,             setVisible] = useState(true)
    const [id_prestamo,         setIdPrestamo] = useState('');
    const [ruta,                setRuta] = useState(null);
    const [grupo,               setGrupo] = useState(null);
    const [ruta_text,                setRutaText] = useState('');
    const [grupo_text,               setGrupoText] = useState('');
    const [id_cliente, setIdCliente] = useState('')
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [dom_cliente,         setDomCliente] = useState('');
    const [tel_cliente,         setTelCliente] = useState('');
    const [id_aval, setIdAval] = useState('')
    const [nombre_aval,         setNombreAval] = useState('');
    const [dom_aval,            setDomAval] = useState('');
    const [tel_aval,            setTelAval] = useState('');
    const [importe_prestamo,    setImportePrestamo] = useState('');
    const [plazo_prestamo,      setPlazoPrestamo] = useState('');
    const [pagare_prestamo,     setPagarePrestamo] = useState('');
    const [fecha_prestamo,      setFechaPrestamo] = useState('DD/MM/YYYY');
    const [estatus_prestamo,    setEstatusPrestamo] = useState('');
    const [estatus_prestamo_text,    setEstatusPrestamoText] = useState('');
    const [foto_dom,            setFotoDom] = useState(null);
    const [foto_ine,            setFotoIne] = useState(null);
    const [foto_garantia,       setFotoGarantia] = useState(null);
    const [intereses_prestamo,  setInteresPrestamo] = useState('');
    const [seguro_prestamo,     setSeguroPrestamo] = useState('');
    const [abono_prestamo,      setAbonoPrestamo] = useState('');
    const [total_prestamo,      setTotalPrestamo] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    const [lista_clientes, setListaClientes] = useState([]);
    const [lista_avales, setListaAvales] = useState([]);
    const [lista_abonos, setListaAbonos] = useState(null);
    const [reload_aval, setReloadAval] = useState(true)
    const [loading, setLoading] = useState(0);
    const estatus_prestamo_list = [
        { label: 'Pendiente', value: '1' },
        { label: 'Finalizado', value: '2' },
        { label: 'Demorado', value: '3' },
    ];
    const [top_label, setTopLabel] = useState('')
    const [button_label, setButtonLabel] = useState('')
    const route = useRoute()
    useEffect(() => {
        if(route.params?.label){
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            get_detalle_prestamo(route.params?.id)

        }else{
            setEditable(true)
            setTopLabel("Nuevo Prestamo")
            setButtonLabel("Registrar Prestamo")
            get_rutas()
            get_siguiente_id()
        }
        if (route.params?.lat && route.params?.lon) {
            setCoords({
                latitude:route.params?.lat,
                longitude:route.params?.lon
            })
        }
        if(route.params?.type && route.params?.photo){
            (async () => {
                const base64 = await FileSystem.readAsStringAsync(route.params?.photo, { encoding: 'base64' });
                //console.log(new Blob([base64]).size * 0.000001)
                if(route.params?.type == 1){
                    setFotoIne(base64)
                }
                if(route.params?.type == 2){
                    setFotoDom(base64)   
                }
                if(route.params?.type == 3){
                    setFotoGarantia(base64)
                }
            })();
            
        }
    }, [get_detalle_prestamo, route.params?.lat, route.params?.lon, route.params?.type, route.params?.photo, setEditable, editable]);

    handleFocus = () => this.setState({isFocused: true})
    handleBlur = () => this.setState({isFocused: false})

    const registrarPrestamo = useCallback(async (new_id_prestamo,
        new_id_cliente,
        new_importe,
        new_plazo,
        new_abono,
        new_seguro,
        new_num_semana,
        new_fecha,
        new_estatus,
        new_intereses,
        new_total_pagar,
        new_saldo_pendiente,
        new_pagare,
        new_id_aval,
        new_id_ruta,
        new_foto_ine,
        new_foto_dom,
        new_foto_garantia,
        new_coords_lat,
        new_coords_lon
        ) => {
        nuevo_prestamo = {
            'id_prestamo':new_id_prestamo,
            'id_cliente':new_id_cliente,
            'importe':new_importe,
            'plazo':new_plazo,
            'abono':new_abono,
            'seguro':new_seguro,
            'num_semana':new_num_semana,
            'fecha':String(new_fecha),
            'estatus':String(new_estatus),
            'intereses':new_intereses,
            'total_pagar':new_total_pagar,
            'mora':0,
            'saldo_pendiente':new_saldo_pendiente,
            'atrasos':0,
            'importe_atrasos':0,
            'pagare':String(new_pagare),
            'id_aval':new_id_aval,
            'fecha_finalizacion':'',
            'ruta':new_id_ruta,
            'foto_ine':new_foto_ine,
            'foto_dom':new_foto_dom,
            'foto_garantia':new_foto_garantia,
            'coords_lat':new_coords_lat,
            'coords_lon':new_coords_lon
        }

        const data = await service.registrar_prestamo(nuevo_prestamo=nuevo_prestamo)
        console.log(data)
        ToastAndroid.show('Prestamo Registrado', ToastAndroid.SHORT);
        //navigation.goBack()
    },[])
    function newCliente(){
        navigation.navigate("NuevoCliente",{ type: 0 });
    }
    function newAval(){
        navigation.navigate("NuevoCliente",{ type: 1 });
    }
    function backMainScreen() {
        navigation.goBack()
    }
    function getGps(){
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setCoords(0)
                return;
            }
        })();
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            if(coords!= '0'){
                navigation.navigate("Mapa",{ lat: location.coords.latitude, lon: location.coords.longitude, editable: editable});
            }
        })();
    }
    function getINE(){
        if(editable == true){
            navigation.navigate("Camara",{ photo_type: 1 });
        }else{
            if(foto_ine == '1'){
                navigation.navigate("Preview",{ id_prestamo: id_prestamo, image_type:'ine'});
            }
        }
    }
    function getDomicilio(){
        if(editable == true){
            navigation.navigate("Camara",{ photo_type: 2 });
        }else{
            if(foto_dom == '1'){
                navigation.navigate("Preview",{ id_prestamo: id_prestamo, image_type:'dom'});
            }
        }
    }
    function getGarantia(){
        if(editable == true){
            navigation.navigate("Camara",{ photo_type: 3 });
        }else{
            if(foto_garantia == '1'){
                navigation.navigate("Preview",{ id_prestamo: id_prestamo, image_type:'garantia'});
            }
        }
    }
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        
        hideDatePicker();
        var month = String(date.getMonth() + 1)
        if(month.length==1){
            month = "0"+month
        }
        var day = String(date.getDate())
        if(day.length==1){
            day = "0"+day
        }
        setVisible(false)
        var year = date.getFullYear()
        setFechaPrestamo(month+"/"+day+"/"+year)
    };

    const update_plazo = (plazo) => {
        setPlazoPrestamo(plazo)
    }
    const calcular_prestamo = useCallback(async (importe, plazo, flag) => {
        if(importe != null && plazo != null && flag == true){
            const data = await service.calcular_prestamo(importe=importe, plazo=plazo)
            setInteresPrestamo(data.intereses)
            setSeguroPrestamo(data.seguro)
            setAbonoPrestamo(data.abono)
            setTotalPrestamo(data.total)
            return true
        }
        return false
    }, [])

    const get_clientes = useCallback(async (id_grupo, filtro) => {
        const data = await serviceClientes.get_lista_clientes(id_grupo=id_grupo, filtro=filtro)
        let temp_clientes = []
        for(let i = 0; i < data.length ; i++){
            temp_clientes.push({"id": data[i].id_cliente,"title": data[i].nom_cliente, "tel":data[i].tel_cliente, "dom": data[i].dom_cliente})
        }
        setListaClientes(temp_clientes)
    }, [])

    const clear_cliente = () => {
        setDomCliente('')
        setTelCliente('')
    }

    const clear_aval = () => {
        setDomAval('')
        setTelAval('')
    }

    const get_avales = useCallback(async (filtro) => {
        const data = await serviceClientes.get_lista_avales(filtro=filtro)
        let temp_avales = []
        for(let i = 0; i < data.length ; i++){
            temp_avales.push({"id": data[i].id_aval,"title": data[i].nom_aval, "tel":data[i].tel_aval, "dom": data[i].dom_aval})
        }
        setListaAvales(temp_avales)
    }, [])

    const select_datos_cliente = (data) => {
        if(data){
            setIdCliente(data.id)
            setDomCliente(data.dom)
            setTelCliente(data.tel)
        }
    }

    const select_datos_aval = async(data) => {
        if(data){
            let flag = await check_aval(data.id)
            if(flag == 1){
                setIdAval(data.id)
                setDomAval(data.dom)
                setTelAval(data.tel)
            }else{
                setNombreAval('')
                setReloadAval(!reload_aval)
                ToastAndroid.show('El Aval seleccionado ya es Aval en 3 prestamos activos', ToastAndroid.SHORT);
            }
        }
    }

    const unlockCliente = () => {
        if(grupo != null && ruta != null){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const unlockPrestamo = () => {
        if(nombre_cliente != "" && nombre_aval != ""){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const unlockPreview = () => {
        if(importe_prestamo != "" &&
        plazo_prestamo != "" &&
        pagare_prestamo != "" &&
        fecha_prestamo != "" &&
        estatus_prestamo != "" &&
        coords != null && 
        foto_dom != null &&
        foto_ine != null &&
        foto_garantia != null){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const check_aval = useCallback(async (id) => {
        const data = await service.check_aval(id=id)
        return data.availability
    }, [])

    const get_siguiente_id = useCallback(async () => {
        const data = await service.get_siguiente_id()
        setIdPrestamo(String(data.next_id))
    }, [])
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
    return (
        <AutocompleteDropdownContextProvider headerOffset={headerHeight} >
        <View style={styles.background}>
            <StatusBar backgroundColor='#70be44'/>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                    <Text style={styles.mainHeadersInverted}>{top_label}</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            {
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
            <ScrollView>
                {
                    lista_abonos !== null ?
                    <View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.mainHeaderContainer}>
                            <Text style={styles.mainHeaders}>Historial de Abonos</Text>
                        </View>
                        <View style={styles.horizontalLine}></View>
                        <DataTable tableData={lista_abonos}></DataTable>
                        <View style={styles.spacer30}></View>
                        <View style={styles.mainHeaderContainer}>
                            <Text style={styles.mainHeaders}>{top_label}</Text>
                        </View>
                        <View style={styles.horizontalLine}></View>
                        <View style={styles.spacer20}></View>
                    </View>
                    :
                    <View>
                        <View style={styles.spacer30}></View>
                    </View>
                }
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Prestamo</Text>
                                    <TextInput style={styles.textBox}
                                    keyboardType='numeric'
                                    placeholder='1234'
                                    onChangeText={id_prestamo => setIdPrestamo(id_prestamo)}
                                    value={id_prestamo}/>
                        </View>
                        {<Locker></Locker>}
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Ruta</Text>
                                    {
                                        ruta_text === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={lista_rutas} search
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Ruta.." placeholder='Ej. ML-1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={ruta}
                                        onChange={item => {setRuta(item.value);get_grupos(item.value);}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={ruta_text}/>
                                    }
                                    {editable == false && <Locker></Locker>}
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Grupo</Text>
                                    {
                                        grupo_text === '' ?
                                        <Dropdown style={styles.comboBox}
                                        data={lista_grupos} search
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={grupo}
                                        onChange={item => {setGrupo(item.value); console.log(item)}}/>
                                        :
                                        <TextInput style={styles.textBox}
                                        selection={{start:0, end:0}}
                                        defaultValue={grupo_text}/>
                                    }
                                    {editable == false && <Locker></Locker>}
                        </View>
                    </View>
                </View>
                <View style={styles.spacer10}></View>
                <View>
                    {
                        unlockCliente() === true ? <View></View> : <View style={styles.lockUI}></View>
                    }
                    <View style={styles.spacer10}></View>
                    <View style={styles.mainHeaderContainer}>
                        <Text style={styles.mainHeaders}>Datos del Cliente</Text>
                        {
                            editable === true &&
                            <TouchableOpacity style={styles.mainHeaderButton} onPress={newCliente}>
                                <Image style={styles.invertedBubbleImage}
                                    source={ImageIndex.add}>
                                </Image>
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.spacer10}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                            {
                                editable === true ?
                                <AutocompleteDropdown
                                style={{zIndex:100}}
                                containerStyle={[styles.textBox]}
                                inputContainerStyle={{backgroundColor:"white", marginTop:2, marginLeft:-10, borderRadius:20, width:"105%"}}
                                clearOnFocus={false}
                                closeOnBlur={true}
                                onChangeText={value => get_clientes(id_grupo=grupo, filtro=value)}
                                onClear={clear_cliente}
                                debounce={600}

                                emptyResultText={"Sin resultado"}
                                textInputProps={{
                                    placeholder: 'Nombre Apellido Apellido',
                                    placeholderTextColor:"#a9a9a9",
                                    style:{fontSize:18, marginLeft:-3},
                                }}
                                closeOnSubmit={false}
                                onSelectItem={item => {
                                    item && setNombreCliente(item); select_datos_cliente(item)}}
                                dataSet={lista_clientes}
                                />
                                :
                                <TextInput style={styles.textBox}
                                selection={{start:0, end:0}}
                                defaultValue={nombre_cliente}/>
                            }
                        </View> 
                        {editable == false && <Locker></Locker>}
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
                        {editable == false && <Locker></Locker>}
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Telefono</Text>
                                    <TextInput style={styles.textBox}
                                    keyboardType='numeric'
                                    placeholder='Ej. 6681234567'
                                    maxLength={10}
                                    onChangeText={value => setTelCliente(value)}
                                    defaultValue={tel_cliente}/>
                        </View>
                        {editable == false && <Locker></Locker>}
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.mainHeaderContainer}>
                        <Text style={styles.mainHeaders}>Datos del Aval</Text>
                        {
                            editable === true &&
                            <TouchableOpacity style={styles.mainHeaderButton} onPress={newAval}>
                                <Image style={styles.invertedBubbleImage}
                                    source={ImageIndex.add}>
                                </Image>
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.spacer10}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Nombre del Aval</Text>
                            {
                                editable === true ?
                                <AutocompleteDropdown
                                key={reload_aval}
                                style={{zIndex:100}}
                                containerStyle={[styles.textBox]}
                                inputContainerStyle={{backgroundColor:"white", marginTop:2, marginLeft:-10, borderRadius:20, width:"105%"}}
                                textInputProps={{
                                    placeholder: 'Nombre Apellido Apellido',
                                    placeholderTextColor:"#a9a9a9",
                                    style:{fontSize:18, marginLeft:-3},
                                }}
                                clearOnFocus={false}
                                closeOnBlur={true}
                                onChangeText={value => get_avales(filtro=value)}
                                onClear={clear_aval}
                                value={nombre_aval}
                                debounce={600}
                                emptyResultText={"Sin resultado"}
                                closeOnSubmit={false}
                                onSelectItem={item => {
                                    item && setNombreAval(item.title); select_datos_aval(item)}}
                                dataSet={lista_avales}
                                />
                                :
                                <TextInput style={styles.textBox}
                                selection={{start:0, end:0}}
                                defaultValue={nombre_aval}/>
                            }

                        </View>
                        {editable == false && <Locker></Locker>}
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Domicilio</Text>
                                    <TextInput style={styles.textBox}
                                    placeholder='Calle, Numero, Colonia'
                                    onChangeText={value => setDomAval(value)}
                                    defaultValue={dom_aval}/>
                        </View>
                        {editable == false && <Locker></Locker>}
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Telefono</Text>
                                    <TextInput style={styles.textBox}
                                    keyboardType='numeric'
                                    placeholder='Ej. 6681234567'
                                    maxLength={10}
                                    onChangeText={value => setTelAval(value)}
                                    defaultValue={tel_aval}/>
                        </View>
                        {editable == false && <Locker></Locker>}
                    </View>
                    <View style={styles.spacer20}></View>
                </View>
                <View>
                    {
                        unlockPrestamo() === true ? <View></View> : <View style={styles.lockUI}></View>
                    }
                    <Text style={styles.mainHeaders}>Datos del Prestamo</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.spacer10}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerTwoThird}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Importe</Text>
                                        <CurrencyInput style={styles.textBox}
                                        delimiter=","
                                        precision={0}
                                        minValue={0}
                                        maxValue={99999}
                                        prefix="$"
                                        placeholder='$0'
                                        onChangeValue={(value) => setImportePrestamo(value) && calcular_prestamo(importe=importe_prestamo, plazo=plazo_prestamo)}
                                        value={importe_prestamo}/>
                            </View>
                            {editable == false && <Locker></Locker>}
                        </View>
                        <View style={styles.textBoxContainerOneThird}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Plazo</Text>
                                        <TextInput style={styles.textBox}
                                        placeholder='Ej. 12'
                                        keyboardType='numeric'
                                        onChangeText={value => update_plazo(plazo=value)}
                                        value={plazo_prestamo}/>
                            </View>
                            {editable == false && <Locker></Locker>}
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Pagaré</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='Ej. 1234'
                                onChangeText={value => setPagarePrestamo(value)}
                                defaultValue={pagare_prestamo}/>
                            </View>
                            {editable == false && <Locker></Locker>}
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Fecha</Text>
                                <TouchableOpacity style={styles.textBox}
                                    onPress={showDatePicker}>
                                        <View style={{ display: !visible ? 'flex' : 'none', paddingTop:8 }}>
                                            <Text style={styles.date_label}>{fecha_prestamo}</Text>
                                        </View>
                                        <View style={{ display: visible ? 'flex' : 'none' , paddingTop:11  }}>
                                            <Text style={styles.comboBoxPlaceholder}>DD/MM/YYYY</Text>
                                        </View>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                            {editable == false && <Locker></Locker>}
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Estatus</Text>
                                {
                                    estatus_prestamo_text === '' ? 
                                    <Dropdown style={styles.comboBox}
                                    data={estatus_prestamo_list}
                                    labelField="label" valueField="value"
                                    placeholder='Ej. Pendiente'
                                    value={estatus_prestamo}
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.comboBoxSelected}
                                    onChange={item => {setEstatusPrestamo(item.label);}}/>
                                    :
                                    <TextInput style={styles.textBox}
                                    defaultValue={estatus_prestamo_text}/>
                                }
                            </View>
                            {editable == false && <Locker></Locker>}
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Ubicacion</Text>
                                <TouchableOpacity style={styles.textBox} onPress={getGps}>
                                    {coords === null ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#F2CC62", zIndex:10}]}
                                                source={ImageIndex.gps}>
                                            </Image>
                                            <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {coords !== null && editable === true  ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.gps}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {coords !== null && editable === false && coords !== '0' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.gps}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Ver</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {coords === '0' && editable == false ?
                                        <View style={styles.textBoxRow}>
                                        <Image style={[styles.BubbleImage,{tintColor:"red"}]}
                                            source={ImageIndex.gps}>
                                        </Image>
                                        <Text style={styles.textBoxError}>No disponible</Text>
                                    </View>
                                    :<View></View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {/* {editable == false && <Locker></Locker>} */}
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Domicilio </Text>
                                <TouchableOpacity style={styles.textBox} onPress={getDomicilio}>
                                    {foto_dom === null ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_dom !== null && foto_dom !== '1' && foto_dom !== '0' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_dom === '1' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Ver</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_dom === '0' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"red"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxError}>No disponible</Text>
                                        </View>
                                        :<View></View>
                                    }
                                </TouchableOpacity>
                                {/* {editable == false && <Locker></Locker>} */}
                            </View>
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>INE</Text>
                                <TouchableOpacity style={styles.textBox} onPress={getINE}>
                                    {foto_ine === null ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_ine !== null && foto_ine !== '1' && foto_ine !== '0' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_ine === '1' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxSuccessful}>Ver</Text>
                                        </View>
                                        :<View></View>
                                    }
                                    {foto_ine === '0' ?
                                        <View style={styles.textBoxRow}>
                                            <Image style={[styles.BubbleImage,{tintColor:"red"}]}
                                                source={ImageIndex.cam}>
                                            </Image>
                                            <Text style={styles.textBoxError}>No disponible</Text>
                                        </View>
                                        :<View></View>
                                    }
                                </TouchableOpacity>
                                {/* {editable == false && <Locker></Locker>} */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Garantia </Text>
                                    <TouchableOpacity style={styles.textBox} onPress={getGarantia}>
                                        {foto_garantia === null ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {foto_garantia !== null && foto_garantia !== '1' && foto_garantia !== '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {foto_garantia === '1' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Ver</Text>
                                            </View>
                                        :<View></View>
                                    }
                                        {foto_garantia === '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"red"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxError}>No disponible</Text>
                                            </View>
                                            :<View></View>
                                        }
                                    </TouchableOpacity>
                                {/* {editable == false && <Locker></Locker>} */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.spacer10}></View>
                </View>
                <View>
                    {
                        unlockPreview() === true ? <View>
                            {calcular_prestamo(importe=importe_prestamo, plazo=plazo_prestamo, flag=editable) === true ?
                            <View></View> : <View></View>}
                        </View> : <View style={styles.lockUI}></View>
                    }
                    <View style={styles.spacer10}></View>
                    <Text style={styles.mainHeaders}>Resumen del Prestamo</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.spacer10}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Intereses</Text>
                                        <CurrencyInput style={styles.textBox}
                                        delimiter=","
                                        precision={0}
                                        minValue={0}
                                        maxValue={9999}
                                        prefix="$"
                                        placeholder='$0'
                                        onChangeValue={(value) => setInteresPrestamo(value)}
                                        value={intereses_prestamo}/>
                            </View>
                            <Locker></Locker>
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Seguro</Text>
                                        <CurrencyInput style={styles.textBox}
                                        delimiter=","
                                        precision={0}
                                        minValue={0}
                                        maxValue={9999}
                                        prefix="$"
                                        placeholder='$0'
                                        onChangeValue={(value) => setSeguroPrestamo(value)}
                                        value={seguro_prestamo}/>
                                        
                            </View>
                            <Locker></Locker>
                        </View>
                    </View>            
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Abono</Text>
                                        <CurrencyInput style={styles.textBox}
                                        delimiter=","
                                        precision={0}
                                        minValue={0}
                                        maxValue={9999}
                                        prefix="$"
                                        placeholder='$0'
                                        onChangeValue={(value) => setAbonoPrestamo(value)}
                                        value={abono_prestamo}/>
                            </View>
                            <Locker></Locker>
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.textBoxContainerFull}>
                        <View style={styles.textBoxBorderMoney}>
                                    <Text style={styles.textBoxLabel}>Total</Text>
                                    <CurrencyInput style={styles.textBoxMoney}
                                    delimiter=","
                                    precision={0}
                                    minValue={0}
                                    maxValue={99999}
                                    prefix="$"
                                    placeholder='$0'
                                    onChangeValue={(value) => setTotalPrestamo(value)}
                                    value={total_prestamo}/>
                        </View>
                        <Locker></Locker>
                    </View>
                    {
                        editable === false &&
                        <View style={styles.spacer30}></View>
                    }
                    <View style={styles.spacer20}></View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        {
                            editable === false ? <View></View> 
                            :
                            <TouchableOpacity onPress={() => registrarPrestamo(
                                new_id_prestamo=id_prestamo,
                                new_id_cliente=id_cliente,
                                new_importe=importe_prestamo,
                                new_plazo=plazo_prestamo,
                                new_abono=abono_prestamo,
                                new_seguro=seguro_prestamo,
                                new_num_semana=0,
                                new_fecha=fecha_prestamo,
                                new_estatus=estatus_prestamo,
                                new_intereses=intereses_prestamo,
                                new_total_pagar=total_prestamo,
                                new_saldo_pendiente=total_prestamo,
                                new_pagare=pagare_prestamo,
                                new_id_aval=id_aval,
                                new_id_ruta=ruta,
                                new_foto_ine=foto_ine,
                                new_foto_dom=foto_dom,
                                new_foto_garantia=foto_garantia,
                                new_coords_lat=coords.latitude,
                                new_coords_lon=coords.longitude
                            )}
                                style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>{button_label}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.spacer20}></View>
                </View>
            </ScrollView>
        </View>
        </AutocompleteDropdownContextProvider>
    )
}

function Locker(){
    return(
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
        }}>
        </View>
    )
}

function DataTable({tableData}) {

    return (
        <View style={{marginLeft:20, marginEnd:20}}>
            <View style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                <Text style={[styles.cell,{fontWeight:"bold", width:50}]}>ID</Text>
                <View>
                    <Text style={[styles.cell,{fontWeight:"bold", width:100}]}>Abono</Text>
                </View>
                <View>
                    <Text style={[styles.cell,{fontWeight:"bold", width:100}]}>Fecha</Text>
                </View>
            </View>
            {
                tableData.length !== 0 ?
                <View>
                    {
                        tableData.map((data,i) => (
                        i % 2 === 0 ?
                        <TouchableOpacity key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}>
                            <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>${data[1]}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>{data[2]}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                            <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>${data[1]}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>{data[2]}</Text>
                            </View>
                        </TouchableOpacity>

                        ))
                    }
                </View>
                :
                <View>
                    <TouchableOpacity style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                        <View>
                            <Text style={[styles.cell,{ width:300}]}>Aun no hay abonos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}


export default FormPrestamos