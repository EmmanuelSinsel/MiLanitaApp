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
import ServicePrestamos, { getImagenGaleriaAPI, getImagenGaleriaImagenAPI, get_imagenAPI } from '../services/ServicePrestamos';
import { Locker } from '../Utils';

const ComparePreview = ({navigation}) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image_label, setImageLabel] = useState(null);
    const [loading, setLoading] = useState(1);
    const {width} = useWindowDimensions();
    const height = Math.round((width * 4) / 3);
    const route = useRoute()
    const [nombreCliente, setNombreCliente] = useState(null)
    const [domCliente, setDomCliente] = useState(null)
    const [idPrestamo1, setIdPrestamo1] = useState(null)
    const [idPrestamo2, setIdPrestamo2] = useState(null)
    useEffect(() => {
        setLoading(1)
        setImageLabel("Comparar fotos")
        getPhotos()
        setIdPrestamo1(Number(route.params?.idPrestamo1))
        setIdPrestamo2(Number(route.params?.idPrestamo2))
    },[])

    function backMainScreen() {
        navigation.goBack()
    }

    const getPhotos = async() => {
        const img1 = await getPhoto(route.params?.idPrestamo1, "dom")
        const img2 = await getPhoto(route.params?.idPrestamo2, "dom")
        setImage1(img1)
        setImage2(img2)
        setLoading(0)
    }

    const getPhoto = useCallback(async (idPrestamo, imageType) => {
        const res = await getImagenGaleriaImagenAPI(idPrestamo=idPrestamo, imageType=imageType)
        const data = res.data
        return 'data:image/png;base64,'+data.image
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
                    <Text style={styles.mainHeadersInverted}>{image_label}</Text>
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
                <View style={{height:"47%", width:width}}>
                    <Text style={{zIndex:10, position:"absolute", fontSize:18, color:"white", fontWeight:"bold"}}> Prestamo #{idPrestamo1}</Text>
                    <Image style={{height:"100%", width:width}} source={{uri: image1}} />
                </View>
                <View style={{height:"47%", width:width}}>
                    <Text style={{zIndex:10, position:"absolute", fontSize:18, color:"white", fontWeight:"bold"}}> Prestamo #{idPrestamo2}</Text>
                    <Image style={{height:"100%", width:width}} source={{uri: image2}} />
                </View>
            </View>    

        </View>
    )
}


export default ComparePreview