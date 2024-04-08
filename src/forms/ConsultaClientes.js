import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../../Style';
import React, {useState} from 'react';
import ImageIndex from '../ImageIndex';
import { Dropdown } from 'react-native-element-dropdown';

const ConsultaClientes = ({navigation}) => {
    function backMainScreen() {
        navigation.goBack()
    }
    
    const [ruta,                setRuta] = useState('');
    const [grupo,               setGrupo] = useState('');
    const [filtro,      setFiltro] = useState('');
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
    const [tableData, setTableData] = useState([['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel'],
                                                ['2343', '1','Jesus EmmSDASanuel Hernandez Sinsel']]);
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
                    <Text style={styles.mainHeadersInverted}>Consulta de Clientes</Text>
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
            <View style={styles.spacer20}></View>
            <View style={styles.textBoxContainerFull}>
                <View style={styles.textBoxBorder}>
                            <Text style={styles.textBoxLabel}>Buscador</Text>
                            <TextInput style={styles.textBox}
                            onChangeText={value => setFiltro(value)}
                            defaultValue={filtro}/>
                </View>
            </View>
            <View style={styles.spacer20}></View>
            <DataTable tableData={tableData}></DataTable>
            <View style={styles.spacer30}></View>
        </ScrollView>
    )
}
function DataTable({tableData}) {
    const [ruta,                setRuta] = useState('');
    const data1 = [
        { label: 'Normal', value: '1' },
        { label: 'Recuperado', value: '2' },
    ];
    return (
        <View>
            {
                tableData.map((data,i) => (
                    i % 2 === 0 ?
                    <View key={i} style={[styles.tableRowEven,{height:50, flexDirection:"row",alignItems:"center"}]}>
                        <Text style={styles.cell}>{data[0]}</Text>
                        <View>
                            <Text style={styles.cell}>{data[2]}</Text>
                        </View>
                    </View>
                    :
                    <View key={i} style={[styles.tableRowOdd,{height:50, flexDirection:"row",alignItems:"center"}]}> 
                        <Text style={styles.cell}>{data[0]}</Text>
                        <View>
                            <Text style={styles.cell}>{data[2]}</Text>
                        </View>
                    </View>

                ))
            }
        </View>
    )
}


export default ConsultaClientes;