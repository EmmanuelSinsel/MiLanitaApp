import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect,} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import ServiceAbonos from '../services/ServiceAbonos';
import ServicePrestamos from '../services/ServicePrestamos';
import CurrencyInput from 'react-native-currency-input';
import ServiceOtros from '../services/ServiceOtros';

const ListaCajas = ({navigation}) => {
    let serviceCajas = new ServiceOtros()
    const [statusCajas, setStatusCajas] = useState(null)
    const [loading, setLoading] = useState(0)
    let m = ""
    function backMainScreen() {
        navigation.goBack()
    }
    useEffect(() => {
        getEstadoCajas()
    }, []);

    const getEstadoCajas = useCallback(async () => {
        setLoading(1)
        const res = await serviceCajas.getStatusCajas()
        setLoading(0)
        const data = res.data
        let cajas = []
        for(let i = 0; i< data.length ; i++){
            cajas.push({"idRuta":data[i].id_ruta, "ruta": data[i].ruta, "status":data[i].status})
        }
        setStatusCajas(cajas)
    },[])

    const administrarCaja = (idRuta, ruta, status) => {
        navigation.navigate("FormCajas",{ idRuta: idRuta, ruta: ruta, status: status });
    }
    
    return(
        <View style={{backgroundColor:"white", height:"100%"}}>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                        <Text style={styles.mainHeadersInverted}>Cajas</Text>
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
            <View>
                {
                    statusCajas !== null &&
                    <ScrollView>
                    {
                        statusCajas.map((data,i) => (
                            i % 2 === 0 ?
                            <TouchableOpacity key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]} 
                            onPress={() => administrarCaja(data.idRuta, data.ruta, data.status)}>
                                <View style={{width:"90%", height:"100%"}}>
                                    <Text style={[styles.cell,{}]}>   {data.ruta}</Text>
                                </View>
                                {
                                    data.status === "Abierta" &&
                                    <View style={{backgroundColor:"green", width:30, height:30, borderRadius:15}}></View>
                                }
                                {
                                    data.status === "Cerrada" &&
                                    <View style={{backgroundColor:"red", width:30, height:30, borderRadius:15}}></View>
                                }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity  key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}
                            onPress={() => administrarCaja(data.idRuta, data.ruta, data.status)}> 
                                <View style={{width:"90%", height:"100%"}}>
                                    <Text style={[styles.cell,{justifyContent:"center"}]}>   {data.ruta}</Text>
                                </View>
                                {
                                    data.status === "Abierta" &&
                                    <View style={{backgroundColor:"green", width:30, height:30, borderRadius:15}}></View>
                                }
                                {
                                    data.status === "Cerrada" &&
                                    <View style={{backgroundColor:"red", width:30, height:30, borderRadius:15}}></View>
                                }
                            </TouchableOpacity>
                        ))
                    }
                    </ScrollView>
                }
            </View>

        </View>
        
    )
}

export default ListaCajas