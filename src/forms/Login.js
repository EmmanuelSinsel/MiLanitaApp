import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Animated, TouchableOpacity, Image, Platform} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../Style';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import ImageIndex from '../ImageIndex';
import { loginAPI } from '../services/ServiceAuth';
import Toast from 'react-native-root-toast';

const Login = ({navigation}) => {
    const keyboard = useKeyboard()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardStatus, setKeyboardStatus] = useState('');
    const inputRef = React.useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [spacer, setSpacer] = useState(0)
    const [loading, setLoading] = useState(0);
    useEffect(() => {
        const get_values = async() => {
            try {
                const usuario = await AsyncStorage.getItem('usuario');
                if(usuario){
                    setUser(usuario)
                }
            } catch (error) {
                console.log(error)
            }
        }
        get_values()
        if(Platform.OS == "ios"){
            setSpacer(400)
        }
        if(Platform.OS == "android"){
            setSpacer(100)
        }
    },[])

    const login = useCallback(async (usuario, password) => {
        console.log("LOGIN")
        setLoading(1)
        const res = await loginAPI(usuario, password)
        setLoading(0)

        console.log(res)
        const auth = res.auth

        if(res.status == 1){
            try {
                await AsyncStorage.setItem(
                    'usuario',
                    String(usuario),
                );
                await AsyncStorage.setItem(
                    'idEmpleado',
                    String(auth.idEmpleado),
                );
                await AsyncStorage.setItem(
                    'nombreEmpleado',
                    auth.nombre,
                );
                if(auth.idRuta){
                    await AsyncStorage.setItem(
                        'idRuta',
                        String(auth.idRuta),
                    );
                }else{
                    await AsyncStorage.setItem(
                        'idRuta',
                        null,
                    );
                }

                await AsyncStorage.setItem(
                    'idRol',
                    String(auth.rol.idRol),
                );
                await AsyncStorage.setItem(
                    'nombreRol',
                    auth.rol.nombreRol,
                );
            } catch (error) {
                console.log(error)
            }
            let toast = Toast.show('Sesion iniciada', {
                duration: Toast.durations.SHORT,
            });

            navigation.navigate("MainScreen");
        }else{
            let toast = Toast.show(res.detail, {
                duration: Toast.durations.SHORT,
            });
        }
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
    const showPasswordFunction = async(state) => {
        setShowPassword(state)
    }

    return (
        <View style={{height:"100%"}}>
            {
                loading === 1 &&
                <View style={styles.loadingScreen}>
                    <Image style={[styles.loadingImage,{height:500, width:200, marginTop:-150}]}
                        source={ImageIndex.loading}>
                    </Image>
                </View>
            }
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
                                    showPassword === true ?
                                    <View style={[styles.textBoxRow, {width:"100%"}]}>
                                        <TextInput
                                        style={styles.textBox}
                                        onChangeText={password => setPassword(password)}
                                        defaultValue={password}/>
                                        <TouchableOpacity onPress={() => showPasswordFunction(false)}>
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
                                        <TouchableOpacity onPress={() => showPasswordFunction(true)}>
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