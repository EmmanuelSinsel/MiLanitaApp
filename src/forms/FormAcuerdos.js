import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, Image, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CurrencyInput from 'react-native-currency-input';
import { Locker } from '../Utils';
import { getPrestamoAcuerdoAPI } from '../services/ServicePrestamos';
import { getRutasAPI } from '../services/ServiceOtros';
import { eliminarPreregistroAcuerdoAPI, getDetalleAcuerdoAPI, getSiguienteIdAcuerdoAPI, registrarAcuerdoAPI } from '../services/ServiceAcuerdos';
import { useRoute } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Acuerdo = ({navigation}) => {
    const [cancel, setCancel] = useState('')
    const [idPrestamo,         setIdPrestamo] = useState('');
    const [idAcuerdo,         setIdAcuerdo] = useState('');
    const [localidad,         setLocalidad] = useState('');
    const [localidadNoEditable,                setLocalidadText] = useState('');
    const [motivo,         setMotivo] = useState('');
    const [nombreCliente,      setNombreCliente] = useState('');
    const [domicilioCliente,         setDomCliente] = useState('');
    const [telefonoCliente,         setTelCliente] = useState('');
    const [saldoPendiente,         setSaldoPendiente] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [visible,             setVisible] = useState(true)
    const [fechaAcuerdo,      setFechaAcuerdo] = useState('DD/MM/YYYY');
    const [fechaAcuerdoNoEditable,      setFechaAcuerdoNoEditable] = useState('');
    const [intervaloAcuerdo,         setIntervaloAcuerdo] = useState('');
    const [cantidadIntervalo,         setCantidadIntervalo] = useState(null);
    const [tipoIntervalo,         setTipoIntervalo] = useState('');
    const [listaRutas, setListaRutas] = useState([]);
    const [editable, setEditable] = useState(true)
    const [data, setData] = useState([])
    const [searchLock, setSearchLock] = useState(0)
    const [topLabel, setTopLabel] = useState('')
    const [buttonLabel, setButtonLabel] = useState('')
    const [loading, setLoading] = useState(0);
    const [abonos, setAbonos] = useState(null)
    const route = useRoute()
    const intervalos = [
        { label: 'Semanal', value: '1' },
        { label: 'Quincenal', value: '2' },
        { label: 'Mensual', value: '3' },
    ];

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
        if(route.params?.label && searchLock == 0){
            setSearchLock(1)
            setEditable(false)
            setTopLabel(route.params?.label)
            setButtonLabel(route.params?.button)
            setLoading(1)
            getDetalleAcuerdo(route.params?.id)
        }if(!route.params?.label && searchLock == 0){
            getRutas()
            getSiguienteId()
            setEditable(true)
            setTopLabel("Nuevo Acuerdo")
            setButtonLabel("Registrar Acuerdo")
            const getPermissions = async () => {
                let tempRutas = await getRutas()
                const rol = await AsyncStorage.getItem('nombreRol');
                if(rol != "ADMINISTRADOR"){
                    const rutaEmpleado = await AsyncStorage.getItem('idRuta');
                    setRuta(String(rutaEmpleado))
                    for(let r = 0 ; r < tempRutas.length ; r++){
                        if(tempRutas[r].value == rutaEmpleado){
                            setLocalidadText(String(tempRutas[r].label))
                            break;
                        }
                    }
                    
                }
            }
            getPermissions()
            if(route.params?.idPrestamoReturn){
                setIdPrestamo(route.params?.idPrestamoReturn)
            }else{

            }
        }
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[getRutas])

    const getSiguienteId = useCallback(async () => {
        const data = await getSiguienteIdAcuerdoAPI()
        setIdAcuerdo(String(data.nextId))
    }, [])

    const eliminarPreregistro = useCallback(async (id_acuerdo) => {
        const response = await eliminarPreregistroAcuerdoAPI(id_acuerdo)
    }, [])

    const getPrestamoAcuerdo = useCallback(async (id_prestamo) => {
        const res = await getPrestamoAcuerdoAPI(id_prestamo)
        let data = res.data
        if(data != null){
            setNombreCliente(data.nomCliente)
            setDomCliente(data.domCliente)
            setTelCliente(data.telCliente)
            setSaldoPendiente(Number(data.saldoPendiente))
        }
    })

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
        setFechaAcuerdo(month+"/"+day+"/"+year)
    };
    function backMainScreen() {
        if(editable == true){
            setCancel(1)
        }else{
            navigation.goBack()
        }
    }
    const registerAcuerdo =async (
        newIdAcuerdo,
        newIdPrestamo,
        newLocalidad,
        newMotivo,
        newFecha,
        newTipoIntervalo,
        newIntervalo,
        newCantidadIntervalo,
        newIntervalos
    ) => {
        let data = {
            id_acuerdo: newIdAcuerdo,
            id_prestamo: newIdPrestamo,
            id_ruta: newLocalidad,
            motivo: newMotivo,
            fecha: newFecha,
            tipo_intervalo: newTipoIntervalo,
            intervalo: newIntervalo,
            cantidad: newCantidadIntervalo,
        }
        res = await registrarAcuerdoAPI(data)
        console.log(res)
        console.log(data)
        navigation.goBack()
    }

    const getDetalleAcuerdo = async (idAcuerdo) => {
        const res = await getDetalleAcuerdoAPI(idAcuerdo)
        const data = res.data
        setIdPrestamo(String(data.idPrestamo))
        setNombreCliente(data.nomCliente)
        setDomCliente(data.domCliente)
        setTelCliente(data.telCliente)
        setSaldoPendiente(data.saldoPendiente)
        setIdAcuerdo(String(data.idAcuerdo))
        setLocalidadText(data.localidad)
        setMotivo(data.motivo)
        setFechaAcuerdoNoEditable(data.fecha)
        setFechaAcuerdo(data.fecha)
        setTipoIntervalo(data.tipoIntervalo)
        setIntervaloAcuerdo(String(data.intervalo))
        setCantidadIntervalo(data.cantidad)
        let tempAbonos = data.abonos
        let abonosArray = []
        for(let i = 0 ; i < tempAbonos.length ; i++){
            abonosArray.push([String(i+1),tempAbonos[i].cantidad, "", tempAbonos[i].fecha_pago, tempAbonos[i].estatus])
        }
        console.log(abonosArray)
        setAbonos(abonosArray)
    }

    const getRutas = useCallback(async () => {
        const res = await getRutasAPI()
        const data = res.data
        let tempRutas = []
        for(let i = 0; i < data.length ; i++){
            tempRutas.push({"label":data[i].ruta,"value":data[i].idRuta})
        }
        setListaRutas(tempRutas)
        return tempRutas
    }, [])

    return (
        <View>
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
                                onPress={() => {eliminarPreregistro(idAcuerdo); navigation.goBack()}}>
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
                        <Text style={styles.mainHeadersInverted}>Nuevo Acuerdo</Text>
                    </View>
                    <View style={styles.spacer20}></View>
                </View>
                <View style={styles.spacer10}></View>
                <View style={styles.mainHeaderContainer}>
                    <Text style={styles.mainHeaders}>Datos del Prestamo</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.spacer10}></View>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>ID Prestamo</Text>
                            <TextInput style={styles.textBox}
                            keyboardType='numeric'
                            placeholder='1234'
                            onChangeText={idPrestamo => {setIdPrestamo(idPrestamo); getPrestamoAcuerdo(idPrestamo)}}
                            value={idPrestamo}/>
                            {
                                editable === false && <Locker></Locker>
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
                                value={nombreCliente}/>
                    </View>
                    <Locker></Locker>
                </View>
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
                </View>
                <View style={styles.spacer20}></View>
                <View style={[styles.textBoxContainerFull,{height:70}]}>
                    <View style={styles.textBoxBorderMoney}>
                                <Text style={styles.textBoxLabel}>Saldo Pendiente</Text>
                                <CurrencyInput style={styles.textBoxMoney}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={99999}
                                prefix="$"
                                placeholder='Ej. $5,400'
                                onChangeValue={(value) => setSaldoPendiente(value)}
                                value={saldoPendiente}/>
                    </View>
                    <Locker></Locker>
                </View>
                <View style={styles.spacer20}></View>
                <View>
                    {
                        saldoPendiente > 0 ? <View></View> : <View style={styles.lockUI}></View>
                    }

                    <View style={styles.mainHeaderContainer}>
                        <Text style={styles.mainHeaders}>Datos del Acuerdo</Text>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.spacer10}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>ID Acuerdo</Text>
                                        <TextInput style={styles.textBox}
                                        keyboardType='numeric'
                                        placeholder='1234'
                                        onChangeText={idAcuerdo => setIdAcuerdo(idAcuerdo)}
                                        value={idAcuerdo}/>
                            </View>
                            <Locker></Locker>
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Localidad</Text>
                                        {
                                            localidadNoEditable === '' ?
                                            <Dropdown style={styles.comboBox}
                                            data={listaRutas}
                                            labelField="label" valueField="value"
                                            searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                            placeholderStyle={styles.comboBoxPlaceholder}
                                            selectedTextStyle={styles.comboBoxSelected}
                                            value={localidad}
                                            onChange={item => {setLocalidad(item.value);}}/>
                                            :
                                            <View>
                                                <TextInput style={styles.textBox}
                                                onChangeText={idAcuerdo => setIdAcuerdo(idAcuerdo)}
                                                value={localidadNoEditable}/>
                                                <Locker></Locker>
                                            </View>

                                            
                                        }

                            </View>
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={[styles.textBoxContainerFull, {height:100}]}>
                        <View style={[styles.textBoxBorder,{height:100, flexDirection:"row"}]}>
                            <Text style={styles.textBoxLabel}>Motivo</Text>
                            <TextInput style={[styles.textBox, {alignSelf:"flex-start", verticalAlign:"top", paddingTop:10}]}
                            multiline
                            placeholder='Ej. Se encontraba fuera de la ciudad'
                            onChangeText={motivo => setMotivo(motivo)}
                            value={motivo}/>
                            {
                                editable === false && <Locker></Locker>
                            }
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Fecha</Text>
                                {
                                    fechaAcuerdoNoEditable === '' ?
                                    <View>
                                        <Pressable style={styles.textBox}
                                            onPress={showDatePicker}>
                                                <View style={{ display: !visible ? 'flex' : 'none', paddingTop:10 }}>
                                                    <Text style={styles.date_label}>{fechaAcuerdo}</Text>
                                                </View>
                                                <View style={{ display: visible ? 'flex' : 'none' , paddingTop:12  }}>
                                                    <Text style={styles.comboBoxPlaceholder}>DD/MM/YYYY</Text>
                                                </View>
                                        </Pressable>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <TextInput style={styles.textBox}
                                        onChangeText={idAcuerdo => setIdAcuerdo(idAcuerdo)}
                                        value={fechaAcuerdoNoEditable}/>
                                        <Locker></Locker>
                                    </View>

                                }

                            </View>
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Tipo de Intervalo</Text>
                                        <Dropdown style={styles.comboBox}
                                        data={intervalos}
                                        labelField="label" valueField="value"
                                        searchPlaceholder="Grupo.." placeholder='Ej. Semanal'
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={styles.comboBoxSelected}
                                        value={tipoIntervalo}
                                        onChange={item => {setTipoIntervalo(item.value);}}/>
                                        {
                                            editable === false && <Locker></Locker>
                                        }
                            </View>
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={styles.textBoxLabel}>Intervalo</Text>
                                        <TextInput style={[styles.textBox]}
                                        defaultValue={intervaloAcuerdo}
                                        keyboardType='numeric'
                                        placeholder='Ej. 4'
                                        maxLength={2}
                                        onChangeText={item => {setIntervaloAcuerdo(item)}}/>
                            </View>
                            {
                                editable === false && <Locker></Locker>
                            }
                        </View>
                        <View style={styles.textBoxContainerHalf}>
                            <View style={styles.textBoxBorder}>
                                        <Text style={[styles.textBoxLabel]}>Cantidad ($)</Text>
                                        <CurrencyInput style={[styles.textBox]}
                                        delimiter=","
                                        precision={0}
                                        minValue={0}
                                        maxValue={9999}
                                        prefix="$"
                                        placeholder='Ej. $450'
                                        value={cantidadIntervalo}
                                        onChangeValue={item => {setCantidadIntervalo(item);}}/>
                            </View>
                            {
                                editable === false && <Locker></Locker>
                            }
                        </View>
                    </View>

                    <View style={styles.spacer10}></View>
                    <View style={styles.mainHeaderContainer}>
                        <Text style={styles.mainHeaders}>Intervalos del Acuerdo</Text>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    { fechaAcuerdo !== "DD/MM/YYYY" && intervaloAcuerdo !== '' && cantidadIntervalo !== null && tipoIntervalo !== '' ?
                        <View style={{width:"90%", alignSelf:"center"}}>
                            <DataTable intervalo={intervaloAcuerdo} 
                            cantidad={cantidadIntervalo} 
                            fecha_inicio={fechaAcuerdo} 
                            saldoPendiente={saldoPendiente}
                            tipoIntervalo={tipoIntervalo}
                            setData={setData}
                            flagdata={data}
                            editable={editable}
                            editableData={abonos}></DataTable>
                        </View>:<View>
                        </View>
                    }
                    <View style={styles.spacer20}></View>
                    {
                        editable === true &&
                        <View style={styles.formRow}>
                            <TouchableOpacity onPress={() => registerAcuerdo(idAcuerdo,
                                                                            idPrestamo, 
                                                                            localidad, 
                                                                            motivo, 
                                                                            fechaAcuerdo, 
                                                                            tipoIntervalo, 
                                                                            intervaloAcuerdo, 
                                                                            cantidadIntervalo,
                                                                            data)}
                                style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>Registrar Acuerdo</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </ScrollView>
        </View>
    )
}
function DataTable({intervalo, cantidad, fecha_inicio, saldoPendiente, tipoIntervalo, setData, flagdata, editable, editableData}) {
    let data = []
    let valid = 1
    let cont = 0
    if(editableData == null){

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        let init_year = ""
        let init_month = ""
        let init_day = ""
        if(editable == true){
            init_year = Number(String(fecha_inicio).substring(7,10))
            init_month = Number(String(fecha_inicio).substring(0,2))-1
            init_day = Number(String(fecha_inicio).substring(3,5))
        }else{
            init_year = Number(String(fecha_inicio).substring(6,10))
            init_month = Number(String(fecha_inicio).substring(3,5))
            init_day = Number(String(fecha_inicio).substring(0,2))
        }
        let current_date = new Date(init_year, init_month, init_day);
        let date_cont = 0
        cantidad = Number(cantidad)
        if(intervalo * cantidad >= saldoPendiente){
            valid = 1
        }else{
            valid = 0
        }
        if(Number(intervalo) > saldoPendiente/cantidad ){
            intervalo = Math.ceil(Number(saldoPendiente/cantidad))
        }
        for(let i = 0 ; i < Number(intervalo) ; i++){
            let temp = [i+1,0.0,"",""]
            if(cont < saldoPendiente){
                if(cont+cantidad <= saldoPendiente){
                    temp[1] = cantidad
                    cont += cantidad
                }else{
                    temp[1] = saldoPendiente-cont
                    saldoPendiente = saldoPendiente-cont
                }
            }
            if(temp[1] != 0){
                if(tipoIntervalo == "1"){
                    current_date.setDate(current_date.getDate()+7)
                }if(tipoIntervalo == "2"){
                    current_date.setDate(current_date.getDate()+14)
                }if(tipoIntervalo == "3"){
                    current_date.setDate(current_date.getDate()+28)
                }
                var month = String(current_date.getMonth())
                if(month.length==1){
                    month = "0"+month
                }
                var day = String(current_date.getDate())
                if(day.length==1){
                    day = "0"+day
                }
                var year = current_date.getFullYear()
                temp[2] = current_date.toLocaleDateString("es-ES", options)
                temp[2] = temp[2].charAt(0).toUpperCase() + temp[2].slice(1);
                temp[3] = day+"/"+month+"/"+year
                data.push(temp)
                if(flagdata.length < intervalo){
                    setData(data)
                }
            }
        }
    }else{
        data = editableData
    }
    return (
        <View>
            {
                data.map((data,i) => (
                    editable === true ?
                    <View key={i}>
                        {
                            i % 2 === 0 ?
                            <View  style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                                <Text style={styles.cell}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>${data[1]}</Text>
                                    
                                </View>
                                <Text style={styles.cell}>{data[2]}</Text>
                            </View>
                            :
                            <View style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                                <Text style={styles.cell}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>${data[1]}</Text>
                                </View>
                                <Text style={styles.cell}>{data[2]}</Text>
                            </View>
                        }
                    </View>
                    :
                    <View key={i}>
                        {
                            i % 2 === 0 ?
                            <View style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                                <Text style={styles.cell}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>${data[1]}</Text>
                                    
                                </View>
                                <Text style={styles.cell}>{data[3]}</Text>
                                <Text style={styles.cell}>Abono {data[4]}</Text>
                            </View>
                            :
                            <View style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                                <Text style={styles.cell}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>${data[1]}</Text>
                                </View>
                                <Text style={styles.cell}>{data[3]}</Text>
                                <Text style={styles.cell}>Abono {data[4]}</Text>
                            </View>
                        }
                    </View>
                ))
            }
            {
                valid === 0 && intervalo % 2 === 0 ? 
                <View style={[styles.tableRowEven,{height:60, flexDirection:"row",alignItems:"center"}]}>
                    <Text style={styles.cell}>{}</Text>
                    <View>
                        <Text style={[styles.cell,{marginTop:5}]}>Este acuerdo no cumple con el 100% del Saldo Pendiente</Text>
                    </View>
                </View>:<View></View>
            }
            {
                valid === 0 && intervalo % 2 === 1 ? 
                <View style={[styles.tableRowOdd,{height:60, flexDirection:"row"}]}> 
                    <Text style={styles.cell}>{}</Text>
                    <View>
                        <Text style={[styles.cell,{marginTop:5}]}>Este acuerdo no cumple con el 100% del Saldo Pendiente</Text>
                    </View>
                </View>:<View></View>
            }
        </View>
    )
}

export default Acuerdo;