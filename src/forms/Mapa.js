import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ToastAndroid, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import MapView from 'react-native-maps';
import { useRoute } from "@react-navigation/native"
import axios from 'axios';

const Mapa = ({navigation}) => {

    function backMainScreen() {
        navigation.goBack()
    }

    const API_KEY = "65e9f381d1a1d516693667the63a9dd"
    let request_flag = 0
    const route = useRoute()
    const [latitude, setLat] = useState('')
    const [longitude, setLon] = useState('')
    const [address, setAddress] = useState('')
    const [editable, setEditable] = useState('')
    const [region, setRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    });
    
    const getActualRegion = () =>{
        if(route.params?.lat){
            setLat(route.params?.lat)
        }
        if(route.params?.lon){
            setLon(route.params?.lon)
        }       
        setRegion({
            latitude: route.params?.lat,
            longitude: route.params?.lon,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
        })
    }
    useEffect(() => {
        getActualRegion()
        console.log(editable)
        setEditable(route.params?.editable)
    }, [])

    const setFinalRegion = (lat, lon) => {
        ToastAndroid.show(lat + " " + lon, ToastAndroid.SHORT);
        navigation.navigate({
            name: 'FormPrestamos',
            params: { lat: lat, lon: lon },
            merge: true,
        });
    }

    const openMaps = (lat, lon) => {

    }

    const getAddress = async(lat, lon) =>{
        try {
            const response = await axios.get('https://geocode.maps.co/reverse?lat='+lat+'&lon='+lon+'&api_key='+API_KEY);
            let address = response.data.display_name
            setAddress(address)
            setLat(lat)
            setLon(lon)
            request_flag = 0
        } catch (error) {
            //console.error('Error fetching data:', error);
        }
    }

    const locationChange = (region) =>{
        setRegion(region)
        let latFloat = Number.parseFloat(region.latitude).toFixed(8)
        let lonFloat = Number.parseFloat(region.longitude).toFixed(8)
        setLat(latFloat)
        setLon(lonFloat)
        if(request_flag == 0){
            request_flag = 1
            getAddress(latFloat, lonFloat)
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                    <Text style={styles.mainHeadersInverted}>Ubicacion</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={{flex:1, justifyContent:"center", flexDirection:"row"}}>
                {
                    editable === false &&
                    <View style={{position:"absolute", width:"100%", height:"100%", zIndex:2}}></View>
                }
                <View style={{alignSelf:"flex-start", position:"absolute",height:90, width:"80%", zIndex:1, marginTop:20, backgroundColor:"white", borderRadius:15}}>
                <Text style={styles.textBoxLabel}>Direccion</Text>
                        <Text style={[styles.textBox,{fontSize:18, paddingTop:10, textAlign:"justify", paddingRight:10}]}>
                            {address}
                        </Text>
                </View>
                <MapView style={styles.map} region={region}
                onRegionChangeComplete={locationChange}/>
                <View style={{height:100, alignSelf:"center"}}>
                    <Image style={[styles.mapPointer,{tintColor:"red"}]}
                        source={ImageIndex.gps}>
                    </Image>
                </View>
                <Text style={{position:"absolute"}}></Text>
                {
                    editable === true &&
                    <View style={{alignSelf:"flex-end", position:"absolute", height:100, width:"80%"}}>
                        <TouchableOpacity onPress={() => setFinalRegion(latitude, longitude)}
                            style={styles.mainButtonFloating}>
                            <Text style={styles.mainButtonText}>Capturar Ubicacion</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    editable === false &&
                    <View style={{alignSelf:"flex-end", position:"absolute", height:100, width:"80%", zIndex:10}}>
                        <TouchableOpacity onPress={() => openMaps(latitude, longitude)}
                            style={styles.mainButtonFloating}>
                            <Text style={styles.mainButtonText}>Abrir en Mapas</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
        
    )
}


export default Mapa