import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect,} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import ServiceAbonos from '../services/ServiceAbonos';
import ServicePrestamos from '../services/ServicePrestamos';
import CurrencyInput from 'react-native-currency-input';

const Abonos = ({navigation}) => {
    //TABLA
    const [tipo_abono, setTipoAbono] = useState([]);
    const [lista_abonos, setAbono] = useState(null);

    const update_type = (key, type) => {
        let new_list = tipo_abono
        new_list[key]=type.value
        setTipoAbono(new_list)
        //setSafeLock(1)
    }
    const update_abono = (id, value) => {
        if(value == null){
            value = 0
        }
        const newInputs = lista_abonos.map(input =>
            input.id === id ? { ...input, value: value } : input
        );
        setAbono(newInputs);
        //setSafeLock(1)
    }
    //FORMULARIO
    let serviceAbonos = new ServiceAbonos()
    let servicePrestamos = new ServicePrestamos()
    const top_controls_height = 110 + 150 - 10
    const windowHeight = Dimensions.get('window').height;
    const [filtro,      setFiltro] = useState('');
    const [table_data, setTableData] = useState(null);
    const [table_data_filtered, setTableDataFiltered] = useState(null);
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    const [loading_form, setLoadingForm] = useState(1);
    const [loading, setLoading] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const [safe_lock, setSafeLock] = useState(0)
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
        get_rutas()
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[get_rutas])
    
    function backMainScreen() {
        setCancel(1)
    }
    const get_rutas = useCallback(async () => {
        const res = await servicePrestamos.get_rutas()
        const data = res.data
        let temp_rutas = []
        for(let i = 0; i < data.length ; i++){
            temp_rutas.push({"label":data[i].ruta,"value":data[i].id_ruta})
        }
        setListaRutas(temp_rutas)
    }, [])
    const get_grupos = useCallback(async (id_ruta) => {
        const res = await servicePrestamos.get_grupos(id=id_ruta)
        const data = res.data
        let temp_grupos = []
        for(let i = 0; i < data.length ; i++){
            temp_grupos.push({"label":data[i].nom_grupo,"value":Number(data[i].id_grupo)})
        }
        setListaGrupos(temp_grupos)
    }, [])
    const get_lista_abonos = useCallback(async (id_grupo) => {
        setLoadingForm(1)
        const res = await serviceAbonos.get_lista_abonos(id_grupo)
        const data = res.data
        let temp_abonos = []
        for(let i = 0; i < data.length ; i++){
            temp_abonos.push([data[i].id_prestamo,data[i].nom_cliente,data[i].num_abono,data[i].abono, data[i].num_semana])
        }
        setTableData(temp_abonos)
        setTableDataFiltered(temp_abonos)
        let list = []
        let lista_abonos = []
        for(let i = 0; i < temp_abonos.length ; i++){
            list.push('2')
            lista_abonos.push({ "id": i, "value": temp_abonos[i][3] })
        }
        setTipoAbono(list)
        setAbono(lista_abonos)
        setLoadingForm(0)
    }, [setAbono, setTipoAbono])
    const guardar_lista_abonos = async (new_tipo_abono, new_lista_abonos, new_table_data) => {
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
        for(let i = 0 ; i < new_table_data.length ; i++){
            data.push({
                "id_prestamo":new_table_data[i][0],
                "no_abono":new_table_data[i][2]+1,
                "abono":new_lista_abonos[i].value,
                "tipo_abono":new_tipo_abono[i],
                "no_semana":Number(new_table_data[i][4])+1,
                "fecha":fecha
            })
        }
        data = {"abonos":data}   
        const res = await serviceAbonos.guardar_abonos(data)
        if(res.status == 1){
            setLoaded(1)
        }
    }

    const filtrar = (filtro) => {
        let temp_list = []
        for(let i = 0; i < table_data.length ; i++){
            if(filtro != ''){
                if(String(table_data[i][1]).includes(String(filtro).toUpperCase())){
                    temp_list.push([table_data[i][0], table_data[i][1], table_data[i][2]])
                }
                if(String(table_data[i][0]).includes(String(filtro).toUpperCase())){
                    temp_list.push([table_data[i][0], table_data[i][1], table_data[i][2]])
                }
            }
            else{
                temp_list.push([table_data[i][0], table_data[i][1], table_data[i][2]])
            }
        }
        setTableDataFiltered(temp_list)
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
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
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
                    <TouchableOpacity style={styles.topBarSaveButton} onPress={() => guardar_lista_abonos(tipo_abono, lista_abonos, table_data) }>
                        <Text style={{fontSize:22, color:"white", fontWeight:"bold"}}>Abonar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={{height:150}}>
                <View style={styles.formRow}>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Ruta</Text>
                                    <Dropdown style={styles.comboBox}
                                    data={lista_rutas}
                                    labelField="label" valueField="value"
                                    searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.comboBoxSelected}
                                    value={ruta}
                                    onChange={item => {setRuta(item.value);get_grupos(item.value);}}/>
                        </View>
                    </View>
                    <View style={styles.textBoxContainerHalf}>
                        <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>Grupo</Text>
                                    <Dropdown style={styles.comboBox}
                                    data={lista_grupos}
                                    labelField="label" valueField="value"
                                    searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.comboBoxSelected}
                                    value={grupo}
                                    onChange={item => {setGrupo(item.value); get_lista_abonos(item.value)}}/>
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
                loading_form === 0 &&
                    <ScrollView style={{height:windowHeight-top_controls_height}}>
                    {
                        lista_abonos !== null &&
                        <DataTable 
                            table_data={table_data_filtered} 
                            update_abono={update_abono} 
                            update_type={update_type} 
                            lista_abonos={lista_abonos} 
                            lista_tipos={tipo_abono} 
                            filtro={filtro}
                            update_lock={setSafeLock}>
                        </DataTable>
                    }
                    </ScrollView>
            }
            <View style={styles.spacer30}></View>
        </View>
    )
}

