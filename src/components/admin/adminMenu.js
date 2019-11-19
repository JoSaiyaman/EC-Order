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
let botonGuardar = <React.Fragment></React.Fragment>;
var nuevo = false;
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

  guardarCambios(){
    Alert.alert("Alert")
  }

  onSectionNameChange(text){
    let estilos = this.estilo()
    this.setState({ sectionName: text });
    if(nuevo){
      botonGuardar = <React.Fragment>
        <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                          onPress={() => this.crearSeccion()}>
          <Text style={estilos.botonMenuText}>Crear Seccion</Text>
        </TouchableOpacity>
      </React.Fragment>
    }else{
      botonGuardar = <React.Fragment>
        <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                          onPress={() => this.guardarCambios()}>
          <Text style={estilos.botonMenuText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </React.Fragment>
    }
  };

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
            Actions.admin_detalle_articulo(contenido.item)
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
    let estilos = this.estilo()
    console.log("=========id section =============")
    console.log(articulos)

    nuevo = false;
    let section_id = articulos.id;
    botonGuardar = <React.Fragment></React.Fragment>;
    contentRender = <React.Fragment>
      <View>
        <FlatList
          data={articulos.menuarticle_set}
          keyExtractor= {(item, index) => articulos.menuarticle_set + index.toString()}
          renderItem={this.renderSection.bind(this)}
        />
        <Text></Text>
        <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]}
          onPress={() => {
            Actions.admin_nuevo_articulo(section_id)
        }}>
          <Text style={estilos.botonMenuText}>+ Agregar artículo de menú</Text>
        </TouchableOpacity>
      </View>
      </React.Fragment>;
      // console.log(articulos.item.description)
    this.setState({sectionName: articulos.description});
  }

  componentDidMount() {
    nuevo = true;
    contentRender = <React.Fragment> 
      <Text>Mensaje de Bienvenida</Text> 
      </React.Fragment>;
    const base_url_section = '/restaurant/menu/';
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            full_menu: response.data
        });
     })
     .catch(error =>  console.log(error));
  }

  crearSeccion(){
    let parms = {
      "description": this.state.sectionName
    }
    if(this.state.sectionName != ''){
      axios.post('/restaurant/menu/section/', parms
        ).then(response => {
           Alert.alert("Atención","Artículo actualizado")
           Actions.refresh({ key: Math.random() });
        })
        .catch(error => Alert.alert("Atención","Hubo un error. Los datos no fueron actualizados."));
    } else {
        Alert.alert("Atención","Se requiere un nombre para la sección.")
    }
  }

  nuevaSeccion(){
    nuevo = true;    
    botonGuardar = <React.Fragment></React.Fragment>;
    contentRender = <React.Fragment> 
      <Text></Text> 
      </React.Fragment>;
    this.setState({sectionName: ''})
  }

  render() {
    let estilos = this.estilo()
    
    const seccion = this.state.full_menu.menusection_set;
    
    return ( 
        <View style = {{flexDirection: 'row', flex: 1}}>
            <View style={[estilos.columna1,estilos.container2]}>
              <FlatList
                data={seccion}
                keyExtractor= {(item, index) => seccion + index.toString()}
                renderItem={this.renderTabs.bind(this)}
              />
              <TouchableOpacity style={[estilos.tabMenu,estilos.colorBotonesAccion]} 
                        onPress={() => this.nuevaSeccion()}>
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
                    </View>
                    <ScrollView style = {[estilos.ScrollContainer,{padding: 10}]} contentContainerStyle={estilos.contentContainer}>
                      {contentRender}
                      {botonGuardar}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
  }
}