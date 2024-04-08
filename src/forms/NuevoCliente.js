import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ToastAndroid, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"

const NuevoCliente = ({navigation}) => {
    const route = useRoute()
    const type = route.params?.type

    let client_type = "Clientes"
    function init(){
        if(type == 1){
            client_type = "Aval"
        }else{
            client_type = "Cliente"
        }
    }

    init()
    function registerCliente() {
        ToastAndroid.show('Cliente Registrado', ToastAndroid.SHORT);
        navigation.goBack()
    }

    function backMainScreen() {
        navigation.goBack()
    }
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [dom_cliente,         setDomCliente] = useState('');
    const [tel_cliente,         setTelCliente] = useState('');
    const [tipo_cliente,        setTipoCliente] = useState('');
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const client_type_list = [
        { label: 'Normal', value: '1' },
        { label: 'Coordinador', value: '2' },
    ];

    return (
        <ScrollView style={styles.background}>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                    <Text style={styles.mainHeadersInverted}>Nuevo {client_type}</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Ruta</Text>
                                <Dropdown style={styles.comboBox}
                                data={data} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={ruta}
                                onChange={item => {setRuta(item.value);}}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Grupo</Text>
                                <Dropdown style={styles.comboBox}
                                data={data} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. Grupo 1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={grupo}
                                onChange={item => {setGrupo(item.value);}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Datos del {client_type}</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.spacer10}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                            <TextInput style={styles.textBox}
                            placeholder='Nombre Apellido Apellido'
                            onChangeText={value => setNombreCliente(value)}
                            defaultValue={nombre_cliente}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder} >
                            <Text style={styles.textBoxLabel}>Domicilio</Text>
                            <TextInput style={styles.textBox}
                            placeholder='Calle, Numero, Colonia'
                            onChangeText={value => setDomCliente(value)}
                            defaultValue={dom_cliente}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Telefono</Text>
                            <TextInput style={styles.textBox}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder='Ej. 6681234567'
                            onChangeText={value => setTelCliente(value)}
                            defaultValue={tel_cliente}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Tipo de Cliente</Text>
                                <Dropdown style={styles.comboBox}
                                data={client_type_list}
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. No se'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={tipo_cliente}
                                onChange={item => {setTipoCliente(item.value);}}/>
                    </View>
                </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <TouchableOpacity onPress={registerCliente}
                    style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Registrar Cliente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.spacer20}></View>
        </ScrollView>
    )
}

export default NuevoCliente;