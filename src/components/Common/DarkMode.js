import { StyleSheet } from 'react-native';

let ColorFuerte = 'rgb(255,74,55)';
let ColorNeutro = 'rgb(255,166,1)';
let ColorNeutroOscuro = 'rgba(255,166,1,0.5)';
let ColorDebil = 'rgb(255,255,255)';
let ColorDebilOscuro = 'rgb(200,200,200)';
let ColorAzul = 'rgb(122,121,225)';

export default StyleSheet.create({
  loginBackground: {
    backgroundColor: 'rgb(18, 56, 79)'
  },
  celdaOption: {
    height: 40
  },
  menuOption: {
    paddingVertical:10,
    marginHorizontal: 20,
    color: 'rgb(227, 249, 250)',
    fontSize: 16,
    width: 260,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  menuOptionFinal:{
    padding: 10,
    marginHorizontal: 20,
    color: 'rgb(227, 249, 250)',
    fontSize: 16,
    width: 260,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  name:{
      fontSize: 16,
      color: 'rgb(227, 249, 250)',
      fontWeight: 'bold',
      textAlign:'center',
  },
  texto:{
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:5
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  // drawer: {
  //   backgroundColor: 'rgb(18, 56, 79)',
  //   justifyContent: 'space-between'
  // },

  textInputStyle: {
    padding: 4,
    fontSize: 16,
    flex: 1,
    backgroundColor: 'rgb(103, 173, 179)',
    marginHorizontal: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(18, 56, 79)',
    justifyContent: "space-around"
  },
  container2: {
    flex: 1,
    backgroundColor: ColorDebilOscuro,
    justifyContent: "space-around"
  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScrollContainer:{
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingContainerCommon: {
    flex: 1,
    backgroundColor: 'rgb(18, 56, 79)',
    justifyContent: "center",
    alignItems: "center"
  },
  logo_image: {
    height: 260,
    width: 260,
  },
  
  Overlay: {
    backgroundColor: 'rgb(26, 81, 115)'
  },
  
  // Router Navbar
  navBar: {
    backgroundColor: 'rgb(18, 56, 79)',
    color: "#FFF",
    fontWeight: "normal"
  },
  
  //login
  fontLogin: {
    padding: 3,
    color: 'white'
  },
  login_logo_image: {
    height: 146,
    width: 190,
    marginBottom: 22
  },
  login_textInputStyle: {
    flex: 1,
    padding: 6,
    fontSize: 16,
    backgroundColor: '#73c0c7',
    elevation: 1
  },
  
  // Main Menu
  profilepicWrap:{
    marginTop:1,
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: ColorFuerte,
    backgroundColor: ColorDebil,
    borderWidth: 8,
  },
  opcion:{
    height: 80,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  botonMenu:{
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 10, // Android
  },
  botonMenuText:{
    color:'#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabMenu:{
    padding: 18,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 12, // Android
  },
  colorBotonesAccion:{
    backgroundColor: ColorFuerte
  },

  // Menu (de comida xd)
  
  columna1: {
    flex: 0,
    width: "10%",
    height: undefined,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  columna2: {
    flex: 0,
    width: "90%",
    height: undefined,
    // alignSelf: 'flex-end',
    justifyContent: 'flex-start'
  },

  //****************************Generales********
  floating_icon:{

    position:"absolute",
    left: 10,
    top: 10

  },
  articulo: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.7)',
    padding: 10
  },

  // detalle de producto
  
  titulo1:{
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  titulo2:{
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitulo1:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  contenido:{
    flex: 1,
    padding: 6,
    fontSize: 16,
  },
  descriptionArea: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  descriptionText: {
    color: 'grey',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16
  },
  complementNoSelect: {
    fontWeight: "bold"
  },
  complementSelect:{
    fontWeight: "bold",
    color: ColorAzul
  },
  textButton:{
    color: '#fff', 
    padding: 9, 
    borderRadius: 6, 
    backgroundColor: 'rgb(255,74,55)',
    elevation: 8
  },
  listComplementos:{
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}
});