import React from 'react';
import { 
  Platform,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ListItem,
  Alert,
  TouchableHighlight,
  Button
} from 'react-native'; 
import { 
  Header,
  Image,
  Card,
  // Button,
  Badge,
  Icon
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
// import axios from 'axios';
import light from './Common/lightMode';
import dark from './Common/DarkMode';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadingDos: true,
      data: [],
      dataNot: [],
      error: null,
      searchTerm: '',
      number_messages: 0,
      BandejaAut: [],
      lenguajeVisible: false
    };
    this.arrayholder = [];
  }
  seleccionar_idioma(){
      this.setState({
        lenguajeVisible: true
      });
  }
  handleRequest() {
    global.skip = false;
    Actions.auth()
  };

  render() {
    let estilos;
    switch (global.style){
    case 'light':
      estilos = light;
      break;
    case 'dark':
      estilos = dark;
      break;
    default:
      estilos = light;
      break; 
    }

    // var randomImages = [
    //   require('../../assets/images/xxx.png')
    // ];

    var navigationView = (
      <View style={estilos.container}>
        <ScrollView style={estilos.ScrollContainer} contentContainerStyle={estilos.contentContainer}>
          <View>
            <View style ={estilos.header}>
                <View >
                    <Image style={estilos.profilepicWrap}/>
                </View> 
            </View>
            
            <View style={estilos.texto}>
                {/* <Text style={estilos.name}>Otras opciones</Text> */}
            </View >   
            
            <TouchableOpacity onPress={() => {
              // Actions.settings()
              Alert.alert('Escena de configuración')
              }}>
              <View style={estilos.celdaOption}>
                <Text style={estilos.menuOption}>Configuración</Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style={{paddingBottom: 25}}>
            <TouchableOpacity onPress={this.handleRequest.bind(this)}>
              <View style={estilos.celdaOption}>
                <Text style={estilos.menuOptionFinal}>Cerrar sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>    
    ); 
    
    return ( 
      <DrawerLayoutAndroid style={estilos.container}
      ref = "mainDrawer"
      drawerWidth={300}
      renderNavigationView={() => navigationView}>
      <Header
        backgroundColor= {estilos.navBar.backgroundColor}
        leftComponent={{ icon: 'menu', color: '#fff', onPress:() => this.refs['mainDrawer'].openDrawer() }}
        centerComponent={{ text: "Menú principal", style: { color: '#fff' } }}
        containerStyle={{
          marginTop: Platform.OS === 'ios' ? 0 : - 24,
          borderBottomWidth: 0
        }}
      />
        <View >
          <ScrollView>
            <View style={estilos.opcion}>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(112,151,245)'}]}>
                <Text  style={estilos.botonMenuText}> Manejar restaurante </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(68,114,196)'}]}>
                <Text  style={estilos.botonMenuText}> Manejar espacios </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(0,32,96)'}]}>
                <Text  style={estilos.botonMenuText}> Manejar puestos </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(45,203,37)'}]}>
                <Text  style={estilos.botonMenuText}> Reportes </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}