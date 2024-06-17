import { StatusBar } from 'expo-status-bar';
import {  Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState, useEffect} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from "@react-navigation/native"
import CurrencyInput from 'react-native-currency-input';
import { get_detalle_abono_extraAPI } from '../services/ServicePrestamos';
import { guardar_abonosAPI } from '../services/ServiceAbonos';
import { Locker } from '../Utils';

const FormExtraCobranza = ({navigation}) => {
    function backMainScreen() {
        navigation.goBack()
    }
    const route = useRoute()
    const [idCliente,          setIdCliente] = useState('');
    const [nombreCliente,      setNombreCliente] = useState('');
    const [idPrestamo,         setIdPrestamo] = useState('');
    const [plazo,               setPlazo] = useState('');
    const [numSemana,          setNumSemana] = useState('');
    const [saldoPendiente,     setSaldoPendiente] = useState('');
    const [moras,               setMoras] = useState('');
    const [atrasos,             setAtrasos] = useState('');
    const [noAbono,            setNoAbono] = useState('');
    const [importeAtrasos,     setImporteAtrasos] = useState('');
    const [abono,               setAbono] = useState('');
    const [finished,            setFinished] = useState('');
    useEffect(() => {
        if(route.params?.id){
            getAbonoExtra(route.params?.id)
        }
    }, []);

    const getAbonoExtra = async (id) => {
        const res = await get_detalle_abono_extraAPI(id)
        const data = res.data
        const cliente = data.cliente
        const prestamo = data.prestamo
        setIdCliente(cliente.idCliente)
        setNombreCliente(cliente.nomCliente)
        setIdPrestamo(prestamo.idPrestamo)
        setPlazo(prestamo.plazo)
        setNumSemana(prestamo.numSemana)
        setSaldoPendiente(prestamo.saldoPendiente)
        setMoras(prestamo.moras)
        setAtrasos(prestamo.atrasos)
        setNoAbono(prestamo.numAbono)
        setImporteAtrasos(prestamo.importeAtrasado)
        if(prestamo.estatus == "Finalizado"){
            setAbono(0)
            setFinished(1)
        }else{
            setAbono(prestamo.abono)
            setFinished(0)
        }
    }

    const guardarAbonoExtra = async(
        newIdPrestamo,
        newNoAbono,
        newAbono,
        newNoSemana,
    ) => {
        const date = new Date();
        var month = String(date.getMonth() + 1)
        if(month.length==1){
            month = "0"+month
        }
        var day = String(date.getDate())
        if(day.length==1){
            day = "0"+day
        }
        var year = date.getFullYear()
        let fecha = month+"/"+day+"/"+year
        let data = []
        data.push({
            "id_prestamo": Number(newIdPrestamo),
            "no_abono":Number(newNoAbono)+1,
            "abono":Number(newAbono),
            "tipo_abono":'4',
            "no_semana":Number(newNoSemana)+1,
            "fecha":fecha
        })
        data = {"abonos":data}  
        const res = await guardar_abonosAPI(data)
        if(res.status == 1){
            navigation.goBack()
        }
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
                        onChangeText={idCliente => setIdCliente(idCliente)}
                        value={idCliente}/>
                    </View>
                    <Locker></Locker>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                    <Text style={styles.textBoxLabel}>Nombre del Cliente</Text>
                    <TextInput style={styles.textBox}
                    placeholder='Nombre Apellido Apellido'
                    onChangeText={value => setNombreCliente(value)}
                    value={nombreCliente}/>
                </View>
                <Locker></Locker>
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
                        value={idPrestamo}/>
                    </View>
                    <Locker></Locker>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Plazo</Text>
                        <TextInput style={styles.textBox}
                        keyboardType='numeric'
                        placeholder='1234'
                        value={plazo}/>
                    </View>
                    <Locker></Locker>
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
                        value={numSemana}/>
                    </View>
                    <Locker></Locker>
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
                        value={saldoPendiente}/>
                    </View>
                    <Locker></Locker>
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
                        value={moras}/>
                    </View>
                    <Locker></Locker>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}># de Atrasos</Text>
                        <TextInput style={styles.textBox}
                        keyboardType='numeric'
                        placeholder='1234'
                        value={atrasos}/>
                    </View>
                    <Locker></Locker>
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
                        value={noAbono}/>
                    </View>
                    <Locker></Locker>
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
                        value={importeAtrasos}/>
                        <Locker></Locker>
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
                    value={abono}/>
                    {
                        finished === 1 &&
                        <Locker></Locker>
                    }
                </View>
            </View>
            <View style={styles.spacer30}></View>
            <View style={styles.spacer10}></View>
            <View style={styles.formRow}>
                {
                    finished === 0 ?
                    <TouchableOpacity onPress={() => guardarAbonoExtra(idPrestamo, noAbono, abono, numSemana)}
                    style={styles.mainButtonFloating}>
                    <Text style={styles.mainButtonText}>Abonar</Text>
                    </TouchableOpacity>
                    :
                    <View
                    style={styles.mainButtonFloating}>
                    <Text style={styles.mainButtonText}>Prestamo Finalizado</Text>
                    </View>
                }

            </View>
        </ScrollView>
    )
}
export default FormExtraCobranza;