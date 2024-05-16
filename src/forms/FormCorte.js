import { StatusBar } from 'expo-status-bar';
import { Text, View,  TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect } from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import ServiceOtros from '../services/ServiceOtros';
import { useRoute } from "@react-navigation/native"
import ServicePrestamos from '../services/ServicePrestamos';

const Corte = ({navigation}) => {
    const route = useRoute()
    let servicePrestamos = new ServicePrestamos()
    let service = new ServiceOtros()
    const [topLabel, setTopLabel] = useState("Corte de Caja")
    const [corteData, setCorteData] = useState(null)
    const [estatusCaja, setEstatusCaja] = useState('')
    const [fecha, setFecha] = useState('dd/mm/yyyy')
    const [equipo, setEquipo] = useState('equipo1')
    const [inicio, setInicio] = useState('1')
    const [final, setFinal] = useState('2')
    const [sobrante, setSobrante] = useState('0')
    const [faltante, setFaltante] = useState('0')
    const [ruta, setRuta] = useState(null)
    const [multa, setMulta] = useState('0')
    const [listaRutas, setListaRutas] = useState([]);
    const [loading, setLoading] = useState(0)
    useEffect(() => {
        if(route.params?.constRuta){
            getCorte(route.params?.constRuta)
        }
        getRutas()
    },[getCorte])

    function backMainScreen() {
        navigation.goBack()

    }

    const getRutas = useCallback(async () => {
        const res = await servicePrestamos.getRutas()
        const data = res.data
        let tempRutas = []
        for(let i = 0; i < data.length ; i++){
            tempRutas.push({"label":data[i].ruta,"value":data[i].idRuta})
        }
        setListaRutas(tempRutas)
    }, [])

    const getCorte = useCallback(async (idRuta) => {
        setLoading(1)
        const res = await service.getCorte(idRuta)
        console.log(res)
        setLoading(0)
        const data = res.data
        const caja = res.data_caja
        setFecha(caja.fecha)
        setEquipo(caja.equipo)
        setInicio(caja.inicio)
        setFinal(caja.final)
        setSobrante(caja.sobrante)
        setFaltante(caja.faltante)
        setMulta(caja.multa)
        setEstatusCaja(caja.estatus)
        setTopLabel("Corte de Caja - #"+caja.id_caja)
        let data_grupos = []
        for(let i = 0; i < data.length ; i++){
            const dataGrupo = data[i]
            const grupo = dataGrupo.grupo
            const total = dataGrupo.total
            const comision = dataGrupo.comision
            const cobranza = dataGrupo.cobranza
            const final = dataGrupo.final
            const dataPrestamos = dataGrupo.prestamos
            let prestamos = []
            for (const [key, value] of Object.entries(dataPrestamos)) {
                const totalPrestamo = Number(value.importe)*Number(value.cantidad)
                prestamos.push({
                    cantidad:value.importe,
                    numero:value.cantidad,
                    total:totalPrestamo})
            }
            data_grupos.push({
                grupo:grupo, 
                total:total, 
                comision:comision, 
                cobranza:cobranza, 
                final:final, 
                prestamo:prestamos})
        }
        setCorteData(data_grupos)
    }, [])

    return(
        <View style={{height:"100%", backgroundColor:"white"}}>
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
            <View style={styles.spacer30}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Ruta</Text>
                        <Dropdown style={styles.comboBox}
                        data={listaRutas}
                        labelField="label" valueField="value"
                        searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                        placeholderStyle={styles.comboBoxPlaceholder}
                        selectedTextStyle={styles.comboBoxSelected}
                        value={ruta}
                        onChange={item => {setRuta(item.value);getCorte(item.value)}}/>
                    </View>
                </View>
                {
                    corteData !== null &&
                    <View style={[styles.textBoxContainerHalf]}>
                        <View style={[styles.textBoxBorder]}>
                            <Text style={styles.textBoxLabel}>Estatus</Text>
                            <Text style={[styles.textBox,{textAlignVertical:"center"}]}>{estatusCaja}</Text>
                        </View>
                    </View>
                }

            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.horizontalLine}></View>
            <ScrollView >
                <View style={styles.spacer10}></View>
                {
                    corteData !== null &&
                    <View style={[styles.corteTabla]}>
                        <View style={{flexDirection:"column"}}>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell, {borderTopLeftRadius:12}]}><Text style={styles.corteMainText}>Fecha </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> {fecha}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Equipo </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> {equipo}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Inicio </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> ${inicio}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Final </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> ${final}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Sobrante </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> ${sobrante}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Faltante </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> ${faltante}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer]}>
                                <View style={[styles.corteTopRowCell]}><Text style={styles.corteMainText}>Ruta </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> {ruta}</Text></View>
                            </View>
                            <View style={[styles.corteTopRowContainer,{ borderBottomWidth:0}]}>
                                <View style={[styles.corteTopRowCell, {borderBottomLeftRadius:12}]}><Text style={styles.corteMainText}>Multa </Text></View>
                                <View style={styles.corteTopCellValue}><Text style={styles.corteMainText}> ${multa}</Text></View>
                            </View>
                        </View>
                    </View>
                }
                
                {
                    corteData !== null &&
                    <View style={{flexDirection:"column", height:"100%"}}>
                    {
                        corteData.map((data,i) => (
                            <View key={i}>
                                <View style={styles.spacer10}></View>
                                <TablaCorte  pueblo={data.grupo} rowdata={data.prestamo} total={data.total} comision={data.comision} cobranza={data.cobranza} final={data.final}></TablaCorte>
                            </View>

                        ))
                    }
                    </View>
                }
                <View style={styles.spacer10}></View>
            </ScrollView>
        </View>
    )
}

