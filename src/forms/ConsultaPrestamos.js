import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, ToastAndroid, Alert } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import ServicePrestamos from '../services/ServicePrestamos';


const ConsultaPrestamos = ({navigation}) => {
    service = new ServicePrestamos()
    let prestamos = []
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [page,           setPage] = useState(1);
    const [filtro_text,           setFiltro] = useState('');
    const [filteredTableData, setFilteredTableData] = useState(null)
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const [tableData, setTableData] = useState([])
    const [max_pages, setMaxPages] = useState([]);
    let prestamos_data = []
    useEffect(() => {
        get_prestamos(p=page, p_size=100, filtro="")
    }, [get_prestamos]);

    const filterTable = (value) =>{
        setPage(1)
        if(value.length >= 2){
            const filtro_upper = value.toUpperCase()
            setFiltro(value)
            get_prestamos(p=1, p_size=100, filtro=filtro_upper)
        }
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
            add_prestamos(p=pg, p_size=100, filtro=filtro_text)
        }
    }

    const add_prestamos = useCallback(async (p, p_size, filtro) => {
        const data = await service.get_prestamos(p=p, p_size=p_size, filtro=filtro)
        let temp_prestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            temp_prestamos.push([prestamos[i].id_prestamo,prestamos[i].nom_cliente])
        }
        setTableData(tableData => [...tableData, ...temp_prestamos])
        setMaxPages(data.paginas)
        setPage(p)
    }, [])

    const get_prestamos = useCallback(async (p, p_size, filtro) => {
        const data = await service.get_prestamos(p=p, p_size=p_size, filtro=filtro)
        let temp_prestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            temp_prestamos.push([prestamos[i].id_prestamo,prestamos[i].nom_cliente])
        }
        setMaxPages(data.paginas)
        setTableData(temp_prestamos)
        prestamos_data = temp_prestamos
    }, [])

    return (
        <View style={styles.background} onScroll={({nativeEvent}) => {
                if (is_close_to_bottom(nativeEvent)) {
                    next_chunk();
                }
            }}>
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
                    <Text style={styles.mainHeadersInverted}>Consulta de Prestamos</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={[styles.textBoxBorder, {}]}>
                            <Text style={styles.textBoxLabel}>Buscador</Text>
                            <TextInput style={styles.textBox}
                            onChangeText={value => {filterTable(value)}}
                            defaultValue={filtro_text}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <ScrollView>
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
                <View style={styles.spacer10}></View>
            </ScrollView>
            
        </View>
    )
}
function DataTable({tableData, navigation}) {
    const [ruta,                setRuta] = useState('');
    const data1 = [
        { label: 'Normal', value: '1' },
        { label: 'Recuperado', value: '2' },
    ];
    const editPrestamo = (id_prestamo) => {
        navigation.navigate("FormPrestamos",{ label:"Prestamo #"+String(id_prestamo), button:"Actualizar Prestamo", id: id_prestamo });
    }
    return (
        <View>
            <View style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                <Text style={[styles.cell,{fontWeight:"bold", width:50}]}>ID</Text>
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


export default ConsultaPrestamos;