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
export default class dinersMenu extends React.Component {
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

  renderTabs(seccion){
    let estilos = this.estilo()
    // console.log(seccion.item.is_active)
    if(seccion.item.is_active){
      return(
      <TouchableOpacity style={[estilos.tabMenu,{backgroundColor: 'rgb(122,121,225)'}]} onPress={() => {
        this.changeSection(seccion.item)
        this.forceUpdate()
        }}>
          <Text style={estilos.botonMenuText}>{seccion.item.description}</Text>
      </TouchableOpacity>
      );
    }
  }

  renderSection(contenido){
    let estilos = this.estilo()
    let imagen_url;
    if(contenido.item.menuarticleimage_set.length > 0){
      imagen_url = contenido.item.menuarticleimage_set[0].image
    }else{
      imagen_url = ''
    }
    if (contenido.item.is_active && contenido.item.is_available){
      return (
        <TouchableOpacity
          style={estilos.articulo}
          onPress={() => {
            Actions.diners_detalle_articulo(contenido.item)
            this.setState({ state: this.state });
          }}
        >
         <View style={{flexDirection: 'row'}}>
            <Image source={{uri: imagen_url}} style={{width: 45, height: 45}}/>
            <View style={{flex:1, margin:5}}>
              <Text style = {{fontWeight: "bold"}} >{contenido.item.name} - ${contenido.item.price}</Text>
              <Text>{contenido.item.description}</Text>                  
              <View style={{ flex: 1 }}>
              </View>
            </View> 
          </View>
        </TouchableOpacity>
      );
    }
  }

  changeSection(articulos){
    contentRender = <React.Fragment>
      <View>
        <FlatList
          data={articulos.menuarticle_set}
          keyExtractor= {(item, index) => articulos.menuarticle_set + index.toString()}
          renderItem={this.renderSection.bind(this)}
        />
      </View>
      </React.Fragment>;
    this.setState({sectionName: articulos.description});
  }

  componentDidMount() {
    contentRender = <React.Fragment> 
      <Text>Mensaje de Bienvenida</Text> 
      </React.Fragment>;
    const base_url_section = '/alternative_session/' + global.alt_space_session_key + '/space/menu/';
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            full_menu: response.data
        });
     })
     .catch(error =>  console.log(error));
  }
  
  llamarMesero(){
    axios.post('alternative_session/' + global.alt_space_session_key + '/space/account/summon_waiter/',
        ).then(response => {
        Alert.alert("Atención","Su mesero ha sido llamado.");
        })
        .catch(error => Alert.alert("Atención","Hubo un error. Su mesero no pudo ser llamado."));
  }

  verOrden(){
    Actions.diners_orden();
  }

  render() {
    let estilos = this.estilo()
    
    const seccion = this.state.full_menu;
    console.log(global.alt_space_session_key)
    
    return ( 
        <View View style = {{flexDirection: 'column', flex: 1}}> 
            <View>
                <Header
                backgroundColor= {estilos.navBar.backgroundColor}
                leftComponent={{ icon: "keyboard-arrow-left", onPress:() => {Actions.auth()} }}
                rightComponent={{ icon:"assignment", onPress:() => {this.verOrden()} }}
                centerComponent={{ text: "Llamar al Mesero", style: estilos.textButton, onPress:() => {this.llamarMesero()} }}
                containerStyle={{
                    marginTop: Platform.OS === 'ios' ? 0 : - 24,
                    borderBottomWidth: 0
                }}
                />
            </View>
            <View style = {{flexDirection: 'row', flex: 1}}>
                <View style={[estilos.columna1,estilos.container2]}>
                <FlatList
                    data={seccion}
                    keyExtractor= {(item, index) => seccion + index.toString()}
                    renderItem={this.renderTabs.bind(this)}
                />
                </View>
                <View style={estilos.columna2}>
                    <View style={estilos.container} >
                        <View style={[estilos.fieldStyle, {padding: 20}]}>
                            <Text style={estilos.titulo1}>{this.state.sectionName}</Text>
                        </View>
                        <ScrollView style = {[estilos.ScrollContainer,{padding: 10}]} contentContainerStyle={estilos.contentContainer}>
                        {contentRender}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}