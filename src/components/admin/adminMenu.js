import React from 'react';
import { 
  Platform,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  TextInput, 
  FlatList,
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

let contentRender = <React.Fragment><Text>
    </Text></React.Fragment>;
export default class adminMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        sectionName: '',
        section_data: [],
        full_menu: [],
        current_section: '',
        first_section: true
    };
  }

  estilo(){
    switch (global.style){
      case 'light':
        return(light);
      case 'dark':
        return(dark);
      default:
        return(light);
    }
  }

  onSectionNameChange(text){
    this.setState({ sectionName: text });
  };

  renderTabs(seccion){
    let estilos = this.estilo()
    // console.log(seccion.item.is_active)
    if(seccion.item.is_active){
      if(this.state.first_section){
        this.setState({
          first_section: false,
          sectionName: seccion.item.description,
          current_section: seccion.item.id
        });
      }
      return(
      <TouchableOpacity style={[estilos.tabMenu,{backgroundColor: 'rgb(122,121,225)'}]} onPress={() => {
        // this.changeSection(seccion.item.menuarticle_set)
        this.changeSection(seccion.item.id)
        this.forceUpdate()
        }}>
          <Text style={estilos.botonMenuText}>{seccion.item.description}</Text>
      </TouchableOpacity>
      );
    }
  }
  changeSection(articulos){
    console.log("=========Change Section =============")
    console.log(articulos)
    contentRender = <React.Fragment><Text>
      {articulos}</Text></React.Fragment>;
    this.setState(this.state);
  }

  componentDidMount() {
    const base_url_section = '/restaurant/menu/';
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            full_menu: response.data
        });
     })
     .catch(error =>  console.log(error));
  }

  render() {
    let estilos = this.estilo()
    
    const seccion = this.state.full_menu.menusection_set;
    console.log(contentRender)
    
    return ( 
        <View style = {{flexDirection: 'row', flex: 1}}>
            <View style={[estilos.columna1,estilos.container]}>
              <FlatList
                data={seccion}
                keyExtractor= {(item, index) => seccion + index.toString()}
                renderItem={this.renderTabs.bind(this)}
              />
              <TouchableOpacity style={[estilos.tabMenu,{backgroundColor: 'rgb(122,121,225)'}]}>
                  <Text style={estilos.botonMenuText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.columna2}>
                <View style={estilos.container} >
                    <View style={[estilos.fieldStyle, {padding: 20}]}>
                        <TextInput
                            autoCorrect={true}
                            autoCapitalize="none"
                            onChangeText={this.onSectionNameChange.bind(this)}
                            style={estilos.login_textInputStyle}
                            value={this.state.sectionName}
                        />
                        {contentRender}
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