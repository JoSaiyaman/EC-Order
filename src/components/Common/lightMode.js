import { StyleSheet } from 'react-native';

let ColorFuerte = 'rgb(255,74,55)';
let ColorDebil = 'rgb(255,255,141)';

export default StyleSheet.create({
  loginBackground: {
    backgroundColor: ColorDebil
  },
  celdaOption: {
    height: 40
  },
  menuOption: {
    paddingVertical:10,
    marginHorizontal: 20,
    color: 'black',
    fontSize: 16,
    width: 260,
    borderTopWidth: 1,
    borderColor: 'black' 
  },
  menuOptionFinal:{
    padding: 10,
    marginHorizontal: 20,
    color: 'black',
    fontSize: 16,
    width: 260,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  name:{
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      textAlign:'center',
  },
  texto:{
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:5
  },

  // drawer: {
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
    backgroundColor: ColorDebil,
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
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  logo_image: {
    height: 260,
    width: 260,
  },

  Overlay: {
    backgroundColor: "rgba(255, 255, 255, 1)"
  },

  // Router Navbar
  navBar: {
    backgroundColor: ColorFuerte,
    color: ColorDebil,
    fontWeight: "normal"
  },

  //login
  fontLogin: {
    padding: 3,
    color: 'black'
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
    backgroundColor: 'rgb(255,166,1)',
    elevation: 1
  },

  // Menu
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
  }
});