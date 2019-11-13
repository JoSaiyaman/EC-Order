import React from 'react';
import { 
  Platform,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  TextInput, 
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
import axios from 'axios';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';

export default class adminMenu extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
        sectionNo: props.data,
        sectionName: '',
        section_data: []
    };
    console.log(this.state.sectionNo);
  }

  onSectionNameChange(text){
    this.setState({ sectionName: text });
  };

  componentDidMount() {
    const base_url_section = '/restaurant/menu/section/' + this.state.sectionNo + '/';
    console.log("==========base_url_section");
    console.log(base_url_section)
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            section_data: response.data,
            sectionName: response.data.description
        });
     })
     .catch(error =>  console.log(error));
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
        <View style = {{flexDirection: 'row', flex: 1}}>
            <View style={estilos.columna1}></View>
            <View style={estilos.columna2}>
                <View style={estilos.container} >
                    <View style={[estilos.fieldStyle, {padding: 20}]}>
                        <TextInput
                            autoCorrect={true}
                            autoCapitalize="none"
                            onChangeText={this.onSectionNameChange.bind(this)}
                            style={estilos.login_textInputStyle}
                            value={this.state.sectionName} // Async
                        />
                    </View>
                    <ScrollView>
                        <View style={estilos.opcion}>
                        <TouchableOpacity style={[estilos.botonMenu,{backgroundColor: 'rgb(122,121,225)'}]}>
                            <Text  style={estilos.botonMenuText}> Modificar Menu </Text>
                        </TouchableOpacity>
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
            </View>
        </View>
    );
  }
}