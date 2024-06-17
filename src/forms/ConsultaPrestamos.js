import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { getPrestamosAPI } from '../services/ServicePrestamos';

const ConsultaPrestamos = ({navigation}) => {
    const [page,           setPage] = useState(1);
    const [filtroText,           setFiltro] = useState('');
    const [filteredTableData, setFilteredTableData] = useState(null)
    const [loading, setLoading] = useState(0)
    const [tableData, setTableData] = useState([])
    const [maxPages, setMaxPages] = useState([]);
    useEffect(() => {
        setLoading(1)
        getPrestamos(p=page, pSize=100, filtro="")
    }, [getPrestamos]);

    const filterTable = (value) =>{
        setPage(1)
        setLoading(1)
        if(value.length >= 2){
            const filtro_upper = value.toUpperCase()
            setFiltro(value)
            getPrestamos(p=1, pSize=100, filtro=filtro_upper)
        }else{
            setLoading(0)
        }
        if(value.length == 0){
            setLoading(1)
            setFiltro(value)
            getPrestamos(p=1, pSize=100, filtro="")
        }
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
            addPrestamos(p=pg, pSize=100, filtro=filtroText)
        }
    }

    const addPrestamos = useCallback(async (p, pSize, filtro) => {
        const res = await getPrestamosAPI(p=p, pSize=pSize, filtro=filtro)
        const data = res.data
        let tempPrestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            tempPrestamos.push([prestamos[i].id_prestamo,prestamos[i].nom_cliente])
        }
        setTableData(tableData => [...tableData, ...tempPrestamos])
        setMaxPages(data.paginas)
        setPage(p)
    }, [])

    const getPrestamos = useCallback(async (p, pSize, filtro) => {
        const res = await getPrestamosAPI(p=p, pSize=pSize, filtro=filtro)
        const data = res.data
        let tempPrestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            tempPrestamos.push([prestamos[i].id_prestamo,prestamos[i].nom_cliente])
        }
        setMaxPages(data.paginas)
        setTableData(tempPrestamos)
        prestamos_data = tempPrestamos
        setLoading(0)
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
                            
                            defaultValue={filtroText}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            {
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
            <ScrollView style={{height:"76%"}} onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    nextChunk();
                }}}>
                <View>
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
                </View>
                

            </ScrollView>
        </View>
    )
}
function DataTable({tableData, navigation}) {
    const editPrestamo = (idPrestamo) => {
        navigation.navigate("FormPrestamos",{ label:"Prestamo #"+String(idPrestamo), button:"Actualizar Prestamo", id: idPrestamo });
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


export default ConsultaPrestamos;