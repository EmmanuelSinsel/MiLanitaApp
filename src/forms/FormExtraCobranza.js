import { StatusBar } from 'expo-status-bar';
import {  Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"
import CurrencyInput from 'react-native-currency-input';

const FormExtraCobranza = ({navigation}) => {
    function backMainScreen() {
        navigation.goBack()
    }
    const route = useRoute()
    const [id_cliente,          setIdCliente] = useState('');
    const [id_prestamo,         setIdPrestamo] = useState('');
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [no_semana_prestamo,  setNoSemana] = useState('');
    const [saldo_pendiente,     setSaldoPendiente] = useState('');
    useEffect(() => {
        if(route.params?.id){
            get_abono_extra(route.params?.id)
        }

    }, []);

    const get_abono_extra = (id) => {
        console.log(id)
    }

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
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={9999}
                                prefix="$"
                                placeholder='$0'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                value={saldo_pendiente}/>
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
                                <CurrencyInput style={styles.textBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={9999}
                                prefix="$"
                                placeholder='$0'
                                onChangeText={saldo_pendiente => setSaldoPendiente(saldo_pendiente)}
                                value={saldo_pendiente}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorderMoney}>
                            <Text style={styles.textBoxLabel}>Abono</Text>
                            <CurrencyInput style={styles.textBoxMoney}
                            delimiter=","
                            precision={0}
                            minValue={0}
                            maxValue={9999}
                            prefix="$"
                            placeholder='$0'
                            onChangeText={no_semana_prestamo => setNoSemana(no_semana_prestamo)}
                            value={no_semana_prestamo}/>
                            
                </View>
            </View>
            <View style={styles.spacer30}></View>
        </ScrollView>
    )
}

export default FormExtraCobranza;