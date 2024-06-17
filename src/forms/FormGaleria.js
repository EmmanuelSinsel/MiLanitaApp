import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { Locker } from '../Utils';
import { getGaleriaAPI, getGruposAPI, getRutasAPI, getThumbnailAPI } from '../services/ServiceOtros';

const FormGaleria = ({navigation}) => {
    const [ruta,                setRuta] = useState(0);
    const [grupo,               setGrupo] = useState(0);
    const [listaRutas, setListaRutas] = useState([]);
    const [listaGrupos, setListaGrupos] = useState([]);
    const [filtroText,           setFiltro] = useState('');
    //const [tableData, setTableData] = useState([])
    const [filteredTableData, setFilteredTableData] = useState(null)
    const [page,                setPage] = useState(1);
    const [grid, setGrid] = useState([])
    const [maxPages, setMaxPages] = useState(0)
    const [loading, setLoading] = useState(0)
    const [tableData, setTableData] = useState([])
    const [compareCount, setCompareCount] = useState(0)
    const [compareId1, setCompareId1] = useState(0)
    const [compareId2, setCompareId2] = useState(0)
    useEffect(() => {
        getRutas()
    },[getRutas])
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

    const filterTable = (value) =>{
        // setPage(1)
        // const filtro_upper = value.toUpperCase()
        // setFiltro(value)
        // getClientes(1, 100, grupo, filtro_upper)
    }

    const addImages = useCallback(async (p, pSize, idGrupo, filtro) => {
        const res = await getGaleriaAPI(p, pSize, idGrupo, filtro)
        const data = res.data
        let tempPrestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            tempPrestamos.push([prestamos[i].idPrestamo])
        }
        setGrid(tableData => [...tableData, ...tempPrestamos])
        setMaxPages(data.paginas)
        setPage(p)
    }, [])

    const getImages = useCallback(async (p, pSize, idGrupo, filtro) => {
        setPage(1)
        setLoading(1)
        const res = await getGaleriaAPI(p, pSize, idGrupo, filtro)
        const data = res.data
        let tempPrestamos = []
        const prestamos = data.prestamos
        for(let i = 0; i < prestamos.length ; i++){
            tempPrestamos.push([prestamos[i].idPrestamo])
        }
        let counter = 1;
        let row = []
        let tempGrid = []
        for(let i = 0 ; i < tempPrestamos.length ; i++){
            if(counter <= 3){
                row.push(tempPrestamos[i])
                counter += 1
            }
            if(counter == 4){
                tempGrid.push(row)
                row = []
                counter = 1
            }
            if(i == tempPrestamos.length-1 && row.length > 0){
                tempGrid.push(row)
            }
        }
        setGrid(tempGrid)
        setTableData(tempPrestamos)
        setMaxPages(data.paginas)
        setGrupo(idGrupo)
        console.log(idGrupo)
        setLoading(0)
    }, [])

    const deselectCompare = (index) => {
        if(index == 0){
            if(compareId2 != 0){
                setCompareId1(compareId2)
                setCompareCount(1)
            }else{
                setCompareId1(0)
                setCompareCount(0)
            }
        }if(index == 1){
            setCompareId2(0)
            setCompareCount(1)
        }
    }

    const setCompare = (counter, compareIdPrestamo) => {
        if(counter == 0){
            setCompareId1(compareIdPrestamo)
            setCompareCount(1)
        }if(counter == 1){
            setCompareId2(compareIdPrestamo)
            setCompareCount(2)
        }
    }

    const comparePreview = () => {
        navigation.navigate("ComparePreview",{ idPrestamo1: compareId1, idPrestamo2: compareId2});
    }

    return (
        <View style={[styles.background, {backgroundColor:"white", height:"100%"}]}>
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
                    <Text style={styles.mainHeadersInverted}>Galeria de Domicilios</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Ruta</Text>
                                <Dropdown style={styles.comboBox}
                                data={listaRutas}
                                labelField="label" valueField="value"
                                searchPlaceholder="Ruta.." placeholder='Ej. ML-1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={ruta}
                                onChange={item => {setRuta(item.value);getGrupos(item.value);}}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Grupo</Text>
                                <Dropdown style={styles.comboBox}
                                data={listaGrupos} valueField="value" 
                                labelField="label" placeholder='Ej. Grupo 1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={grupo}
                                onChange={item => {setGrupo(item.value); getImages(page, 100, item.value, "")}}/>
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
            <View>
            {
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
                <View style={{height:"85%"}}>
                    <ScrollView style={{height:"80%"}} onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            nextChunk();
                        }
                    }}>
                        {
                            filteredTableData === null ?
                            <DataTable tableData={grid} 
                                navigation={navigation} 
                                setCompare={setCompare} 
                                deselectCompare={deselectCompare}
                                counter={compareCount}>
                            </DataTable>:
                            <DataTable tableData={filteredTableData} 
                                navigation={navigation} 
                                setCompare={setCompare} 
                                deselectCompare={deselectCompare}
                                counter={compareCount}>
                            </DataTable>
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
                    <View style={styles.formRow}>
                        {
                            compareCount == 2 &&
                            <TouchableOpacity onPress={() => comparePreview()}
                                style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>Comparar</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                
            </View>
        </View>
        )
}

function DataTable({tableData, navigation, setCompare, deselectCompare, counter}) {
    return (
        <View>
            {
                tableData.map((row,i) => (
                    <View key={i} style ={{width:"100%", flexDirection:"row"}}>
                    {
                        row.map((cell, j) => (
                            <Thumbnail key={j} 
                                idPrestamo={cell[0]} 
                                navigation={navigation} 
                                setCompare={setCompare} 
                                deselectCompare={deselectCompare}
                                counter={counter}>
                            </Thumbnail>
                        ))
                    }
                    </View>
                ))
            }
        </View>
    )
}

function Thumbnail({idPrestamo, navigation, setCompare, deselectCompare, counter}){
    const [load, setLoad] = useState(0)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(0)
    const [selected, setSelected] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)
    useEffect(() => {
        if(load == 0){
            setLoad(1)
            setLoading(1)
            getThumbnail(idPrestamo)
            setLoading(0)
        }
    },[getThumbnail])

    const detallePrestamo = (idPrestamo) => {
        if(selected == 1){
            setSelected(0)
            deselectCompare(selectedIndex)
        }else{
            navigation.navigate("GaleriaPreview",{ idPrestamo: idPrestamo, imageType:'dom'});
        }
    }

    const getThumbnail = async (idPrestamo) => {
        if(load == 0){
            setLoad(1)
            const res = await getThumbnailAPI(Number(idPrestamo), "dom")
            const data = res.data
            const image ='data:image/png;base64,'+data.image
            setImage(image)
        }
    }

    const pressCompare = () => {
        if(counter <= 1){
            setSelected(1)
            setSelectedIndex(counter)
            setCompare(counter, idPrestamo)
        }
    }
    return(
        <View style={{flexDirection:"column", width:"33.3333333333%", borderWidth:2, borderColor:"white"}}>
            {
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
            <TouchableOpacity onPress={() => detallePrestamo(idPrestamo)} onLongPress={() => {pressCompare()}}>
                {
                    selected === 1 &&
                    <View style={{backgroundColor:"green", opacity:0.5, width:"100%", aspectRatio:1, position:"absolute", zIndex:10}}>
                    </View>
                }
                <Image style={styles.imageCell} source={{uri: image}} />
            </TouchableOpacity>
        </View>
    )
}

export default FormGaleria;