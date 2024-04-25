import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CurrencyInput from 'react-native-currency-input';

const Acuerdo = ({navigation}) => {
    const [id_prestamo,         setIdPrestamo] = useState('');
    const [localidad,         setLocalidad] = useState('');
    const [motivo,         setMotivo] = useState('');
    const [nombre_cliente,      setNombreCliente] = useState('');
    const [dom_cliente,         setDomCliente] = useState('');
    const [tel_cliente,         setTelCliente] = useState('');
    const [saldo_pendiente,         setSaldoPendiente] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [visible,             setVisible] = useState(true)
    const [fecha_acuerdo,      setFechaAcuerdo] = useState('DD/MM/YYYY');
    const [intervalo_acuerdo,         setIntervaloAcuerdo] = useState('');
    const [cantidad_intervalo,         setCantidadIntervalo] = useState(null);
    const [tipo_intervalo,         setTipoIntervalo] = useState('');
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
    const intervalos = [
        { label: 'Semanal', value: '1' },
        { label: 'Quincenal', value: '2' },
        { label: 'Mensual', value: '3' },
    ];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        hideDatePicker();
        var month = String(date.getMonth() + 1)
        if(month.length==1){
            month = "0"+month
        }
        var day = String(date.getDate())
        if(day.length==1){
            day = "0"+day
        }
        setVisible(false)
        var year = date.getFullYear()
        setFechaAcuerdo(month+"/"+day+"/"+year)
    };
    function backMainScreen() {
        navigation.goBack()
    }
    function registerAcuerdo(){
    }
    return (
        <ScrollView style={styles.background}>
            <StatusBar backgroundColor='#70be44'/>
            <View style={styles.mainTopBar}>
                <View style={styles.spacer30}></View>
                <View style={styles.spacer20}></View>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.topBarButton} onPress={backMainScreen}>
                            <Image style={styles.invertedImageTopBar}
                                source={ImageIndex.back}>
                            </Image>
                    </TouchableOpacity>
                    <Text style={styles.mainHeadersInverted}>Nuevo Acuerdo</Text>
                </View>
                <View style={styles.spacer20}></View>
            </View>
            <View style={styles.spacer10}></View>
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
                            placeholder='Ej. 6681234567'
                            maxLength={10}
                            onChangeText={value => setTelCliente(value)}
                            defaultValue={tel_cliente}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={[styles.textBoxContainerFull,{height:70}]}>
                <View style={styles.textBoxBorderMoney}>
                            <Text style={styles.textBoxLabel}>Saldo Pendiente</Text>
                            <CurrencyInput style={styles.textBoxMoney}
                            delimiter=","
                            precision={0}
                            minValue={0}
                            maxValue={99999}
                            prefix="$"
                            onChangeValue={(value) => setSaldoPendiente(value)}
                            value={saldo_pendiente}/>
                </View>
            </View>
            <View style={styles.spacer10}></View>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Datos del Acuerdo</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.spacer10}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Localidad</Text>
                            <Dropdown style={styles.comboBox}
                                data={data} search
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. ML-1'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={localidad}
                                onChange={item => {setLocalidad(item.value);}}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={[styles.textBoxContainerFull, {height:100}]}>
                <View style={[styles.textBoxBorder,{height:100, flexDirection:"row"}]}>
                            <Text style={styles.textBoxLabel}>Motivo</Text>
                            <TextInput style={[styles.textBox, {alignSelf:"flex-start", verticalAlign:"top", paddingTop:10}]}
                            multiline
                            onChangeText={motivo => setMotivo(motivo)}
                            defaultValue={motivo}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                        <Text style={styles.textBoxLabel}>Fecha</Text>
                        <Pressable style={styles.textBox}
                            onPress={showDatePicker}>
                                <View style={{ display: !visible ? 'flex' : 'none', paddingTop:8 }}>
                                    <Text style={styles.date_label}>{fecha_acuerdo}</Text>
                                </View>
                                <View style={{ display: visible ? 'flex' : 'none' , paddingTop:8  }}>
                                    <Text style={styles.comboBoxPlaceholder}>DD/MM/YYYY</Text>
                                </View>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Tipo de Intervalo</Text>
                                <Dropdown style={styles.comboBox}
                                data={intervalos}
                                labelField="label" valueField="value"
                                searchPlaceholder="Grupo.." placeholder='Ej. Semanal'
                                placeholderStyle={styles.comboBoxPlaceholder}
                                selectedTextStyle={styles.comboBoxSelected}
                                value={tipo_intervalo}
                                onChange={item => {setTipoIntervalo(item.value);}}/>
                    </View>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Intervalo</Text>
                                <TextInput style={styles.comboBox}
                                defaultValue={intervalo_acuerdo}
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={item => {setIntervaloAcuerdo(item)}}/>
                    </View>
                </View>
                <View style={styles.textBoxContainerHalf}>
                    <View style={styles.textBoxBorder}>
                                <Text style={styles.textBoxLabel}>Cantidad ($)</Text>
                                <CurrencyInput style={styles.comboBox}
                                delimiter=","
                                precision={0}
                                minValue={0}
                                maxValue={9999}
                                prefix="$"
                                value={cantidad_intervalo}
                                onChangeValue={item => {setCantidadIntervalo(item);}}/>
                    </View>
                </View>
            </View>

            <View style={styles.spacer10}></View>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeaders}>Intervalos del Acuerdo</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            { fecha_acuerdo !== "DD/MM/YYYY" && intervalo_acuerdo !== '' && cantidad_intervalo !== null && tipo_intervalo !== '' ?
                <View style={{width:"90%", alignSelf:"center"}}>
                    <DataTable intervalo={intervalo_acuerdo} 
                    cantidad={cantidad_intervalo} 
                    fecha_inicio={fecha_acuerdo} 
                    saldo_pendiente={saldo_pendiente}
                    tipo_intervalo={tipo_intervalo}></DataTable>
                </View>:<View>
                </View>
            }
            <View style={styles.spacer20}></View>
            <View style={styles.formRow}>
                <TouchableOpacity onPress={registerAcuerdo}
                    style={styles.mainButtonFloating}>
                    <Text style={styles.mainButtonText}>Registrar Acuerdo</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