const TablaCorte = ({pueblo, rowdata, total, comision, cobranza, final}) => {

    return(
        <View style={[styles.corteTabla]}>
            <View style={styles.corteTablaHeader}>
                <Text style={styles.corteMainText}>Pueblo: </Text>
                <Text style={styles.corteVarText}>{pueblo}</Text>
            </View>
            <View style={{flexDirection:"row", height:"auto"}}>
                <View style={{flexDirection:"col", width:"75%"}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={styles.corteRowContainer}>
                            <View style={styles.corteRowCell}><Text style={styles.corteMainCellText}>Cantidad</Text></View>
                            <View style={styles.corteRowCell}><Text style={styles.corteMainText}>Numero</Text></View>
                            <View style={styles.corteRowCell}><Text style={styles.corteMainText}>Total $</Text></View>
                        </View>
                    </View>
                    {
                        rowdata.map((data,i) => (
                            <View key={i} style={{flexDirection:"row"}}>
                                <View style={styles.corteRowContainer}>
                                    <View style={styles.corteRowCell}><Text style={styles.corteCellText}>${data.cantidad}</Text></View>
                                    <View style={styles.corteRowCell}><Text style={styles.corteCellText}>{data.numero}</Text></View>
                                    <View style={styles.corteRowCell}><Text style={styles.corteCellText}>${data.total}</Text></View>
                                </View>
                            </View>
                        ))
                    }
                    <View style={{flexDirection:"row"}}>
                        <View style={styles.corteRowContainer}>
                            <View style={styles.corteInfoRowCell}><Text style={styles.corteInfoCellText}>Total </Text></View>
                            <View style={styles.corteInfoRowCellValue}><Text style={styles.corteMainText}> ${total}</Text></View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={styles.corteRowContainer}>
                            <View style={styles.corteInfoRowCell}><Text style={styles.corteInfoCellText}>Comision </Text></View>
                            <View style={styles.corteInfoRowCellValue}><Text style={styles.corteMainText}> ${comision}</Text></View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={[styles.corteRowContainer,{borderBottomLeftRadius:15}]}>
                            <View style={[styles.corteInfoRowCell, {borderBottomLeftRadius:5}]}><Text style={styles.corteInfoCellText}>Cobranza </Text></View>
                            <View style={styles.corteInfoRowCellValue}><Text style={styles.corteMainText}> ${cobranza}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:"col", width:"25%"}}>
                    <View style={styles.corteColContainer}>
                        <Text style={styles.corteMainCellText}>${final}</Text>
                    </View>
                    <View style={[styles.corteColContainer, {marginTop:"50%"}]}>
                        <Text style={styles.corteMainCellText}>Multas</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Corte