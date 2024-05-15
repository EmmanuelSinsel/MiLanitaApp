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
import ServicePrestamos from '../services/ServicePrestamos';

const Preview = ({navigation}) => {
    let service = new ServicePrestamos()
    const [image, setImage] = useState(null);
    const [image_label, setImageLabel] = useState(null);
    const [loading, setLoading] = useState(1);
    const {width} = useWindowDimensions();
    const height = Math.round((width * 4) / 3);
    const route = useRoute()
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
        get_photo(idPrestamo=route.params?.idPrestamo, type=route.params?.imageType)
    },[])

    function backMainScreen() {
        navigation.goBack()
    }

    const get_photo = useCallback(async (idPrestamo, imageType) => {
        const res = await service.get_imagen(idPrestamo=idPrestamo, imageType=imageType)
        const data = res.data
        setLoading(0)
        setImage('data:image/png;base64,'+data.image)
    }, [])

    return (
        <View style={styles.cameraBackground}>

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
        </View>

    )
}


export default Preview