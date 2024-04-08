import { StatusBar } from 'expo-status-bar';
import {  Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"


const AbonoDetalle = ({navigation}) => {
    function backMainScreen() {
        navigation.goBack()
    }

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

    const route = useRoute()
    
    const id = route.params?.id

    const [id_cliente,          setIdCliente] = useState('');
    const [id_prestamo,         setIdPrestamo] = useState('');
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [no_semana_prestamo,  setNoSemana] = useState('');
    const [saldo_pendiente,     setSaldoPendiente] = useState('');

    return(
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
                    <Text style={styles.mainHeadersInverted}>Abono</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Datos del Cliente</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.spacer10}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>ID Cliente</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={id_cliente => setIdCliente(id_cliente)}
                                defaultValue={id_cliente}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
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
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Datos del Prestamo</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.spacer10}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>ID Prestamo</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={id_prestamo => setIdPrestamo(id_prestamo)}
                                defaultValue={id_prestamo}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Plazo</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                                defaultValue={no_semana_prestamo}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}># de Semana</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                                defaultValue={no_semana_prestamo}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Saldo Pendiente</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                defaultValue={saldo_pendiente}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}># de Moras</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                                defaultValue={no_semana_prestamo}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}># de Atrasos</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                defaultValue={saldo_pendiente}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}># de Abono</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                                defaultValue={no_semana_prestamo}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Importe Atrasado</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                defaultValue={saldo_pendiente}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorderMoney}>
                            <Text style={styles.textBoxLabel}>Abono</Text>
                            <TextInput style={styles.textBoxMoney}
                            keyboardType='numeric'
                            placeholder='1234'
                            onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                            defaultValue={no_semana_prestamo}/>
                </View>
            </View>
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
                                <Text style={styles.textBoxLabel}>Importe Atrasado</Text>
                                <TextInput style={styles.textBox}
                                keyboardType='numeric'
                                placeholder='1234'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                defaultValue={saldo_pendiente}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AbonoDetalle;