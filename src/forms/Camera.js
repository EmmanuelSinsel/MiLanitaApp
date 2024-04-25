import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, Image, useWindowDimensions, BackHandler } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { AutoFocus, Camera, CameraType, FlashMode} from 'expo-camera';
import { useRoute } from "@react-navigation/native"
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Camara = ({navigation}) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const route = useRoute()
    const [preview, setPreview] = useState(0);
    const [flash_type, setFlashType] = useState(FlashMode.off);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [photo_label, setPhotoLabel] = useState('')
    const [photo_type, setPhotoType] = useState(null)
    const [id_prestamo, setIdPrestamo] = useState(0)
    useEffect(() => {
        setIdPrestamo(route.params?.id_prestamo)
        setPhotoType(route.params?.photo_type)
        if(route.params?.photo_type == 1){
            setPhotoLabel("INE")
        }
        if(route.params?.photo_type == 2){
            setPhotoLabel("Domicilio")
        }
        if(route.params?.photo_type == 3){
            setPhotoLabel("Garantia")
        }
        const backAction = () => {
            if(preview == 1){
                setPreview(0)
                setImage(null)
                return true
            }else{
                return false
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    },[preview,image])

    function backMainScreen() {
        navigation.goBack()
    }

    function switchFlash(){
        if(flash_type == FlashMode.off){
            setFlashType(FlashMode.on)
        }if(flash_type == FlashMode.on){
            setFlashType(FlashMode.torch)
        }
        if(flash_type == FlashMode.torch){
            setFlashType(FlashMode.off)
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        setImage(result.assets[0].uri);
        setPreview(1)
    }

    function accept_photo(){
        navigation.navigate({
            name: 'FormPrestamos',
            params: { type: photo_type, photo: image, id_prestamo_return: id_prestamo },
            merge: true,
        });
    }
    function repeat_photo(){
        setPreview(0)
    }

    const {width} = useWindowDimensions();
    const height = Math.round((width * 4) / 3);

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(skipProcessing=true)
            const manipResult = await ImageManipulator.manipulateAsync(
                data.uri,
                [{ resize: { width: data.width/3, height: data.height/3 } }],
                { compress: 0.2, format: ImageManipulator.SaveFormat.PNG }
            );
            setImage(manipResult.uri);
            setPreview(1)
        }
    }
    return(
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
                    <Text style={styles.mainHeadersInverted}>Foto de {photo_label}</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            {
                photo_type === 1 ?
                <View style={{flex:1, height:"100%"}}>
                    {
                        preview === 0 ? 
                        <View style={{flex:1, height:"100%"}}>
                            <Camera ref={ref => setCamera(ref)} CameraPicture style={{height:"100%", aspectRatio:0.56, position:"absolute"}} type={type} flashMode={flash_type} autoFocus={AutoFocus.on} ratio='16:9'></Camera>
                            <View style={styles.cardBlueprint}>
                                <View style={styles.cardPhoto}></View>
                            </View>
                            <View style={{flex:1, height:"100%", justifyContent:"flex-end"}}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{flexDirection:"row", width:"33.3%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.flashSwitch} onPress={pickImage}>
                                            <Image source={ImageIndex.gallery} style={{tintColor:"white", height:40, aspectRatio:1.3, marginLeft:-5}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"row", width:"33.3%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.shutterButtonOverlay} onPress={takePicture}></TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"column", width:"33.3%", justifyContent:"center"}}>
                                        {
                                            flash_type === FlashMode.off ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.noFlash} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                        {
                                            flash_type === FlashMode.on ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.flash} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                                                        {
                                            flash_type === FlashMode.torch ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.torch} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View> 
                        : 
                        <View style={{flex:1, height:"100%"}}>
                            <Image style={{height:"100%", aspectRatio:0.56, position:"absolute"}} source={{uri: image}} />
                            <View style={{flex:1, height:"100%", justifyContent:"flex-end"}}>
                                <View style={{flexDirection:"row", marginBottom:20}}>
                                    <View style={{flexDirection:"row", width:"50%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.previewButton} onPress={accept_photo}>
                                            <Image source={ImageIndex.check} style={{tintColor:"white", height:70, aspectRatio:1}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"column", width:"50%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.previewButton} onPress={repeat_photo}>
                                            <Image source={ImageIndex.reload} style={{tintColor:"white", height:70, aspectRatio:1}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </View>
                :
                <View>
                    {
                        preview === 0 ?
                        <View>
                            <Camera ref={ref => setCamera(ref)} style={{height:height, width:width}} type={type} flashMode={flash_type} autoFocus={AutoFocus.on}  ratio='4:3'></Camera>
                            <View style={styles.cameraControlContainer}>
                                <View style={{flexDirection:"row", height:0, marginTop:50}}>
                                    <View style={{flexDirection:"row", width:"33.3%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.flashSwitch} onPress={pickImage}>
                                            <Image source={ImageIndex.gallery} style={{tintColor:"white", height:40, aspectRatio:1.3, marginLeft:-5}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"row", width:"33.3%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.shutterButtonOverlay} onPress={takePicture}></TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"column", width:"33.3%", justifyContent:"center"}}>
                                        {
                                            flash_type === FlashMode.off ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.noFlash} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                        {
                                            flash_type === FlashMode.on ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.flash} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                        {
                                            flash_type === FlashMode.torch ?
                                            <TouchableOpacity style={styles.flashSwitch} onPress={switchFlash}>
                                                <Image source={ImageIndex.torch} style={{tintColor:"white", height:40, aspectRatio:1}}></Image>
                                            </TouchableOpacity>:<View></View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            <Image style={{height:height, width:width}} source={{uri: image}} />
                            <View style={styles.cameraControlContainer}>
                                <View style={{flexDirection:"row", height:0, marginTop:20}}>
                                    <View style={{flexDirection:"row", width:"50%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.previewButton} onPress={accept_photo}>
                                            <Image source={ImageIndex.check} style={{tintColor:"white", height:70, aspectRatio:1}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:"column", width:"50%", justifyContent:"center"}}>
                                        <TouchableOpacity style={styles.previewButton} onPress={repeat_photo}>
                                            <Image source={ImageIndex.reload} style={{tintColor:"white", height:70, aspectRatio:1}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </View>
                
            }

        </View>
    )

}

export default Camara