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
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';

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

    return ( 
      <View >
        <Header
          backgroundColor= {estilos.navBar.backgroundColor}
          // leftComponent={{ icon: 'menu', color: '#fff', onPress:() => this.refs['mainDrawer'].openDrawer() }}
          centerComponent={{ text: "Menú de administrador", style: { color: '#fff' } }}
          containerStyle={{
            marginTop: Platform.OS === 'ios' ? 0 : - 24,
            borderBottomWidth: 0
          }}
        />
          <ScrollView>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(122,121,225)'}]} onPress={() => {
              Actions.admin_menu()
              }}>
                <Text  style={estilos.botonMenuText}> Modificar Menu </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(68,114,196)'}]}
                onPress={()=>{Actions.admin_espacios()}}
              >
                <Text  style={estilos.botonMenuText}> Manejar espacios </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(0,32,96)'}]}
                onPress={()=>{Actions.admin_puestos()}}
              
              >
                <Text  style={estilos.botonMenuText}> Manejar puestos </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity
                style={[estilos.botonMenu,{backgroundColor: 'rgb(45,203,37)'}]}
                onPress={() => Actions.admin_account_report()}
              >
                <Text  style={estilos.botonMenuText}> Historial de cuentas </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity
                style={[estilos.botonMenu,{backgroundColor: 'rgb(45,203,37)'}]}
                onPress={() => Actions.admin_feedback_report()}
              >
                <Text  style={estilos.botonMenuText}> Reporte retroalimentación </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
              <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(255,74,55)'}]}onPress={() => {
                global.skip = false;
                Actions.auth()
              }}>
                <Text  style={estilos.botonMenuText}> Cerrar sesión </Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.opcion}>
            </View>
          </ScrollView>
        </View>
    );
  }
}