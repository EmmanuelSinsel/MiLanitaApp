import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native';
import { styles } from '../../Style';
import React from 'react';
import ImageIndex from '../ImageIndex';

const MainScreen = ({navigation}) => {
    //ALTAS
    function nuevoPrestamoFunc() {
        navigation.navigate("FormPrestamos");
    }
    function nuevoClienteFunc() {
        navigation.navigate("NuevoCliente");
    }
    function nuevoAcuerdoFunc(){
        navigation.navigate("Acuerdo")
    }
    //CONSULTAS
    function consultaPrestamos(){
        navigation.navigate("ConsultaPrestamos")
    }
    function consultaClientes(){
        navigation.navigate("ConsultaClientes")
    }
    function consultaAcuerdos(){
        navigation.navigate("ConsultaAcuerdos")
    }
    //CAMBIOS
    function abonosFunc() {
        navigation.navigate("Abonos");
    }
    //LOGOUT
    function logout() {
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.background}>
            <StatusBar backgroundColor='#70be44'/>
            <View style={styles.mainTopBar}>
                <Image style={styles.mainLogo} source={ImageIndex.logoColor}></Image>
                <View style={styles.spacer20}></View>
                <View style={styles.logout}>
                    <TouchableOpacity onPress={logout}>
                        <Image source={ImageIndex.logout} style={{height:40, aspectRatio:0.75, alignSelf:"center", marginTop:40, tintColor:"white"}} ></Image>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={styles.spacer10}></View>
            <Text style={styles.mainHeaders}>Caja</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.mainRow}>
                <MainRoundButton func={abonosFunc} title={"Corte"} image={ImageIndex.money}></MainRoundButton>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
            </View>

            <Text style={styles.mainHeaders}>Prestamos</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.mainRow}>
                <MainRoundButtonBubble func={nuevoPrestamoFunc} title={"Nuevo Prestamo"} image={ImageIndex.loan} bubbleImage={ImageIndex.add}></MainRoundButtonBubble>
                <MainRoundButtonBubble func={consultaPrestamos}  title={"Consulta de Prestamos"} image={ImageIndex.loan} bubbleImage={ImageIndex.list}></MainRoundButtonBubble>
                <MainRoundButton func={abonosFunc} title={"Abonar"} image={ImageIndex.pay}></MainRoundButton>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.mainRow}>
                <MainRoundButton func={consultaPrestamos}  title={"Extra Cobranza"} image={ImageIndex.payExtra} bubbleImage={ImageIndex.list}></MainRoundButton>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
            </View>
            <Text style={styles.mainHeaders}>Clientes</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.mainRow}>
                <MainRoundButtonBubble func={nuevoClienteFunc} title={"Nuevo Cliente"} image={ImageIndex.client} bubbleImage={ImageIndex.add}></MainRoundButtonBubble>
                <MainRoundButtonBubble func={consultaClientes} title={"Consulta de Clientes"} image={ImageIndex.client} bubbleImage={ImageIndex.list}></MainRoundButtonBubble>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
            </View>
            <Text style={styles.mainHeaders}>Acuerdos</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.mainRow}>
                <MainRoundButtonBubble func={nuevoAcuerdoFunc} title={"Nuevo Acuerdo"} image={ImageIndex.handshake} bubbleImage={ImageIndex.add}></MainRoundButtonBubble>
                <MainRoundButtonBubble func={consultaAcuerdos} title={"Consulta de Acuerdos"} image={ImageIndex.handshake} bubbleImage={ImageIndex.list}></MainRoundButtonBubble>
                <MainRoundButtonSpacer></MainRoundButtonSpacer>
            </View>
            <View style={styles.spacer30}></View>
        </ScrollView>
    )
}

function MainRoundButtonSpacer(){
    return (
        <View style={styles.mainButtonContainer}>
            <View style={styles.mainRoundButtonSpacer}></View>
        </View>
    )
}

function MainRoundButton({title, image, func}){
    return (
        <View style={styles.mainButtonContainer}>
            <TouchableOpacity style={styles.mainRoundButton} onPress={func}>
                <View style={styles.mainImageContainer}>
                    <Image style={styles.invertedImage}
                        source={image}>
                    </Image>
                </View>
            </TouchableOpacity>
            <Text style={styles.mainRoundButtonText}>{title}</Text>
        </View>
        )
}
function MainRoundButtonBubble({title, image, bubbleImage, func}){
    return (
    <View style={styles.mainButtonContainer}>
        <TouchableOpacity style={styles.mainRoundButton} onPress={func}>
            <View style={styles.bubble}>
                <Image style={styles.invertedBubbleImage}
                    source={bubbleImage}>
                </Image>
            </View>
            <View style={styles.mainImageContainer}>
                <Image style={styles.invertedImage}
                    source={image}>
                </Image>
            </View>
        </TouchableOpacity>
        <Text style={styles.mainRoundButtonText}>{title}</Text>
    </View>
    )
}


export default MainScreen