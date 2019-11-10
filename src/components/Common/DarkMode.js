import { StyleSheet } from 'react-native';

let ColorFuerte = 'rgb(255,74,55)';
let ColorDebil = 'rgb(255,255,141)';

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
  
  // Menu
  profilepicWrap:{
    marginTop:1,
      width: 180,
      height: 180,
      borderRadius: 100,
      borderColor: 'rgba(135,206,235, 0.4)',
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
  }
});