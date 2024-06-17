import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locker } from '../Utils';
import { getGruposAPI, getRutasAPI } from '../services/ServiceOtros';
import { getListaAbonosAPI, guardar_abonosAPI } from '../services/ServiceAbonos';

const FormAbonosAcuerdos = ({navigation}) => {
    //TABLA
    const [tipoAbono, setTipoAbono] = useState([]);
    const [listaAbonos, setAbono] = useState(null);
    const updateType = (key, type) => {
        let new_list = tipoAbono
        new_list[key]=type.value
        setTipoAbono(new_list)
        //setSafeLock(1)
    }
    const updateAbono = (id, value) => {
        if(value == null){
            value = 0
        }
        const newInputs = listaAbonos.map(input =>
            input.id === id ? { ...input, value: value } : input
        );
        setAbono(newInputs);
        //setSafeLock(1)
    }

    //FORMULARIO
    const topControlsHeight = 110 + 150 - 10
    const windowHeight = Dimensions.get('window').height;
    const [filtro,      setFiltro] = useState('');
    const [tableData, setTableData] = useState(null);
    const [tableDataFiltered, setTableDataFiltered] = useState(null);
    const [rutaNoEditable,                setRutaText] = useState('');
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [listaRutas, setListaRutas] = useState([]);
    const [listaGrupos, setListaGrupos] = useState([]);
    const [loadingForm, setLoadingForm] = useState(1);
    const [loading, setLoading] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const [cancel, setCancel] = useState('')
    useEffect(() => {
        const backAction = () => {
            setCancel(1)
            return true;
        };
        const backHandlerClientes = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        
        const getPermissions = async () => {
            const tempRutas = await getRutas()
            const rol = await AsyncStorage.getItem('nombreRol');
            if(rol != "ADMINISTRADOR"){
                const rutaEmpleado = await AsyncStorage.getItem('idRuta');
                setRuta(String(rutaEmpleado))
                getGrupos(Number(rutaEmpleado))
                for(let r = 0 ; r < tempRutas.length ; r++){
                    if(tempRutas[r].value == rutaEmpleado){
                        setRutaText(String(tempRutas[r].label))
                        break;
                    }
                }
            }
        }
        getPermissions()
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[getRutas])
    
    function backMainScreen() {
        setCancel(1)
    }

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

    const getListaAbonos = useCallback(async (idGrupo) => {
        setLoadingForm(1)
        setLoading(1)
        const res = await getListaAbonosAPI(idGrupo)
        const data = res.data
        let tempAbonos = []
        for(let i = 0; i < data.length ; i++){
            tempAbonos.push([data[i].idPrestamo,data[i].nomCliente,data[i].numAbono,data[i].abono, data[i].numSemana])
        }
        setTableData(tempAbonos)
        setTableDataFiltered(tempAbonos)
        let list = []
        let listaAbonos = []
        for(let i = 0; i < tempAbonos.length ; i++){
            list.push('2')
            listaAbonos.push({ "id": i, "value": tempAbonos[i][3] })
        }
        setTipoAbono(list)
        setAbono(listaAbonos)
        setLoadingForm(0)
        setLoading(0)
    }, [setAbono, setTipoAbono])

    const guardarListaAbonos = async (newTipoAbono, newListaAbonos, newTableData) => {
        setLoading(1)
        let data = []
        let fecha = ""
        const date = new Date();
        var month = String(date.getMonth() + 1)
        if(month.length==1){
            month = "0"+month
        }
        var day = String(date.getDate())
        if(day.length==1){
            day = "0"+day
        }
        var year = date.getFullYear()
        fecha = month+"/"+day+"/"+year
        for(let i = 0 ; i < newTableData.length ; i++){
            data.push({
                "id_prestamo":newTableData[i][0],
                "no_abono":newTableData[i][2]+1,
                "abono":newListaAbonos[i].value,
                "tipo_abono":newTipoAbono[i],
                "no_semana":Number(newTableData[i][4])+1,
                "fecha":fecha
            })
        }
        data = {"abonos":data}   
        const res = guardar_abonosAPI(data)
        if(res.status == 1){
            setLoaded(1)
        }
    }

    const filtrar = (filtro) => {
        let tempList = []
        for(let i = 0; i < tableData.length ; i++){
            if(filtro != ''){
                if(String(tableData[i][1]).includes(String(filtro).toUpperCase())){
                    tempList.push([tableData[i][0], tableData[i][1], tableData[i][2]])
                }
                if(String(tableData[i][0]).includes(String(filtro).toUpperCase())){
                    tempList.push([tableData[i][0], tableData[i][1], tableData[i][2]])
                }
            }
            else{
                tempList.push([tableData[i][0], tableData[i][1], tableData[i][2]])
            }
        }
        setTableDataFiltered(tempList)
    }

    return (
        <View style={[styles.background, {height:"100%"}]}>
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
                                onPress={() => {navigation.goBack()}}>
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
            <StatusBar backgroundColor='#70be44'/>
            {
                loaded === 1 &&
                <View style={{position:"absolute", height:"100%", width:"100%", zIndex:20}}>
                    <View style={styles.alertBackground}></View>
                    <View style={styles.alert}>
                        <View style={styles.spacer30}></View>
                        <View style={styles.spacer10}></View>
                        <Text style={{fontSize:22, alignSelf:"center", textAlign:"center"}}>Se han guardado los abonos</Text>
                        <View style={styles.spacer20}></View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:"100%"}}>
                            <View style={styles.spacer10}></View>
                            <TouchableOpacity 
                                style={{alignSelf:"center", width:'70%', backgroundColor:"green", height:50, justifyContent:"center", borderRadius:15}}
                                onPress={() => {navigation.goBack()}}>
                                <Text style={{fontSize:22, alignSelf:"center", color:"white"}}>Continuar</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <View style={{flexDirection:'row', width:"66.6%"}}>
                        <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                                <Image style={styles.invertedImageTopBar}
                                    source={ImageIndex.back}>
                                </Image>
                        </TouchableOpacity>
                        <Text style={styles.mainHeadersInverted}>Abonos</Text>
                    </View>
                    <TouchableOpacity style={styles.topBarSaveButton} onPress={() => guardarListaAbonos(tipoAbono, listaAbonos, tableData) }>
                        <Text style={{fontSize:22, color:"white", fontWeight:"bold"}}>Abonar</Text>
                    </TouchableOpacity>
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
            <View style={styles.spacer30}></View>
            <View style={{height:150}}>
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
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Grupo</Text>
                                    <Dropdown style={styles.comboBox}
                                    data={listaGrupos}
                                    labelField="label" valueField="value"
                                    searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.comboBoxSelected}
                                    value={grupo}
                                    onChange={item => {setGrupo(item.value); getListaAbonos(item.value)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.spacer20}></View>
                <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Buscador</Text>
                                <TextInput style={styles.textBox}
                                onChangeText={value => filtrar(value)}
                                defaultValue={filtro}/>
                    </View>
                </View>
                <View style={styles.spacer10}></View>
                <View style={styles.horizontalLine}></View>
            </View>
            
            {
                loadingForm === 0 &&
                    <ScrollView style={{height:windowHeight-topControlsHeight}}>
                    {
                        listaAbonos !== null &&
                        <DataTable 
                            tableData={tableDataFiltered} 
                            updateAbono={updateAbono} 
                            updateType={updateType} 
                            listaAbonos={listaAbonos} 
                            lista_tipos={tipoAbono} 
                            filtro={filtro}>
                        </DataTable>
                    }
                    </ScrollView>
            }
            <View style={styles.spacer30}></View>
        </View>
    )
}

