import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, Image, BackHandler, Platform} from 'react-native';
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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-root-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import { XCircle } from 'react-native-feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locker, LockerGray } from '../Utils';

const FormPrestamos = ({navigation}) => {
    let service = new ServicePrestamos()
    let serviceClientes= new ServiceClientes()
    const [cancel, setCancel] = useState('')
    const [editable, setEditable] = useState(true)
    const [coords, setCoords] = useState(null)
    const [visible,             setVisible] = useState(true)
    const [idPrestamo,         setIdPrestamo] = useState('');
    const [ruta,                setRuta] = useState(null);
    const [grupo,               setGrupo] = useState(null);
    const [rutaNoEditable,                setRutaText] = useState('');
    const [grupoNoEditable,               setGrupoText] = useState('');
    const [idCliente, setIdCliente] = useState('')
    const [nombreCliente,      setNombreCliente] = useState('');
    const [domicilioCliente,         setDomCliente] = useState('');
    const [telefonoCliente,         setTelCliente] = useState('');
    const [idAval, setIdAval] = useState('')
    const [nombreAval,         setNombreAval] = useState('');
    const [domicilioAval,            setDomAval] = useState('');
    const [telefonoAval,            setTelAval] = useState('');
    const [importe_prestamo,    setImportePrestamo] = useState('');
    const [plazoPrestamo,      setPlazoPrestamo] = useState('');
    const [pagarePrestamo,     setPagarePrestamo] = useState('');
    const [fechaPrestamo,      setFechaPrestamo] = useState('DD/MM/YYYY');
    const [estatusPrestamo,    setEstatusPrestamo] = useState('Pendiente');
    const [estatusPrestamoNoEditable,    setEstatusPrestamoText] = useState('');
    const [fotoDomicilio,            setFotoDom] = useState(null);
    const [fotoINE,            setFotoIne] = useState(null);
    const [fotoGarantia,       setFotoGarantia] = useState(null);
    const [interesesPrestamo,  setInteresPrestamo] = useState('');
    const [seguroPrestamo,     setSeguroPrestamo] = useState('');
    const [abonoPrestamo,      setAbonoPrestamo] = useState('');
    const [totalPrestamo,      setTotalPrestamo] = useState('');
    const [renovacionPrestamo,  setRenovacionPrestamo] = useState(0);
    const [listaRutas, setListaRutas] = useState([]);
    const [listaGrupos, setListaGrupos] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [lista_avales, setListaAvales] = useState([]);
    const [listaAbonos, setListaAbonos] = useState(null);
    const [reload_aval, setReloadAval] = useState(true)
    const [clientesHeight, setClientesHeight] = useState(0)
    const [clientesFocus, setClientesFocus] = useState(false)
    const [avalesHeight, setAvalesHeight] = useState(0)
    const [avalesFocus, setAvalesFocus] = useState(false)
    const [openRutas, setOpenRutas] = useState(false)
    const [loading, setLoading] = useState(0);
    const [preselectedAval, setPreselectedAval] = useState(0)
    const estatusPrestamoList = [
        { label: 'Pendiente', value: '1' },
        { label: 'Finalizado', value: '2' },
        { label: 'Demorado', value: '3' },
    ];
    const cantidadesPrestamo = [
        { label: "$3000", value: 3000 },
        { label: "$3500", value: 3500 },
        { label: "$4000", value: 4000 },
        { label: "$4500", value: 4500 },
        { label: "$5000", value: 5000 }
    ]
    const cantidadesPrestamo8 = [
        { label: "$10000", value: 10000 },
        { label: "$15000", value: 15000 },
        { label: "$20000", value: 20000 },
        { label: "$25000", value: 25000 },
        { label: "$30000", value: 30000 },
        { label: "$40000", value: 40000 },
        { label: "$50000", value: 50000 },
    ]
    const plazos = [
        { label: "12", value: 12 },
        { label: "14", value: 14 },
        { label: "16", value: 16 },
    ]
    const [topLabel, setTopLabel] = useState('')
    const [buttonLabel, setButtonLabel] = useState('')
    const route = useRoute()
    useEffect(() => {
        const backAction = () => {
            if(route.params?.label){
                return false;
            }else{
                setCancel(1)
                return true;
            }
        }
        const backHandlerPrestamos = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        if(route.params?.label){
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            getDetallePrestamo(route.params?.id)
        }else{
            setEditable(true)
            setTopLabel("Nuevo Prestamo")
            setButtonLabel("Registrar Prestamo")
            const getPermissions = async () => {
                let tempRutas = await getRutas()
                const rol = await AsyncStorage.getItem('nombreRol');
                console.log(rol)
                if(rol != "ADMINISTRADOR"){
                    const rutaEmpleado = await AsyncStorage.getItem('idRuta');
                    console.log(rutaEmpleado)
                    setRuta(String(rutaEmpleado))
                    getGrupos(Number(rutaEmpleado))
                    for(let r = 0 ; r < tempRutas.length ; r++){
                        if(tempRutas[r].value == rutaEmpleado){
                            console.log(tempRutas[r])
                            setRutaText(String(tempRutas[r].label))
                            break;
                        }
                    }
                    
                }
            }
            getPermissions()
            if(route.params?.idPrestamoReturn){
                setIdPrestamo(route.params?.idPrestamoReturn)
            }else{
                getSiguienteId()
            }
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
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [ route.params?.lat, route.params?.lon, route.params?.type, route.params?.photo, setEditable, editable]);;
    handleFocus = () => this.setState({isFocused: true})
    handleBlur = () => this.setState({isFocused: false})
    const registrarPrestamo = useCallback(async (
        newIdPrestamo,
        newIdCliente,
        newImporte,
        newPlazo,
        newAbono,
        newSeguro,
        newNumSemana,
        newFecha,
        newEstatus,
        newIntereses,
        newTotalPagar,
        newSaldoPendiente,
        newPagare,
        newIdAval,
        newIdRuta,
        newFotoINE,
        newFotoDomicilio,
        newFotoGarantia,
        newCoordsLat,
        newCoordsLon,
        newRenovacion
        ) => {
        nuevoPrestamo = {
            'id_prestamo':newIdPrestamo,
            'id_cliente':newIdCliente,
            'importe':newImporte,
            'plazo':newPlazo,
            'abono':newAbono,
            'seguro':newSeguro,
            'num_semana':newNumSemana,
            'fecha':String(newFecha),
            'estatus':String(newEstatus),
            'intereses':newIntereses,
            'total_pagar':newTotalPagar,
            'mora':0,
            'saldo_pendiente':newSaldoPendiente,
            'atrasos':0,
            'importe_atrasos':0,
            'pagare':String(newPagare),
            'id_aval':newIdAval,
            'fecha_finalizacion':'',
            'ruta':newIdRuta,
            'foto_ine':newFotoINE,
            'foto_dom':newFotoDomicilio,
            'foto_garantia':newFotoGarantia,
            'coords_lat':newCoordsLat,
            'coords_lon':newCoordsLon,
            'renovacion':newRenovacion
        }
        setLoading(1)
        const data = await service.registrarPrestamo(nuevoPrestamo)
        setLoading(0)
        let toast = Toast.show('Prestamo Registrado', {
            duration: Toast.durations.SHORT,
        });
        if(data.status == 1){
            navigation.goBack()
        }
    },[])
    function newCliente(){
        navigation.navigate("FormClientes",{ type: 0 });
    }
    function newAval(){
        console.log(idCliente)
        navigation.navigate("FormAvales",{ idCliente: idCliente, updateAval: selectDatosAval });
    }
    function backMainScreen() {
        if(editable == true){
            setCancel(1)
        }else{
            navigation.goBack()
        }
    }
    function getGps(){
        if(coords!= '0'){
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
                    navigation.navigate("Mapa",{ 
                        lat: location.coords.latitude, 
                        lon: location.coords.longitude, 
                        editable: editable, 
                        idPrestamo: idPrestamo,
                        label: "Prestamo #"+idPrestamo+" - "+nombreCliente});
                }
            })();
        }
    }
    function getINE(){
        if(editable == true){
            navigation.navigate("Camara",{ photoType: 1, idPrestamo: idPrestamo, });
        }else{
            if(fotoINE == '1'){
                navigation.navigate("Preview",{ idPrestamo: idPrestamo, imageType:'ine'});
            }
        }
    }
    function getDomicilio(){
        if(editable == true){
            navigation.navigate("Camara",{ photoType: 2 , idPrestamo: idPrestamo,});
        }else{
            if(fotoDomicilio == '1'){
                navigation.navigate("Preview",{ idPrestamo: idPrestamo, imageType:'dom'});
            }
        }
    }
    function getGarantia(){
        if(editable == true){
            navigation.navigate("Camara",{ photoType: 3, idPrestamo: idPrestamo, });
        }else{
            if(fotoGarantia == '1'){
                navigation.navigate("Preview",{ idPrestamo: idPrestamo, imageType:'garantia'});
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
    const calcularPrestamo = useCallback(async (importe, plazo, flag, id_cliente) => {
        console.log(id_cliente)
        if(importe != null && plazo != null && flag == true){
            const res = await service.calcularPrestamo(importe, plazo, id_cliente)
            const data = res.data
            setInteresPrestamo(data.intereses)
            setSeguroPrestamo(data.seguro)
            setAbonoPrestamo(data.abono)
            setTotalPrestamo(data.total)
            setRenovacionPrestamo(data.renovacion)
            console.log(data.renovacion)
            return true
        }
        return false
    }, [])

    const getClientes = useCallback(async (idGrupo, filtro) => {
        const res = await serviceClientes.getListaClientes(1, 100, idGrupo, filtro)
        const data = res.data
        const clientes = data.clientes
        let tempClientes = []
        for(let i = 0; i < clientes.length ; i++){
            tempClientes.push({"id": clientes[i].idCliente,
                                "title": clientes[i].nombreCliente, 
                                "tel":clientes[i].telefonoCliente, 
                                "dom": clientes[i].domicilioCliente})
        }
        if(clientes.length > 6){
            setClientesHeight(6*45)
        }else{
            setClientesHeight(clientes.length*45)
        }
        setListaClientes(tempClientes)
    }, [])

    const clear_cliente = () => {
        setNombreCliente('')
        setDomCliente('')
        setTelCliente('')
    }

    const clear_aval = () => {
        setNombreAval('')
        setDomAval('')
        setTelAval('')
    }

    const get_avales = useCallback(async (id, filtro) => {
        const res = await serviceClientes.get_lista_avales(filtro)
        const data = res.data
        let temp_avales = []
        for(let i = 0; i < data.length ; i++){
            temp_avales.push({"id": data[i].idAval,
            "title": data[i].nombreAval, 
            "tel":data[i].telefonoAval, 
            "dom": data[i].domicilioAval})
        }
        if(data.length > 6){
            setAvalesHeight(6*45)
        }else{
            setAvalesHeight(data.length*45)
        }
        setListaAvales(temp_avales)
    }, [])

    const selectDatosCliente = (data) => {
        if(data){
            console.log(data)
            setIdCliente(data.id)
            setNombreCliente(data.title)
            setDomCliente(data.dom)
            setTelCliente(data.tel)
        }
    }

    const selectDatosAval = async(data, id_cliente) => {
        if(data){
            let flag = await checkAval(data.id, id_cliente)
            if(flag == 1){
                setIdAval(data.id)
                setNombreAval(data.title)
                setDomAval(data.dom)
                setTelAval(data.tel)
            }if(flag == 0){
                setNombreAval('')
                setReloadAval(!reload_aval)
                let toast = Toast.show('El Aval seleccionado ya es Aval en 3 prestamos activos', {
                    duration: Toast.durations.SHORT,
                });
            }if(flag == 2){
                setNombreAval('')
                setReloadAval(!reload_aval)
                let toast = Toast.show('El Aval y el Cliente se encuentran en prestamo cruzado!', {
                    duration: Toast.durations.SHORT,
                });
            }
        }
    }

    const getLastAval = async(data) => {
        if(data){
            const res = await serviceClientes.getLastAval(data.id)
            console.log(res)
            selectDatosAval({id:res.aval.id_aval,
                title:res.aval.nombre_aval,
                dom:res.aval.domicilio_aval,
                tel:res.aval.telefono_aval})
            setPreselectedAval(1)
        }
    }

    const clearPreselectedAval = () => {
        setPreselectedAval(0)
        setReloadAval(!reload_aval)
        setNombreAval('')
        setDomAval('')
        setTelAval('')
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

    const unlockAval = () => {
        if(nombreCliente != ""){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const unlockPrestamo = () => {
        if(nombreCliente != "" && nombreAval != ""){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const unlockPreview = () => {
        if(importe_prestamo != "" &&
        plazoPrestamo != "" &&
        pagarePrestamo != "" &&
        fechaPrestamo != "" &&
        estatusPrestamo != "" &&
        coords != null && 
        fotoDomicilio != null &&
        fotoINE != null &&
        fotoGarantia != null){
            return true
        }else if(editable==false){
            return true
        }else{
            return false
        }
    }

    const checkAval = useCallback(async (id_aval, id_cliente) => {
        const res = await service.checkAval(id_aval, id_cliente)
        return res.status
    }, [])

    const getSiguienteId = useCallback(async () => {
        const data = await service.getSiguienteId()
        setIdPrestamo(String(data.nextId))
    }, [])

    const eliminarPreregistro = useCallback(async (idPrestamo) => {
        const res = await service.eliminarPreregistro(idPrestamo)
    }, [])

    const getRutas = useCallback(async () => {
        const res = await service.getRutas()
        const data = res.data
        let tempRutas = []
        for(let i = 0; i < data.length ; i++){
            tempRutas.push({"label":data[i].ruta,"value":data[i].idRuta})
        }
        setListaRutas(tempRutas)
        return tempRutas
    }, [])
    const getGrupos = useCallback(async (idRuta) => {
        setGrupo(null)
        const res = await service.getGrupos(idRuta)
        const data = res.data
        let tempGrupos = []
        for(let i = 0; i < data.length ; i++){
            tempGrupos.push({"label":data[i].nomGrupo,"value":Number(data[i].idGrupo)})
        }
        setListaGrupos(tempGrupos)
        if(idRuta == 8){
            setPlazoPrestamo(14)
        }
    }, [])
    const getDetallePrestamo = useCallback(async (id) => {
        const res = await service.getDetallePrestamo(id)
        const data = res.data
        setLoading(0)
        setIdPrestamo(String(data.idPrestamo))
        setNombreCliente(String(data.cliente.nombre))
        setDomCliente(String(data.cliente.domicilio))
        setTelCliente(String(data.cliente.telefono))
        setNombreAval(String(data.aval.nombre))
        setDomAval(String(data.aval.domicilio))
        setTelAval(String(data.aval.telefono))
        setImportePrestamo(String(data.prestamo.importe))
        setPlazoPrestamo(String(data.prestamo.plazo))
        setPagarePrestamo(String(data.prestamo.pagare))
        if(data.prestamo.gpsCoordsLat != null && data.prestamo.gpsCoordsLon != null)
        {
            setCoords({
                latitude:data.prestamo.gpsCoordsLat,
                longitude:data.prestamo.gpsCoordsLon
            })
        }else{
            setCoords('0')
        }

        setFotoDom(String(data.prestamo.fotoDomicilio))
        setFotoIne(String(data.prestamo.fotoINE))
        setFotoGarantia(String(data.prestamo.fotoGarantia))
        setInteresPrestamo(String(data.prestamo.interes))
        setSeguroPrestamo(String(data.prestamo.seguro))
        setAbonoPrestamo(String(data.prestamo.abono))
        setTotalPrestamo(String(data.prestamo.total))
        const year = String(data.prestamo.fecha).substring(0,4)
        const month = String(data.prestamo.fecha).substring(5,7)
        const day = String(data.prestamo.fecha).substring(8,10)
        setVisible(false)
        setFechaPrestamo(month+"/"+day+"/"+year)
        await setRutaText(data.ruta.ruta)
        await setRuta(data.ruta.ruta)
        await setGrupoText(data.grupo.grupo)
        await setEstatusPrestamoText(data.prestamo.estatus)
        let tempAbonos = []
        for(let i = 0; i < data.abonos.length ; i++){
            tempAbonos.push([data.abonos[i].id_abono,
                            data.abonos[i].abono,
                            data.abonos[i].fecha])
        }
        await setListaAbonos(tempAbonos)
    }, [])
    return (
        <View style={styles.background}>
            <StatusBar backgroundColor='#70be44'/>
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
                                onPress={() => {eliminarPreregistro(idPrestamo);                
                                    navigation.goBack()}}>
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
            <View>
                <View style={styles.mainTopBar}>
                    <View style={styles.spacer30}></View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.topBarContainer}>
                        <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                                <Image style={styles.invertedImageTopBar}
                                    source={ImageIndex.back}>
                                </Image>
                        </TouchableOpacity>
                        <Text style={styles.mainHeadersInverted}>{topLabel}</Text>
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
                <KeyboardAwareScrollView>
                    {
                        listaAbonos !== null ?
                        <View>
                            <View style={styles.spacer20}></View>
                            <View style={styles.mainHeaderContainer}>
                                <Text style={styles.mainHeaders}>Historial de Abonos</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <DataTable tableData={listaAbonos}></DataTable>
                            <View style={styles.spacer30}></View>
                            <View style={styles.mainHeaderContainer}>
                                <Text style={styles.mainHeaders}>{topLabel}</Text>
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
                                        onChangeText={idPrestamo => setIdPrestamo(idPrestamo)}
                                        value={idPrestamo}/>
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
                                            rutaNoEditable === '' ?
                                            <Dropdown style={styles.comboBox}
                                            data={listaRutas}
                                            labelField="label" valueField="value"
                                            searchPlaceholder="Ruta.." placeholder='Ej. ML-1'
                                            placeholderStyle={styles.comboBoxPlaceholder}
                                            selectedTextStyle={styles.comboBoxSelected}
                                            value={ruta}
                                            onChange={item => {setRuta(item.value);getGrupos(item.value);}}/>
                                            :
                                            <View>
                                                <TextInput style={styles.textBox}
                                                selection={{start:0, end:0}}
                                                value={rutaNoEditable}/>
                                                <Locker></Locker>
                                            </View>
                                        }
                                        {editable == false && <Locker></Locker>}
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
                                            onChange={item => {setGrupo(item.value); getClientes(item.value, ''); get_avales(item.value, '')}}/>
                                            :
                                            <TextInput style={styles.textBox}
                                            selection={{start:0, end:0}}
                                            value={grupoNoEditable}/>
                                        }
                                        {
                                            ruta === null  && <LockerInput></LockerInput>
                                        }

                                        {editable === false && <Locker></Locker>}
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
                        <View style={[styles.textBoxContainerFull]}>
                            <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                                {
                                    editable === true ?
                                    <AutocompleteDropdown
                                    style={{zIndex:100}}
                                    containerStyle={[styles.textBox]}
                                    inputContainerStyle={{backgroundColor:"white", marginTop:2, marginLeft:-10, borderRadius:20, width:"105%"}}
                                    clearOnFocus={false}
                                    onChangeText={value => getClientes(idGrupo=grupo, filtro=value)}
                                    onClear={clear_cliente}
                                    debounce={600}
                                    value={nombreCliente}
                                    emptyResultText={"Sin resultado"}
                                    textInputProps={{
                                        placeholder: 'Nombre Apellido Apellido',
                                        placeholderTextColor:"#a9a9a9",
                                        style:{fontSize:18, marginLeft:-3},
                                    }}
                                    closeOnSubmit={false}
                                    onSelectItem={item => {
                                        item && setNombreCliente(item);  
                                        selectDatosCliente(item); 
                                        getLastAval(item);}}
                                    dataSet={listaClientes}
                                    />
                                    :
                                    <TextInput style={styles.textBox}
                                    selection={{start:0, end:0}}
                                    value={nombreCliente}/>
                                }
                            </View> 
                            {editable == false && <Locker></Locker>}
                        </View>
                        {
                            clientesFocus === true &&
                            <View>
                                {
                                    Platform.OS === 'ios' &&
                                    <View style={{height:300}}></View>
                                }
                            </View>
                        }
                        <View style={styles.spacer20}></View>
                        <View style={styles.textBoxContainerFull}>
                            <View style={styles.textBoxBorder} >
                                <Text style={styles.textBoxLabel}>Domicilio</Text>
                                <TextInput style={styles.textBox}
                                placeholder='Calle, Numero, Colonia'
                                onChangeText={value => setDomCliente(value)}
                                value={domicilioCliente}/>
                            </View>
                            <Locker></Locker>
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
                                        value={telefonoCliente}/>
                            </View>
                            <Locker></Locker>
                            {editable == false && <Locker></Locker>}
                        </View>
                        <View style={styles.spacer10}></View>
                    </View>
                    <View>
                        {
                            unlockAval() === true ? <View></View> : <View style={styles.lockUI}></View>
                        }
                        <View style={styles.spacer10}></View>
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
                                    <View>
                                        {
                                            preselectedAval === 0 ?
                                            <AutocompleteDropdown
                                            key={reload_aval}
                                            style={{zIndex:100}}
                                            containerStyle={[styles.textBox,{ marginBottom:0, marginTop:0}]}
                                            inputContainerStyle={{backgroundColor:"white", marginTop:2, marginLeft:-10, borderRadius:20, width:"105%"}}
                                            textInputProps={{
                                                placeholder: 'Nombre Apellido Apellido',
                                                placeholderTextColor:"#a9a9a9",
                                                style:{fontSize:18, marginLeft:-3},
                                            }}
                                            clearOnFocus={false}
                                            onChangeText={value => get_avales(1, filtro=value)}
                                            onClear={clear_aval}
                                            value={nombreAval}
                                            debounce={600}
                                            emptyResultText={"Sin resultado"}
                                            closeOnSubmit={false}
                                            onSelectItem={item => {
                                                item && setNombreAval(item.title); selectDatosAval(item, idCliente)}}
                                            dataSet={lista_avales}
                                            />
                                            :
                                            <View style={[styles.textBoxRow, {width:"100%"}]}>
                                                <Text style={[styles.textBox,{textAlignVertical:"center"}]}>{nombreAval}</Text>
                                                <TouchableOpacity onPress={() => clearPreselectedAval()}>
                                                    <XCircle width={18} stroke="#aeb4c6" style={{marginLeft:-30}} />
                                                </TouchableOpacity>
                                            </View>
                                            
                                        }
                                    </View>
                                    :
                                    <TextInput style={[styles.textBox, {zIndex:100}]}
                                    selection={{start:0, end:0}}
                                    value={nombreAval}/>
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
                                        value={domicilioAval}/>
                            </View>
                            <Locker></Locker>
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
                                        value={telefonoAval}/>
                            </View>
                            <Locker></Locker>
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
                        <View style={styles.textBoxContainerOneThird}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Plazo</Text>
                                {
                                    editable === true ?
                                    <View>
                                    {
                                        ruta === 8 ?
                                        <Text style={styles.comboBox}>{plazoPrestamo}</Text>
                                        :
                                        <Dropdown style={styles.comboBox}
                                        data={plazos}
                                        labelField="label" valueField="value"
                                        placeholder='Plazo'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={plazoPrestamo}
                                        onChange={value => {update_plazo(plazo=value.value); calcularPrestamo(importe_prestamo, value.value, editable, idCliente)}}/>
                                    }
                                    </View>
                                    :
                                    <TextInput style={styles.textBox}
                                    value={plazoPrestamo}/>
                                }

                                </View>
                                {editable == false && <Locker></Locker>}
                            </View>
                            <View style={styles.textBoxContainerTwoThird}>
                                {
                                    editable === true ?
                                    <View>
                                    {
                                        ruta === 8 ?
                                        <View style={styles.textBoxBorder}>
                                            <Text style={styles.textBoxLabel}>Importe</Text>
                                            <Dropdown style={styles.comboBox}
                                            data={cantidadesPrestamo8}
                                            labelField="label" valueField="value"
                                            placeholder='Importe'
                                            placeholderStyle={styles.comboBoxPlaceholder}
                                            selectedTextStyle={styles.comboBoxSelected}
                                            value={importe_prestamo}
                                            onChange={(value) => {setImportePrestamo(value.value); calcularPrestamo(value.value, plazoPrestamo, editable, idCliente)}}/>
                                        </View>
                                        :
                                        <View style={styles.textBoxBorder}>
                                            <Text style={styles.textBoxLabel}>Importe</Text>
                                            <Dropdown style={styles.comboBox}
                                            data={cantidadesPrestamo}
                                            labelField="label" valueField="value"
                                            placeholder='Importe'
                                            placeholderStyle={styles.comboBoxPlaceholder}
                                            selectedTextStyle={styles.comboBoxSelected}
                                            value={importe_prestamo}
                                            onChange={(value) => {setImportePrestamo(value.value); calcularPrestamo(value.value, plazoPrestamo, editable, idCliente)}}/>
                                        </View>
                                    }
                                    </View>
                                    :
                                    <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Importe</Text>
                                        <CurrencyInput style={styles.textBox}
                                            delimiter=","
                                            precision={0}
                                            minValue={0}
                                            maxValue={9999}
                                            prefix="$"
                                            value={importe_prestamo}/>
                                    </View>
                                }
                                
                                
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
                                    value={pagarePrestamo}
                                    onChangeText={value => setPagarePrestamo(value)}/>
                                </View>
                                {editable == false && <Locker></Locker>}
                            </View>
                            <View style={styles.textBoxContainerHalf}>
                                <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Fecha</Text>
                                    <TouchableOpacity style={styles.textBox}
                                        onPress={showDatePicker}>
                                            <View style={{ display: !visible ? 'flex' : 'none', paddingTop:8 }}>
                                                <Text style={styles.date_label}>{fechaPrestamo}</Text>
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
                        <View style={[styles.textBoxContainerHalf]}>
                            <View style={[styles.textBoxBorder]}>
                                <Text style={styles.textBoxLabel}>Estatus</Text>
                                <Text style={[styles.textBox,{textAlignVertical:"center"}]}>{estatusPrestamo}</Text>
                            </View>
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
                                            <Image style={[styles.BubbleImage,{tintColor:"orange"}]}
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
                                    <TouchableOpacity style={styles.textBox} onPress={() => getDomicilio()}>
                                        {fotoDomicilio === null ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoDomicilio !== null && fotoDomicilio !== '1' && fotoDomicilio !== '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoDomicilio === '1' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Ver</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoDomicilio === '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"orange"}]}
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
                                        {fotoINE === null ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoINE !== null && fotoINE !== '1' && fotoINE !== '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoINE === '1' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                    source={ImageIndex.cam}>
                                                </Image>
                                                <Text style={styles.textBoxSuccessful}>Ver</Text>
                                            </View>
                                            :<View></View>
                                        }
                                        {fotoINE === '0' ?
                                            <View style={styles.textBoxRow}>
                                                <Image style={[styles.BubbleImage,{tintColor:"orange"}]}
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
                                            {fotoGarantia === null ?
                                                <View style={styles.textBoxRow}>
                                                    <Image style={[styles.BubbleImage,{tintColor:"#F2CC62"}]}
                                                        source={ImageIndex.cam}>
                                                    </Image>
                                                    <Text style={styles.textBoxPlaceholder}>Capturar</Text>
                                                </View>
                                                :<View></View>
                                            }
                                            {fotoGarantia !== null && fotoGarantia !== '1' && fotoGarantia !== '0' ?
                                                <View style={styles.textBoxRow}>
                                                    <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                        source={ImageIndex.cam}>
                                                    </Image>
                                                    <Text style={styles.textBoxSuccessful}>Capturado</Text>
                                                </View>
                                                :<View></View>
                                            }
                                            {fotoGarantia === '1' ?
                                                <View style={styles.textBoxRow}>
                                                    <Image style={[styles.BubbleImage,{tintColor:"#70be44"}]}
                                                        source={ImageIndex.cam}>
                                                    </Image>
                                                    <Text style={styles.textBoxSuccessful}>Ver</Text>
                                                </View>
                                            :<View></View>
                                        }
                                            {fotoGarantia === '0' ?
                                                <View style={styles.textBoxRow}>
                                                    <Image style={[styles.BubbleImage,{tintColor:"orange"}]}
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
                        <View style={[styles.spacer10,{height:1}]}></View>
                    </View>
                    <View>
                        {
                            unlockPreview() === true ? <View>
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
                                            value={interesesPrestamo}/>
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
                                            value={seguroPrestamo}/>
                                            
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
                                            value={abonoPrestamo}/>
                                </View>
                                <Locker></Locker>
                            </View>
                            {
                                renovacionPrestamo !== 0 &&
                                <View style={styles.textBoxContainerHalf}>
                                <View style={styles.textBoxBorder}>
                                            <Text style={styles.textBoxLabel}>Renovacion</Text>
                                            <CurrencyInput style={styles.textBox}
                                            delimiter=","
                                            precision={0}
                                            minValue={0}
                                            maxValue={9999}
                                            prefix="$"
                                            placeholder='$0'
                                            onChangeValue={(value) => setSeguroPrestamo(value)}
                                            value={renovacionPrestamo}/>
                                            
                                </View>
                                <Locker></Locker>
                            </View>
                            }
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={[styles.textBoxContainerFull,{height:75}]}>
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
                                        value={totalPrestamo}/>
                            </View>
                            <Locker></Locker>
                        </View>
                        {
                            editable === false &&
                            <View style={styles.spacer30}></View>
                        }
                        <View style={styles.spacer20}></View>
                        <View style={styles.formRow}>
                            {
                                editable === false ? <View></View> 
                                :
                                <TouchableOpacity onPress={() => registrarPrestamo(
                                    newIdPrestamo=idPrestamo,
                                    newIdCliente=idCliente,
                                    newImporte=importe_prestamo,
                                    newPlazo=plazoPrestamo,
                                    newAbono=abonoPrestamo,
                                    newSeguro=seguroPrestamo,
                                    newNumSemana=0,
                                    newFecha=fechaPrestamo,
                                    newEstatus=estatusPrestamo,
                                    newIntereses=interesesPrestamo,
                                    newTotalPagar=totalPrestamo,
                                    newSaldoPendiente=totalPrestamo,
                                    newPagare=pagarePrestamo,
                                    newIdAval=idAval,
                                    newIdRuta=ruta,
                                    newFotoIne=fotoINE,
                                    newFotoDom=fotoDomicilio,
                                    newFotoGarantia=fotoGarantia,
                                    newCoordsLat=coords.latitude,
                                    newCoordsLon=coords.longitude,
                                    newRenovacion=renovacionPrestamo
                                )}
                                    style={styles.mainButtonFloating}>
                                    <Text style={styles.mainButtonText}>{buttonLabel}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{height:200}}></View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

function AutoComplete({idGrupo, searchText, clearText, selectItem, lista_items, combo_height, placeHolder, title, focused}){
    const [showCombo, setShowCombo] = useState(0)
    const [textValue, setTextValue] = useState("")

    return (
        <View style={styles.textBoxBorder}>
            <View style={{height:50, flexDirection:'row'}}>
                <Text style={[styles.textBoxLabel, {zIndex:5}]}>{title}</Text>
                <TextInput style={[styles.textBox,{zIndex:4, width:"100%"}]}
                placeholder={placeHolder}
                onChangeText={value => {searchText(idGrupo=idGrupo, filtro=value); setTextValue(value); clearText()}}
                onFocus={() => {setShowCombo(1); focused(true)}}
                value={textValue}></TextInput>
                {
                    textValue !== "" &&
                    <TouchableOpacity onPress={() => {setTextValue(''); clearText()}}>
                        <Image style={[styles.BubbleImage,{ zIndex:100, marginLeft:-40, height:15}]}
                            source={ImageIndex.clear}>
                        </Image>
                    </TouchableOpacity>
                }
                {
                    showCombo === 0 &&
                    <TouchableOpacity onPress={() => {setShowCombo(1)}}>
                        <Image style={[styles.BubbleImage,{ zIndex:100, marginLeft:-40, height:15}]}
                            source={ImageIndex.back}>
                        </Image>
                    </TouchableOpacity>
                }
            </View>
            {
                lista_items.length > 0 &&
                <View>
                {
                    showCombo === 1 &&
                        <View style={{height:combo_height, backgroundColor:"white", borderWidth:1, borderRadius:15, zIndex:100, marginTop:0.5}}>
                            <View></View>
                                <ScrollView style={{height:combo_height, zIndex:101}} nestedScrollEnabled={true}>
                                {
                                    lista_items.map((data,i) => (
                                        <View key={i}>
                                            <TouchableOpacity onPress={() => {setTextValue(data.title); setShowCombo(0); selectItem(data)}}>
                                                <Text style={{fontSize:18, width:1000, marginLeft:10, marginTop:10, marginBottom:10}}>{data.title}</Text>
                                                {
                                                    i < lista_items.length-1 &&
                                                    <View style={{width:"100%", borderWidth:0.5, backgroundColor:"#70be44", borderColor:"#70be44", zIndex:102}}></View>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>           
                        </View>
                    }
                </View>
            }
            {
                showCombo === 1 &&
                <TouchableOpacity style={{height:"10000%", width:"10000%", zIndex:3, marginLeft:"-50%", marginTop:"-300%"}}
                onPress={() => {setShowCombo(0); focused(false)}}></TouchableOpacity>
            }

        </View>
    )
}

function LockerInput(){
    return(
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'gray',
            opacity:0.1,
            borderRadius:15
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
                        <View key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}>
                            <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>${data[1]}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>{data[2]}</Text>
                            </View>
                        </View>
                        :
                        <View  key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                            <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>${data[1]}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cell,{ width:100}]}>{data[2]}</Text>
                            </View>
                        </View>

                        ))
                    }
                </View>
                :
                <View>
                    <View style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                        <View>
                            <Text style={[styles.cell,{ width:300}]}>Aun no hay abonos</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}


export default FormPrestamos