function DataTable({table_data, update_abono, update_type, lista_abonos, lista_tipos, filtro, update_lock }) {
    const [combo_color, setComboColor] = useState([]);
    const [color_switch, setColorSwitch] = useState(0);
    const [filtered_data, setFilteredData] = useState([])
    const data1 = [
        { label: 'Normal', value: '2' },
        { label: 'Recuperado', value: '5' },
        { label: 'Parcial', value: '4' },
        { label: 'Adelantado', value: '6' },
    ];

    useEffect(() => {
        let colores = []
        for(let i = 0; i < lista_abonos.length ; i++){
            colores.push('transparent')
        }
        setComboColor(colores)
    },[])

    const change_color = (key, type) => {
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
        const nextColors = combo_color.map((c, i) => {
            if (i === key) {
                return color;
            } else {
                return combo_color[i];
            }
        });
        setComboColor(nextColors);
    }
    
    return (
        <View>
            <View>
                {
                    table_data.map((data,i) => (
                        i % 2 === 0 ?
                        <View key={i} >
                            <View style={[styles.tableRowEven]}>
                                <Text style={[styles.cell, {marginLeft:20}]}>{data[0]}</Text>
                                <View>
                                    <Text style={styles.cell}>{data[1]}</Text>
                                    <View style={[styles.cellHorizontal,{marginTop:-20}]}>
                                        <Text style={[styles.cell,{marginLeft:-40, marginTop:17}]}>Abono #{String(data[2]+1)}:</Text>
                                        <CurrencyInput style={[styles.cellInput,{width:70,  backgroundColor:combo_color[i]}]}
                                                delimiter=","
                                                precision={0}
                                                minValue={0}
                                                maxValue={9999}
                                                prefix="$"
                                                placeholder='$0'
                                                onChangeValue={(value) => {update_abono(i, value); update_lock(1)}}
                                                value={String(lista_abonos[i].value)}/>
                                        <Text style={[styles.cell, {marginTop:17}]}>Tipo:</Text>
                                        <Dropdown style={[styles.cellCombo, {width:140}]}
                                        data={data1} 
                                        labelField="label" valueField="value"
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={[styles.cellComboBoxSelected,{marginTop:5}]}
                                        value={lista_tipos[i]}
                                        onChange={item => {update_type(i, item); change_color(i,item); update_lock(1)}}/>
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
                                        <CurrencyInput style={[styles.cellInput,{width:70,backgroundColor:combo_color[i]}]}
                                                delimiter=","
                                                precision={0}
                                                minValue={0}
                                                maxValue={9999}
                                                prefix="$"
                                                placeholder='$0'
                                                onChangeValue={(value) => {update_abono(i, value); update_lock(1)}}
                                                value={String(lista_abonos[i].value)}/>
                                        <Text style={[styles.cell, {marginTop:17}]}>Tipo:</Text>
                                        <Dropdown style={[styles.cellCombo, {width:140}]}
                                        data={data1}
                                        labelField="label" valueField="value"
                                        placeholderStyle={styles.comboBoxPlaceholder}
                                        selectedTextStyle={[styles.cellComboBoxSelected,{marginTop:5}]}
                                        value={lista_tipos[i]}
                                        onChange={item => {update_type(i, item); change_color(i,item); update_lock(1)}}/>
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

export default Abonos