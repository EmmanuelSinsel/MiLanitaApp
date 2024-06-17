import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';


var main_green = "#70be44";
var dark_main_green = "#385f22";
var white = "#FFFFFF";
const styles = StyleSheet.create({
    background:{
        backgroundColor:white
    },
    statusbar:{
        backgroundColor:main_green
    },
    lockUI:{
        position:"absolute",
        height:"100%",
        width:"100%",
        opacity:0.3,
        backgroundColor:"gray",
        zIndex:10
    },
    halfBackground: {
        position:"absolute",
        marginLeft:"50%",
        height:"100%",
        width:"50%",
        zIndex:-2,
        backgroundColor: white,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: main_green,
        padding: 0,
        margin: 0,
    },
    topRectangle: {
        height:"60%",
        backgroundColor: main_green,
        borderBottomRightRadius:25,
        justifyContent:"center",
        zIndex:-2
    },
    bottomRectangle: {
        height:"40%",
        backgroundColor:white,
        borderTopLeftRadius:25,
        alignItems:"center",
        justifyContent:""
    },
    textBox:{
        backgroundColor:"white",
        width:"100%",
        height: "100%",
        alignSelf:"center",
        marginLeft: 0,
        fontSize: 18,
        borderWidth:1,
        borderRadius:15,
        zIndex:-1,
        paddingLeft:10,
        paddingRight:10,
        start:0
    },
    textBoxMoney:{
        textAlign:"center",
        width:"100%",
        height: "100%",
        marginLeft: 0,
        fontSize: 35,
        borderWidth:1,
        borderRadius:15,
        zIndex:-1,
        padding:10
    },
    textBoxPlaceholder:{
        marginLeft: 5,
        marginTop:-5,
        fontSize: 18,
        zIndex:-1,
        color:"#a9a9a9"
    },
    textBoxSuccessful:{
        marginLeft: 5,
        marginTop:-5,
        fontSize: 18,
        zIndex:-1,
        color:main_green
    },
    textBoxError:{
        marginLeft: 5,
        marginTop:-5,
        fontSize: 18,
        zIndex:-1,
        color:"orange"
    },
    comboBoxPlaceholder:{
        width:"100%",
        height: "100%",
        marginLeft: 0,
        fontSize: 18,
        zIndex:-1,
        color:"#a9a9a9"
    },
    comboBoxSelected:{
        width:"100%",
        height: "100%",
        marginLeft: 0,
        fontSize: 18,
        zIndex:-1,
        color:"black"
    },
    comboBox:{
        width:"100%",
        height: "100%",
        marginLeft: 0,
        fontSize: 20,
        borderWidth:1,
        borderRadius:15,
        zIndex:-1,
        paddingLeft:10,
        paddingTop:10,
    },
    textBoxBorder:{
        width:"100%",
        height:50,
        borderWidth: 0,
        borderRadius: 15,
        
    },
    textBoxBorderMoney:{
        width:"100%",
        height:75,
        borderWidth: 0,
        borderRadius: 15,
    },
    textBoxLabel:{
        backgroundColor:white,
        position:'absolute',
        marginLeft:20,
        marginTop:-16,
        width:'auto',
        borderWidth:0,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor: white,
        textAlign:'center',
        fontSize:18
    },
    textLabel:{
        
        fontSize:18,
        alignSelf:"center",
    },
    textBoxContainerFull:{
        alignSelf:'center',
        width:"90%",
        height:50
    },
    textBoxContainerHalf:{
        alignSelf:'flex-start',
        width:"47.5%",
        marginRight:"5%",
        height:50,
    },
    textBoxContainerOneThird:{
        alignSelf:'flex-start',
        width:"30%",
        marginRight:"5%",
        height:50,
    },
    textBoxContainerTwoThird:{
        alignSelf:'flex-start',
        width:"65%",
        marginRight:"5%",
        height:50,
    },
    formRow:{
        flexDirection:'row',
        marginLeft:"5%",
        marginRight:"5%"
    },
    spacer30:{
        marginTop:30
    },
    spacer20:{
        marginTop:20
    },
    spacer10:{
        marginTop:10
    },
    spacer5:{
        marginTop:5
    },
    mainButton:{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        height:60,
        width:"100%",
        backgroundColor: main_green,
        borderRadius:15
    },
    mainButtonFloating:{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        height:60,
        width:"100%",
        backgroundColor: main_green,
        borderRadius:15,
        marginBottom:50
    },
    mainButtonText:{
        color: white,
        textAlign:"center",
        fontSize:24
    },
    mainTopBar:{
        width:"100%",
        height:"auto",
        backgroundColor:main_green,
        justifyContent:"center",
        zIndex:11
    }, 
    mainRoundButtonText:{
        fontWeight:"500",
        fontSize:16,
        textAlign:"center",
        maxWidth:100
    },
    mainRoundButton:{
        width: 90,
        height: 90,
        backgroundColor:'black',
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:40,
        
    },
    mainRoundButtonSpacer:{
        width: 90,
        height: 90,
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:40,
        
    },
    mainHeaders:{
        fontSize:30,
        marginLeft:20,
        fontWeight:'500'
        // fontFamily: 'Arvo-Regular'
    },
    mainHeadersInverted:{
        fontSize:30,
        marginLeft:20,
        color:white,
        fontWeight:'500'
        // fontFamily: 'Arvo-Regular'
    },
    mainHeaderButton:{
        zIndex:1,
        alignSelf:'center',
        justifyContent:"center",
        width:35,
        height:35,
        resizeMode:"contain",
        backgroundColor: main_green,
        borderRadius:15
    },
    textBoxButton:{
        alignSelf:'flex-start',
        justifyContent:"center",
        height:35,
        resizeMode:"contain",
        backgroundColor: white,
        marginTop:10,
        zIndex:-1,
    },
    textBoxRow:{
        flexDirection:"row",
        width:120,
        height:50,
        alignItems:"center",
    },
    mainHeaderContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:"95%"
    },
    
    mainRow:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    mainButtonContainer:{
        alignItems:"center"
    },
    horizontalLine:{
        width:"90%",
        borderBottomWidth:2,
        alignSelf:"center",
        marginTop:10,
        marginBottom:15,
        borderBlockColor:main_green
    },
    bubble:{
        zIndex:1,
        alignSelf:"flex-end",
        justifyContent:"center",
        marginBottom:-35,
        width:35,
        height:35,
        resizeMode:"contain",
        backgroundColor: main_green,
        borderRadius:15
    },
    invertedImage:{
        tintColor:white,
        width:50,
        height:50,
        resizeMode:"contain",
        alignSelf:'center',
        justifyContent:'center'
    },
    bubbleImageContainer:{
        flex: 1
    },
    invertedBubbleImage:{
        tintColor:white,
        width:20,
        height:20,
        resizeMode:"contain",
        alignSelf:"center",
    },
    loadingImage:{
        width:70,
        height:70,
        resizeMode:"contain",
        alignSelf:"center",
    },
    mainImageContainer:{
        width:90,
        height:90,
        justifyContent:'center'
    },
    BubbleImage:{
        tintColor:'black',
        width:30,
        height:30,
        resizeMode:"contain",
        alignSelf:"center",
    },
    mainImageContainer:{
        width:90,
        height:90,
        justifyContent:'center'
    },
    mainLogo:{
        zIndex:-1,
        width:'80%',
        resizeMode:"contain",
        alignSelf:"center",
        aspectRatio:1,
        height:"auto",
        marginTop:-60,
        marginBottom:-120,

    },
    loginLogo:{
        zIndex:-1,
        width:'100%',
        resizeMode:"contain",
        alignSelf:"center",
        aspectRatio:1,
        height:"auto",
        marginTop:-100,
        marginBottom:-120
    },
    date_label:{
        width:"100%",
        height: "100%",
        fontSize: 22,
        zIndex:2,
    },
    topBarButton:{
        height:30,
        alignSelf:"flex-start"
    },
    invertedImageTopBar:{
        tintColor:white,
        marginTop:5,
        marginLeft:10,
        height:30,
        aspectRatio:1,
        resizeMode:"contain",
        alignSelf:'center',
        justifyContent:'center',
    },
    topBarContainer:{
        flexDirection:'row',
        justifyContent:"flex-start",
        zIndex:20
    },
    tableContainer: { marginLeft: "1%", marginRight:"1%", zIndex:2 ,borderBottomWidth:1, borderRadius: 15},
    tableHead: { height: 60, backgroundColor: '#70be44', zIndex:-1, width:"100%", marginBottom:-1},
    tableText: { height:50, padding: 5, },
    tableHeader: { padding: 5, color: white, fontWeight:"bold"},
    tableRowEven: { backgroundColor: white,flexDirection: 'row', },
    tableRowOdd: { backgroundColor: '#E3F7D3',flexDirection: 'row', },
    cell:{
        marginLeft:10,
        height:50,
        fontSize:18,
        marginTop:10,
    },
    cellInput:{
        borderWidth:1,
        marginLeft:10,
        height:40,
        fontSize:18,
        marginBottom:5,
        width:100,
        borderRadius:10,
        padding:5
    },
    cellCombo:{
        borderWidth:1,
        marginLeft:10,
        height:40,
        fontSize:16,
        marginBottom:5,
        width:100,
        borderRadius:10,
        padding:5
    },
    cellComboBoxSelected:{
        width:"100%",
        height: "100%",
        marginLeft: 0,
        fontSize: 20,
        zIndex:-1,
        color:"black"
    },
    cellHorizontal:{
        flexDirection: 'row',
        alignItems:"center"
    },
    camera:{
        height:200,
        flex:1
    },
    shutterButton:{
        backgroundColor:"white",
        height:100,
        width:100,
        borderRadius:50,
        marginTop:50
    },
    shutterButtonOverlay:{
        backgroundColor:"white",
        height:100,
        width:100,
        borderRadius:50,
        marginTop:"90%",
        marginBottom:20,
        alignSelf:"center"
    },
    flashSwitch:{
        height:40,
        width:40,
        borderRadius:50,
        marginTop:"90%",
        marginBottom:20,
        alignSelf:"center"
    },
    previewButton:{
        height:70,
        width:70,
        borderRadius:50,
        marginTop:"90%",
        marginBottom:0,
        alignSelf:"center"
    },
    cameraControlContainer:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
    },
    cameraBackground:{
        backgroundColor:"black",
        height:"100%"
    },
    cardBlueprint:{
        width:"90%",
        aspectRatio:0.6305,
        alignSelf:"center",
        marginTop:50,
        borderWidth:3,
        borderColor:"gray",
        borderRadius:30
    },
    cardPhoto:{
        width:"60%",
        aspectRatio:1.25,
        alignSelf:"center",
        marginTop:15,
        borderWidth:3,
        borderColor:"gray",
        borderRadius:30,
        marginRight:30
    },
    previewImageFull:{
        width:100,
        height:100
    },
    previewImageCard:{
        width:100,
        height:100
    },
    map:{
        width:"100%",
        height:"100%",
        position:"absolute"
    },
    mapPointer:{
        width:50,
        height:50,
        alignSelf:"center",
    },
    logout:{
        position:"absolute",
        height:"100%",
        width:70,
        zIndex:10,
        alignSelf:"flex-end",
        justifyContent:"center",        
    },
    smallButton:{
        backgroundColor:main_green,
        width:50,
        marginLeft:10,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    autocomplete:{
        zIndex:100,
        backgroundColor:white,
        borderWidth:1,
        borderRadius:18,
        height:200,
    },
    autocompleteItem:{
        height:30,
        marginTop:5,
        fontSize:24,
        marginLeft:10,
        marginBottom:5
    },
    loadingScreen:{
        position:'absolute',
        height:"100%",
        width:"100%",
        opacity:0.3,
        backgroundColor:"gray",
        zIndex:10,
        justifyContent:"center"
    },
    topBarSaveButton:{
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end",
        width:"30%",
        height:40,
        backgroundColor:"#378804",
        borderRadius:15,
    },
    alertBackground:{
        position:"absolute",
        height:"100%",
        width:"100%",
        backgroundColor:"gray",
        opacity:0.2,
        zIndex:21,
        justifyContent:"center"
    },
    alert:{
        position:"absolute",
        alignSelf:"center",
        width:"80%",
        height:200,
        backgroundColor:"white",
        opacity:10,
        zIndex:22,
        marginTop:300
    },
    corteTabla:{
        marginLeft:"2%",
        marginRight:"2%",
        borderWidth:3,
        borderRadius:15,
        borderColor:main_green,
        width:"96%",
    },  
    corteTablaHeader:{
        height:30,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    corteMainText:{
        color:"black",
        fontSize:18,
        fontWeight:"bold"
    },
    corteVarText:{
        color:"black",
        fontSize:18
    },
    corteMainCellText:{
        color:"black",
        fontWeight:"bold",
        fontSize:16
    },
    corteCellText:{
        color:"black",
        fontSize:16
    },
    corteInfoCellText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
    },
    corteRowContainer:{
        width:"100%",
        backgroundColor:"#e8ffcf",
        flexDirection:"row"
    },
    corteTopRowContainer:{
        width:"100%",
        flexDirection:"row",
        borderBottomWidth:2,
        borderColor:main_green,
    },
    corteRowCell:{
        width:"33.3%",
        height:31,
        borderRightWidth:2,
        borderTopWidth:2,
        borderColor:main_green,
        alignItems:"center",
    },
    corteInfoRowCell:{
        width:"66.6%",
        height:31,
        borderRightWidth:2,
        borderTopWidth:2,
        borderBottomWidth:2,
        backgroundColor:main_green,
        borderColor:main_green,
        alignItems:"flex-end",
    },
    corteTopRowCell:{
        width:"25%",
        height:31,
        backgroundColor:"#e8ffcf",
        borderRightWidth:2,
        borderColor:main_green,
        alignItems:"flex-end",
    },
    corteInfoRowCellValue:{
        width:"33.3%",
        height:31,
        borderRightWidth:2,
        borderTopWidth:2,
        borderColor:main_green,
        alignItems:"flex-start",
    },
    corteTopCellValue:{
        width:"33.3%",
        height:31,
        borderColor:main_green,
        alignItems:"flex-start",
    },
    corteColContainer:{
        width:"100%",

        borderTopWidth:2,
        borderColor:main_green,
        alignItems:"center"
    },
    imageCell:{
        flexDirection:"row",
        aspectRatio:1,
        borderWidth:1
    }
});

export { styles }