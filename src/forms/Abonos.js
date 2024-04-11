import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button, Pressable, ToastAndroid, TouchableOpacity, ScrollView, Image } from 'react-native';
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
        console.log(new_list)
    }
    const update_abono = (id, value) => {
        if(value == null){
            value = 0
        }
        const newInputs = lista_abonos.map(input =>
            input.id === id ? { ...input, value: value } : input
        );
        setAbono(newInputs);
        console.log(newInputs)
    }
    //FORMULARIO
    let serviceAbonos = new ServiceAbonos()
    let servicePrestamos = new ServicePrestamos()
    const [filtro,      setFiltro] = useState('');
    const [tableData, setTableData] = useState(null);
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    useEffect(() => {
        get_rutas()
    },[get_rutas])
    
    function backMainScreen() {
        navigation.goBack()
    }
    const get_rutas = useCallback(async () => {
        const data = await servicePrestamos.get_rutas()
        let temp_rutas = []
        for(let i = 0; i < data.length ; i++){
            temp_rutas.push({"label":data[i].ruta,"value":data[i].id_ruta})
        }
        setListaRutas(temp_rutas)
    }, [])
    const get_grupos = useCallback(async (id_ruta) => {
        const data = await servicePrestamos.get_grupos(id=id_ruta)
        let temp_grupos = []
        for(let i = 0; i < data.length ; i++){
            temp_grupos.push({"label":data[i].nom_grupo,"value":Number(data[i].id_grupo)})
        }
        setListaGrupos(temp_grupos)
    }, [])
    const get_lista_abonos = useCallback(async (id_grupo) => {
        const data = await serviceAbonos.get_lista_abonos(id_grupo)
        let temp_abonos = []
        for(let i = 0; i < data.length ; i++){
            temp_abonos.push([data[i].id_prestamo,data[i].nom_cliente,data[i].num_abono,data[i].abono])
        }
        setTableData(temp_abonos)
        let list = []
        let lista_abonos = []
        for(let i = 0; i < temp_abonos.length ; i++){
            list.push('1')
            lista_abonos.push({ id: i, value: temp_abonos[i][3] })
        }
        setTipoAbono(list)
        setAbono(lista_abonos)
    }, [])
    const guardar_lista_abonos = async (new_tipo_abono, new_lista_abonos, new_table_data) => {
        let data = []
        for(let i = 0 ; i < new_table_data.length ; i++){
            data.push({
                "id_prestamo":new_table_data[i][0],
                "no_abono":new_table_data[i][2]+1,
                "abono":new_lista_abonos[i].value,
                "tipo_abono":new_tipo_abono[i]
            })
        }
        data = {"abonos":data}   
        console.log(data)
        
        const res = await serviceAbonos.guardar_abonos(data)
        console.log(res)
    }

    return (
        <ScrollView style={styles.background}>
            <StatusBar backgroundColor='#70be44'/>
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
                    <TouchableOpacity style={styles.topBarSaveButton} onPress={() => guardar_lista_abonos(tipo_abono, lista_abonos, tableData) }>
                        <Text style={{fontSize:22, color:"white", fontWeight:"bold"}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
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
                                onChange={item => {setRuta(item.value);get_grupos(item.value);}}/>
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
                                onChange={item => {setGrupo(item.value); get_lista_abonos(item.value)}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Buscador</Text>
                            <TextInput style={styles.textBox}
                            onChangeText={value => setFiltro(value)}
                            defaultValue={filtro}/>
                </View>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.horizontalLine}></View>
            {
                lista_abonos !== null &&
                <DataTable tableData={tableData} update_abono={update_abono} update_type={update_type} lista_abonos={lista_abonos} lista_tipos={tipo_abono}></DataTable>
            }
            <View style={styles.spacer30}></View>
        </ScrollView>
    )
}

function DataTable({tableData, update_abono, update_type, lista_abonos, lista_tipos }) {
    const data1 = [
        { label: 'Normal', value: '1' },
        { label: 'Recuperado', value: '2' },
        { label: 'Parcial', value: '3' },
        { label: 'Adelantado', value: '4' },
    ];
    return (
        <View>
            <View>
                {
                    tableData.map((data,i) => (
                        i % 2 === 0 ?
                        <View key={i} style={[styles.tableRowEven]}>
                            <Text style={[styles.cell, {marginLeft:20}]}>{data[0]}</Text>
                            <View>
                                <Text style={styles.cell}>{data[1]}</Text>
                                <View style={styles.cellHorizontal}>
                                    <Text style={[styles.cell,{marginLeft:-40}]}>Abono #{String(data[2]+1)}:</Text>
                                    <CurrencyInput style={[styles.cellInput,{width:70}]}
                                            delimiter=","
                                            precision={0}
                                            minValue={0}
                                            maxValue={9999}
                                            prefix="$"
                                            placeholder='$0'
                                            onChangeValue={(value) => update_abono(i, value)}
                                            value={String(lista_abonos[i].value)}/>
                                    <Text style={styles.cell}>Tipo:</Text>
                                    <Dropdown style={[styles.cellCombo, {width:140}]}
                                    data={data1} search
                                    labelField="label" valueField="value"
                                    searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.cellComboBoxSelected}
                                    value={lista_tipos[i]}
                                    onChange={item => {update_type(i, item)}}/>
                                </View>
                            </View>
                        </View>
                        :
                        <View key={i} style={styles.tableRowOdd}> 
                            <Text style={[styles.cell, {marginLeft:20}]}>{data[0]}</Text>
                            <View>
                                <Text style={styles.cell}>{data[1]}</Text>
                                <View style={styles.cellHorizontal}>
                                    <Text style={[styles.cell,{marginLeft:-40}]}>Abono #{String(data[2]+1)}:</Text>
                                    <CurrencyInput style={[styles.cellInput,{width:70}]}
                                            delimiter=","
                                            precision={0}
                                            minValue={0}
                                            maxValue={9999}
                                            prefix="$"
                                            placeholder='$0'
                                            onChangeValue={(value) => update_abono(i, value)}
                                            value={String(lista_abonos[i].value)}/>
                                    <Text style={styles.cell}>Tipo:</Text>
                                    <Dropdown style={[styles.cellCombo, {width:140}]}
                                    data={data1} search
                                    labelField="label" valueField="value"
                                    searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                    placeholderStyle={styles.comboBoxPlaceholder}
                                    selectedTextStyle={styles.cellComboBoxSelected}
                                    value={lista_tipos[i]}
                                    onChange={item => {update_type(i, item)}}/>
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