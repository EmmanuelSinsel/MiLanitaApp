import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect,} from 'react';
import ImageIndex from '../ImageIndex';
import CurrencyInput from 'react-native-currency-input';
import { abrirCajaAPI, actualizarCajaAPI, cerrarCajaAPI, detalleCajaAPI, eliminarPreregistroCajaAPI, getIdCajaRutaAPI, getPreregistroCajaAPI } from '../services/ServiceOtros';
import { useRoute } from '@react-navigation/native';
import { Locker } from '../Utils';
import { Navigation } from 'react-native-feather';
import Toast from 'react-native-root-toast';
const FormCajas = ({navigation}) => {
    function backMainScreen() {
        if(route.params?.status == "Cerrada"){
            setCancel(1)
        }else{
            navigation.goBack()
        }
    }
    const [listaRutas, setListaRutas] = useState([]);
    const [ruta,                setRuta] = useState('');
    const [statusCaja, setStatusCaja] = useState('');
    const [idCaja, setIdCaja] = useState(-1);
    const [montoFinal, setMontoFinal] = useState(0);
    const [montoEntregado, setMontoEntregado] = useState(0);
    const [montoApertura, setMontoApertura] = useState(0);
    const [cancel, setCancel] = useState(0)
    const [mode, setMode] = useState(null)
    const [cancelMode, setCancelMode] = useState(1)
    const [label, setLabel] = useState(null)
    const route = useRoute()
    useEffect(() => {
        const backAction = () => {
            if(route.params?.status == "Abierta" || route.params?.status == "Editar"){
                return false;
            }else{
                setCancel(1)
                return true;
            }
        }
        const getData = async() => {
            if(route.params?.status == "Cerrada"){
                getSiguienteIdCaja()
                setLabel("Abrir Caja")
            }if(route.params?.status == "Abierta"){
                getIdCajaRuta(route.params?.idRuta)
                setLabel("Cerrar Caja")
            }
            if(route.params?.status == "Editar"){
                const id_caja = await getIdCajaRuta(route.params?.idRuta)
                await getDetalleCaja(id_caja)
                setLabel("Actualizar Caja")
            }
        }
        getData()
        const backHandlerPrestamos = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const eliminarPreregistro = useCallback(async (id_caja, cancelMode) => {
        const res = await eliminarPreregistroCajaAPI(id_caja)
        if(cancelMode == 1){
            navigation.goBack()
        }
    })

    const getIdCajaRuta = useCallback(async (ruta) => {
        const res = await getIdCajaRutaAPI(ruta)
        const id_caja = res.id_caja
        setIdCaja(String(id_caja))
        return id_caja
    })

    const getSiguienteIdCaja = useCallback(async () => {
        const res = await getPreregistroCajaAPI()
        const id_caja = res.nextId
        setIdCaja(String(id_caja))
    })

    const getDetalleCaja = useCallback(async (id_caja) => {
        const res = await detalleCajaAPI(id_caja)
        console.log(res)
        setMontoApertura(res.data.monto_apertura)
    })

    const abrirCaja = useCallback(async (newIdCaja, newMontoApertura) => {
        const caja = {
            id_caja: newIdCaja,
            ruta: route.params?.idRuta,
            monto_apertura: newMontoApertura,
        }
        const res = await abrirCajaAPI(caja)
        let toast = Toast.show('Caja Abierta', {
            duration: Toast.durations.SHORT,
        });
        navigation.goBack()

    })

    const cerrarCaja = useCallback(async (newIdCaja, newMontoFinal, newMontoEntregado) => {
        const res = await cerrarCajaAPI(newIdCaja, newMontoFinal, newMontoEntregado)
        let toast = Toast.show('Caja Abierta', {
            duration: Toast.durations.SHORT,
        });
        navigation.goBack()
    })

    const actualizarCaja = useCallback(async (newIdCaja, newMontoInicial) => {
        const res = await actualizarCajaAPI(newIdCaja, newMontoInicial)
        let toast = Toast.show('Caja Actualizada', {
            duration: Toast.durations.SHORT,
        });
        navigation.goBack()
    })

    return (
        <View style={{backgroundColor:"white", height:"100%"}}>
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
                                onPress={() => {eliminarPreregistro(idCaja, cancelMode);}}>
                                    <Text style={{fontSize:22, alignSelf:"center", color:"white"}}>Si</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:"50%"}}>
                                <TouchableOpacity 
                                style={{alignSelf:"center", width:'70%', backgroundColor:"red", height:50, justifyContent:"center", borderRadius:15}}
                                onPress={() => {setCancel(0)}}>
                                    <Text style={{fontSize:22, alignSelf:"center", color:"white"}}>No</Text>
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
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                        <Text style={styles.mainHeadersInverted}>{label}</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Ruta</Text>
                        <TextInput style={styles.textBox}
                        selection={{start:0, end:0}}
                        defaultValue={route.params?.ruta}/>
                        <Locker></Locker>
                    </View>
                </View>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.horizontalLine}></View>
            <View>
                <View style={styles.spacer10}></View>
                {
                    route.params?.status == "Cerrada" &&
                    <View>
                        <View style={styles.formRow}>
                            <View style={styles.textBoxContainerHalf}>
                                <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Caja</Text>
                                    <TextInput style={styles.textBox}
                                    value={idCaja}/>
                                </View>
                                {<Locker></Locker>}
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.textBoxContainerFull}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Monto de Apertura</Text>
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={999999}
                                prefix="$"
                                onChangeValue={value => {setMontoApertura(value)}}
                                value={montoApertura}/>
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.formRow}>
                            <TouchableOpacity onPress={() => abrirCaja(idCaja, montoApertura)}
                            style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>Abrir Caja</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }       
                {
                    route.params?.status == "Abierta" &&
                    <View>
                        <View style={styles.textBoxContainerFull}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Monto Final</Text>
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={999999}
                                prefix="$"
                                onChangeValue={value => {setMontoFinal(value);setMontoEntregado(value)}}
                                value={montoFinal}/>
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.textBoxContainerFull}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Monto Entregado</Text>
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={999999}
                                prefix="$"
                                onChangeValue={(value) => setMontoEntregado(value)}
                                value={montoEntregado}/>
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.formRow}>
                            <TouchableOpacity onPress={() => cerrarCaja(idCaja, montoFinal, montoEntregado)}
                            style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>Cerrar Caja</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    route.params?.status == "Editar" &&
                    <View>
                        <View style={styles.formRow}>
                            <View style={styles.textBoxContainerHalf}>
                                <View style={styles.textBoxBorder}>
                                    <Text style={styles.textBoxLabel}>ID Caja</Text>
                                    <TextInput style={styles.textBox}
                                    value={idCaja}/>
                                </View>
                                {<Locker></Locker>}
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.textBoxContainerFull}>
                            <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Monto de Apertura</Text>
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={999999}
                                prefix="$"
                                onChangeValue={value => {setMontoApertura(value)}}
                                value={montoApertura}/>
                            </View>
                        </View>
                        <View style={styles.spacer20}></View>
                        <View style={styles.formRow}>
                            <TouchableOpacity onPress={() => actualizarCaja(idCaja, montoApertura)}
                            style={styles.mainButtonFloating}>
                                <Text style={styles.mainButtonText}>Actualizar Caja</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }  
            </View>
        </View>
    )
}


export default FormCajas;