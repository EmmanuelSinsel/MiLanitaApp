import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locker } from '../Utils';
import { getListaClientesAPI } from '../services/ServiceClientes';
import { getGruposAPI, getRutasAPI } from '../services/ServiceOtros';

const ConsultaClientes = ({navigation}) => {
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [listaRutas, setListaRutas] = useState([]);
    const [listaGrupos, setListaGrupos] = useState([]);
    const [page,                setPage] = useState(1);
    const [filtroText,           setFiltro] = useState('');
    const [filteredTableData, setFilteredTableData] = useState(null)
    const [rutaNoEditable,                setRutaText] = useState('');
    const [tableData, setTableData] = useState([])
    const [maxPages, setMaxPages] = useState([]);
    useEffect(() => {
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
    }, [ getRutas]);

    const filterTable = (value) =>{
        setPage(1)
        const filtro_upper = value.toUpperCase()
        setFiltro(value)
        getClientes(1, 100, grupo, filtro_upper)
        
    }
    function backMainScreen() {
        navigation.goBack()
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 5;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };

    const nextChunk = () => {
        let pg = page + 1
        if(pg <= maxPages){
            addClientes(pg, 100, grupo, filtroText)
        }
    }

    const addClientes = useCallback(async (p, pSize, idGrupo, filtro) => {
        const res = await getListaClientesAPI(p, pSize, idGrupo, filtro)
        const data = res.data
        let tempClientes = []
        const clientes = data.clientes
        for(let i = 0; i < clientes.length ; i++){
            tempClientes.push([clientes[i].idCliente,clientes[i].nomCliente])
        }
        setTableData(tableData => [...tableData, ...tempClientes])
        setMaxPages(data.paginas)

        setPage(p)
    }, [])

    const getClientes = useCallback(async (p, pSize, idGrupo, filtro) => {
        setPage(1)
        const res = await getListaClientesAPI(p, pSize, idGrupo, filtro)
        const data = res.data
        let tempClientes = []
        const clientes = data.clientes
        for(let i = 0; i < clientes.length ; i++){
            tempClientes.push([clientes[i].idCliente,clientes[i].nombreCliente])
        }
        setMaxPages(data.paginas)
        setTableData(tempClientes)
    }, [])

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


    return (
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
                    <Text style={styles.mainHeadersInverted}>Consulta de Clientes</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
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
                                data={listaGrupos} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={grupo}
                                onChange={item => {setGrupo(item.value); getClientes(page, 100, item.value, "")}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>

                <View style={[styles.textBoxBorder, {}]}>
                            <Text style={styles.textBoxLabel}>Buscador</Text>
                            <TextInput style={styles.textBox}
                            onChangeText={value => {filterTable(value)}}
                            defaultValue={filtroText}/>
                </View>
                {
                    grupo === '' &&
                    <Locker></Locker>
                }
            </View>
            <View style={styles.spacer20}></View>
            <ScrollView style={{height:"76%"}} onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    nextChunk();
                }
            }}>
                {
                    filteredTableData === null ?
                    <DataTable tableData={tableData} navigation={navigation}></DataTable>:
                    <DataTable tableData={filteredTableData} navigation={navigation}></DataTable>
                }
                <View style={styles.spacer10}></View>
                {
                    tableData.length >= page * 100 ? 
                    <View style={[styles.textBoxContainerFull,{ height:50 }]}>
                        <Image style={[styles.loadingImage,{height:50, marginLeft:5}]}
                            source={ImageIndex.loading}>
                        </Image>
                    </View>
                    :
                    <View></View>
                }
            </ScrollView>
        </View>
    )
}
function DataTable({tableData, navigation}) {
    const editPrestamo = (idCliente) => {
        navigation.navigate("FormClientes",{ label:"Cliente #"+String(idCliente), button:"Actualizar Cliente", id: idCliente });
    }
    return (
        <View>
            <View style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                <Text style={[styles.cell,{fontWeight:"bold", width:50}]}>ID. C</Text>
                <View>
                    <Text style={[styles.cell,{fontWeight:"bold", width:320}]}>Cliente</Text>
                </View>
            </View>
            {
                tableData.map((data,i) => (
                    i % 2 === 0 ?
                    <TouchableOpacity onPress={() => editPrestamo(data[0])} key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}>
                        <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                        <View>
                            <Text style={[styles.cell,{ width:320}]}>{data[1]}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => editPrestamo(data[0])} key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                        <Text style={[styles.cell,{ width:50}]}>{data[0]}</Text>
                        <View>
                            <Text style={[styles.cell,{ width:320}]}>{data[1]}</Text>
                        </View>
                    </TouchableOpacity>

                ))
            }
        </View>
    )
}


export default ConsultaClientes;