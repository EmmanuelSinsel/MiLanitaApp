import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Animated, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState} from 'react';
import ImageIndex from '../ImageIndex';
import { LinkingContext } from '@react-navigation/native';

const Login = ({navigation}) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    function loginFunc() {
        if(user == "" && password == ""){
            ToastAndroid.show('Sesion iniciada', ToastAndroid.SHORT);
            navigation.navigate("MainScreen");
        }
    }

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

    return (
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
                />
                </View>
                <View style={styles.spacer30}></View>
                <View style={styles.textBoxBorder}>
                    <Text style={styles.textBoxLabel}>Contraseña</Text>
                    <TextInput
                        style={styles.textBox}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                    />
                </View>
                <View style={styles.spacer30}></View>
                <TouchableOpacity onPress={loginFunc}
                    style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    </View>
    );
}

export default Login;