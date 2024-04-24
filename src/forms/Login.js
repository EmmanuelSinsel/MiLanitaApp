import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Animated, ToastAndroid, TouchableOpacity, Image, Platform} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import ImageIndex from '../ImageIndex';
import ServiceAuth from '../services/ServiceAuth';

const Login = ({navigation}) => {
    const keyboard = useKeyboard()
    let serviceAuth = new ServiceAuth()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardStatus, setKeyboardStatus] = useState('');
    const inputRef = React.useRef();
    const [show_password, setShowPassword] = useState(false);
    const [spacer, setSpacer] = useState(0)
    useEffect(() => {
        console.log(String(Platform.OS))
        if(Platform.OS == "ios"){
            setSpacer(400)
        }
        if(Platform.OS == "android"){
            setSpacer(100)
        }
    },[])

    const login = useCallback(async (usuario, password) => {
        const res = await serviceAuth.login(usuario, password)
        //Alert.alert("Login",res)
        const auth = res.auth
        if(res.status == 1){
            try {
                await AsyncStorage.setItem(
                    'id_empleado',
                    String(auth.id_empleado),
                );
                await AsyncStorage.setItem(
                    'nombre_empleado',
                    auth.nombre,
                );
                await AsyncStorage.setItem(
                    'id_rol',
                    String(auth.rol.id_rol),
                );
                await AsyncStorage.setItem(
                    'nombre_rol',
                    auth.rol.nombre_rol,
                );
            } catch (error) {
                console.log(error)
            }
            if(Platform.OS == "android"){
                ToastAndroid.show('Sesion iniciada', ToastAndroid.SHORT);
            }

            navigation.navigate("MainScreen");
        }else{
            if(Platform.OS == "android"){
            ToastAndroid.show(res.detail, ToastAndroid.SHORT);}
        }
        setUser('')
        setPassword('')
    }, [])

    state = {
        animation: new Animated.Value(0),
    };
    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: -300,
            duration: 1500
        }).start(() => {
            this.state.animation.setValue(0);
        });
    }

    const animatedStyles = {
        transform: [
            { translateY: this.state.animation }
        ]
    }
    const showPassword = (state) => {
        setShowPassword(state)
        console.log(state)
    }

    return (
        <View style={{height:"100%"}}>
            <View style={styles.container}>
                <View style={styles.halfBackground}></View>
                <StatusBar style="auto" />
                <View style={styles.topRectangle}>
                    <Image source={ImageIndex.logoColor} style={styles.loginLogo}></Image>
                </View>
                <View style={styles.bottomRectangle}>
                    <Animated.View style={[styles.textBoxContainerFull, animatedStyles]}>
                        <View style={{marginTop:50}}></View>
                        <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Usuario</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={user => setUser(user)}
                            defaultValue={user}
                            blurOnSubmit={true}
                        />
                        </View>
                        <View style={styles.spacer30}></View>
                        <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Contraseña</Text>
                            <View style={{width:"100%", height: 20, }}>
                                {
                                    show_password === true ?
                                    <View style={[styles.textBoxRow, {width:"100%"}]}>
                                        <TextInput
                                        style={styles.textBox}
                                        onChangeText={password => setPassword(password)}
                                        defaultValue={password}/>
                                        <TouchableOpacity onPress={() => setShowPassword(!show_password)}>
                                            <Image style={[styles.BubbleImage,{ zIndex:10, marginLeft:-50}]}
                                                source={ImageIndex.hidePassword}>
                                            </Image>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={[styles.textBoxRow, {width:"100%"}]}>
                                        <TextInput
                                        style={styles.textBox}
                                        secureTextEntry={true}
                                        onChangeText={password => setPassword(password)}
                                        defaultValue={password}/>
                                        <TouchableOpacity onPress={() => setShowPassword(!show_password)}>
                                            <Image style={[styles.BubbleImage,{tintColor:"black", zIndex:10, marginLeft:-50}]}
                                                source={ImageIndex.showPassword}>
                                            </Image>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={styles.spacer30}></View>
                        <TouchableOpacity onPress={() => login(user, password)}
                            style={styles.mainButton}>
                            <Text style={styles.mainButtonText}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            {
                keyboard.keyboardShown === true &&
                <View style={{backgroundColor:"white", height:spacer, zIndex:-10}}></View>
            }
        </View>

    );
}

export default Login;