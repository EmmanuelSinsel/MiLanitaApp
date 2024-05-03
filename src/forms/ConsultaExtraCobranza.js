import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import ServiceClientes from '../services/ServiceClientes';
import ServicePrestamos from '../services/ServicePrestamos';

const ConsultaExtraCobranza = ({navigation}) => {
    let service = new ServiceClientes()
    let servicePrestamos = new ServicePrestamos()
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [lista_rutas, setListaRutas] = useState([]);
    const [lista_grupos, setListaGrupos] = useState([]);
    const [page,                setPage] = useState(1);
    const [filtro_text,           setFiltro] = useState('');
    const [filteredTableData, setFilteredTableData] = useState(null)
    const [tableData, setTableData] = useState([])
    const [max_pages, setMaxPages] = useState([]);
    useEffect(() => {
        get_rutas()
    }, [ get_rutas]);

    const filterTable = (value) =>{
        setPage(1)
        const filtro_upper = value.toUpperCase()
        setFiltro(value)
        get_prestamos(1, 100, grupo, filtro_upper)
        
    }
    function backMainScreen() {
        navigation.goBack()
    }

    const is_close_to_bottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 5;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };

    const next_chunk = () => {
        let pg = page + 1
        if(pg <= max_pages){
            add_prestamos(pg, 100, grupo, filtro_text)
        }
    }

    const add_prestamos = useCallback(async (p, p_size, id_grupo, filtro) => {
        const res = await servicePrestamos.get_prestamos_extra_cobranza(p, id_grupo, p_size, filtro)
        const data = res.data
        let temp_prestamos = []
        const clientes = data.prestamos
        for(let i = 0; i < clientes.length ; i++){
            temp_prestamos.push([clientes[i].id_prestamo,clientes[i].nom_cliente])
        }
        setTableData(tableData => [...tableData, ...temp_prestamos])
        setMaxPages(data.paginas)

        setPage(p)
    }, [])

    const get_prestamos = useCallback(async (p, p_size, id_grupo, filtro) => {
        setPage(1)
        const res = await servicePrestamos.get_prestamos_extra_cobranza(p, id_grupo, p_size, filtro)
        const data = res.data
        let temp_prestamos = []
        const clientes = data.prestamos
        for(let i = 0; i < clientes.length ; i++){
            temp_prestamos.push([clientes[i].id_prestamo,clientes[i].nom_cliente])
        }
        setMaxPages(data.paginas)
        setTableData(temp_prestamos)
    }, [])

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
                    <Text style={styles.mainHeadersInverted}>Extra Cobranza</Text>
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
                                onChange={item => {setGrupo(item.value); get_prestamos(page, 100, item.value, "")}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>

                <View style={[styles.textBoxBorder, {}]}>
                            <Text style={styles.textBoxLabel}>Buscador</Text>
                            <TextInput style={styles.textBox}
                            onChangeText={value => {filterTable(value)}}
                            defaultValue={filtro_text}/>
                </View>
                {
                    grupo === '' &&
                    <Locker></Locker>
                }
            </View>
            <View style={styles.spacer20}></View>
            <ScrollView style={{height:"76%"}} onScroll={({nativeEvent}) => {
                if (is_close_to_bottom(nativeEvent)) {
                    next_chunk();
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
    const editPrestamo = (id_cliente) => {
        navigation.navigate("FormExtraCobranza",{ label:"Cliente #"+String(id_cliente), id: id_cliente });
    }
    return (
        <View>
            <View style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                <Text style={[styles.cell,{fontWeight:"bold", width:50}]}>ID. P</Text>
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

function Locker(){
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


export default ConsultaExtraCobranza;