function DataTable({intervalo, cantidad, fecha_inicio, saldo_pendiente, tipo_intervalo}) {
    let valid = 1
    let data = []
    let cont = 0
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const init_year = Number(String(fecha_inicio).substring(6,10))
    const init_month = Number(String(fecha_inicio).substring(0,2))-1
    const init_day = Number(String(fecha_inicio).substring(3,5))
    let current_date = new Date(init_year, init_month, init_day);
    let date_cont = 0
    cantidad = Number(cantidad)
    if(intervalo * cantidad >= saldo_pendiente){
        valid = 1
    }else{
        valid = 0
    }
    for(let i = 0 ; i < Number(intervalo) ; i++){
        let temp = [i+1,0.0,""]
        if(cont < saldo_pendiente){
            if(cont+cantidad <= saldo_pendiente){
                temp[1] = cantidad
                cont += cantidad
            }else{
                temp[1] = saldo_pendiente-cont
            }
        }
        if(tipo_intervalo == "1"){
            current_date.setDate(current_date.getDate()+7)
        }if(tipo_intervalo == "2"){
            current_date.setDate(current_date.getDate()+14)
        }if(tipo_intervalo == "3"){
            current_date.setDate(current_date.getDate()+30)
        }
        var month = String(current_date.getMonth() + 1)
        if(month.length==1){
            month = "0"+month
        }
        var day = String(current_date.getDate())
        if(day.length==1){
            day = "0"+day
        }
        var year = current_date.getFullYear()
        temp[2] = current_date.toLocaleDateString("es-ES", options)
        temp[2] = temp[2].charAt(0).toUpperCase() + temp[2].slice(1);
        data.push(temp)

    }
    return (
        <View>
            {
                data.map((data,i) => (
                    i % 2 === 0 ?
                    <View key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}>
                        <Text style={styles.cell}>{data[0]}</Text>
                        <View>
                            <Text style={styles.cell}>${data[1]}</Text>
                            
                        </View>
                        <Text style={styles.cell}>{data[2]}</Text>
                    </View>
                    :
                    <View key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                        <Text style={styles.cell}>{data[0]}</Text>
                        <View>
                            <Text style={styles.cell}>${data[1]}</Text>
                        </View>
                        <Text style={styles.cell}>{data[2]}</Text>
                    </View>
                ))
            }
            {
                valid === 0 && intervalo % 2 === 0 ? 
                <View style={[styles.tableRowEven,{height:60, flexDirection:"row",alignItems:"center"}]}>
                    <Text style={styles.cell}>{}</Text>
                    <View>
                        <Text style={[styles.cell,{marginTop:5}]}>Este acuerdo no cumple con el 100% del Saldo Pendiente</Text>
                    </View>
                </View>:<View></View>
            }
            {
                valid === 0 && intervalo % 2 === 1 ? 
                <View style={[styles.tableRowOdd,{height:60, flexDirection:"row"}]}> 
                    <Text style={styles.cell}>{}</Text>
                    <View>
                        <Text style={[styles.cell,{marginTop:5}]}>Este acuerdo no cumple con el 100% del Saldo Pendiente</Text>
                    </View>
                </View>:<View></View>
            }
        </View>
    )
}

export default Acuerdo;