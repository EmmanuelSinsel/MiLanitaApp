import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, ScrollView,useWindowDimensions, Image, Alert } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect, useCallback} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import MapView from 'react-native-maps';
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import ServicePrestamos, { getImagenGaleriaAPI, get_imagenAPI } from '../services/ServicePrestamos';
import { Locker } from '../Utils';

const GaleriaPreview = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [image_label, setImageLabel] = useState(null);
    const [loading, setLoading] = useState(1);
    const {width} = useWindowDimensions();
    const height = Math.round((width * 4) / 3);
    const route = useRoute()
    const [nombreCliente, setNombreCliente] = useState(null)
    const [domCliente, setDomCliente] = useState(null)
    const [idPrestamo, setIdPrestamo] = useState(null)
    useEffect(() => {
        if(type=route.params?.imageType == 'ine'){
            setImageLabel("INE")
        }
        if(type=route.params?.imageType == 'dom'){
            setImageLabel("Domicilio")
        }
        if(type=route.params?.imageType == 'garantia'){
            setImageLabel("Garantia")
        }
        setLoading(1)
        get_photo(route.params?.idPrestamo, route.params?.imageType)
        setIdPrestamo(String(route.params?.idPrestamo))
    },[])

    function backMainScreen() {
        navigation.goBack()
    }

    const get_photo = useCallback(async (idPrestamo, imageType) => {
        const res = await getImagenGaleriaAPI(idPrestamo=idPrestamo, imageType=imageType)
        const data = res.data
        setLoading(0)
        setImage('data:image/png;base64,'+data.image)
        setNombreCliente(data.prestamo.nombreCliente)
        setDomCliente(data.prestamo.domCliente)
    }, [])

    return (
        <View style={[styles.cameraBackground,{backgroundColor:"white"}]}>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                    <Text style={styles.mainHeadersInverted}>Foto de {image_label}</Text>
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
                <Image style={{height:height, width:width}} source={{uri: image}} />
            </View>
            {
                nombreCliente !== null &&
                <ScrollView>
                    <View style={styles.spacer20}></View>
                    <View style={styles.formRow}>
                        <View style={[styles.textBoxContainerHalf]}>
                            <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Id Prestamo</Text>
                                <TextInput style={styles.textBox}
                                selection={{start:0, end:0}}
                                value={idPrestamo}/>
                            </View> 
                            <Locker></Locker>
                        </View>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={[styles.textBoxContainerFull]}>
                        <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                            <TextInput style={styles.textBox}
                            selection={{start:0, end:0}}
                            value={nombreCliente}/>
                        </View> 
                        <Locker></Locker>
                    </View>
                    <View style={styles.spacer20}></View>
                    <View style={[styles.textBoxContainerFull]}>
                        <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Domicilio del Cliente</Text>
                            <TextInput style={styles.textBox}
                            selection={{start:0, end:0}}
                            value={domCliente}/>
                        </View> 
                        <Locker></Locker>
                    </View>
                    <View style={styles.spacer20}></View>
                </ScrollView>
            }
            
        </View>

    )
}


export default GaleriaPreview