function DataTable({tableData, updateAbono, updateType, listaAbonos, lista_tipos, filtro }) {
    const [comboColor, setComboColor] = useState([]);
    const data1 = [
        { label: 'Normal', value: '2' },
        { label: 'Recuperado', value: '5' },
        { label: 'Parcial', value: '4' },
        { label: 'Adelantado', value: '6' },
    ];

    useEffect(() => {
        let colores = []
        for(let i = 0; i < listaAbonos.length ; i++){
            colores.push('transparent')
        }
        setComboColor(colores)
    },[])

    const changeColor = (key, type) => {
        let color = ''
        if(type.value == "2"){
            color = 'transparent'
        }else if(type.value == '4'){
            color = 'pink'
        }else if(type.value == '5'){
            color = 'green'
        }else if(type.value == '6'){
            color = 'orange'
        }
        const nextColors = comboColor.map((c, i) => {
            if (i === key) {
                return color;
            } else {
                return comboColor[i];
            }
        });
        setComboColor(nextColors);
    }
    
    return (
        <View>
            <View>
                {
                    tableData.map((data,i) => (
                        i % 2 === 0 ?
                        <View key={i} >
                            <View style={[styles.tableRowEven]}>
                                <Text style={[styles.cell, {marginLeft:20}]}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>{data[1]}</Text>
                                    <View style={[styles.cellHorizontal,{marginTop:-20}]}>
                                        <Text style={[styles.cell,{marginLeft:-40, marginTop:17}]}>Abono #{String(data[2]+1)}:</Text>
                                        <CurrencyInput style={[styles.cellInput,{width:70,  backgroundColor:comboColor[i]}]}
                                                delimiter=","
                                                precision={0}
                                                minValue={0}
                                                maxValue={9999}
                                                prefix="$"
                                                placeholder='$0'
                                                onChangeValue={(value) => {updateAbono(i, value);}}
                                                value={String(listaAbonos[i].value)}/>
                                        <Text style={[styles.cell, {marginTop:17}]}>Tipo:</Text>
                                        <Dropdown style={[styles.cellCombo, {width:140}]}
                                        data={data1} 
                                        labelField="label" valueField="value"
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={[styles.cellComboBoxSelected,{marginTop:5}]}
                                        value={lista_tipos[i]}
                                        onChange={item => {updateType(i, item); changeColor(i,item);}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <View key={i} >
                            <View style={[styles.tableRowOdd]}>
                                <Text style={[styles.cell, {marginLeft:20}]}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>{data[1]}</Text>
                                    <View style={[styles.cellHorizontal,{marginTop:-20}]}>
                                        <Text style={[styles.cell,{marginLeft:-40, marginTop:17}]}>Abono #{String(data[2]+1)}:</Text>
                                        <CurrencyInput style={[styles.cellInput,{width:70,backgroundColor:comboColor[i]}]}
                                                delimiter=","
                                                precision={0}
                                                minValue={0}
                                                maxValue={9999}
                                                prefix="$"
                                                placeholder='$0'
                                                onChangeValue={(value) => {updateAbono(i, value);}}
                                                value={String(listaAbonos[i].value)}/>
                                        <Text style={[styles.cell, {marginTop:17}]}>Tipo:</Text>
                                        <Dropdown style={[styles.cellCombo, {width:140}]}
                                        data={data1}
                                        labelField="label" valueField="value"
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={[styles.cellComboBoxSelected,{marginTop:5}]}
                                        value={lista_tipos[i]}
                                        onChange={item => {updateType(i, item); changeColor(i,item);}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default FormAbonosAcuerdos