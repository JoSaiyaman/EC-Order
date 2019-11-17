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
import { array } from 'prop-types';

let nuevoComplemento = <React.Fragment></React.Fragment>;
export default class adminComplementos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        description: '',
        price: '',
        complements: {},
        received_data: this.props.data,
        id_articulo: '',
        name_articulo:'',
        complements_articulo:[],
        complements_id: [],
        selectedComplements_id: []
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
    let url_guardar_cambios = '/restaurant/menu/article/' + this.state.received_data + '/complements/'
    let parametros ={
      "complements": this.state.selectedComplements_id
    }
    axios.put(url_guardar_cambios, parametros
      ).then(response => {
        Alert.alert("Atención","Complementos actualizados.");
        Actions.pop({ refresh: {key: Math.random()} });
      })
      .catch(error => Alert.alert("Atención","Hubo un error. Los datos no fueron actualizados."));
    console.log(parametros)
  }

  nuevoComplemento(){
    let mensaje = 'Los siguientes campos están vacíos: '
    const precio = parseFloat(this.state.price).toFixed(2)
    const parms = {
        "description": this.state.description,
        "price": precio
    };
    if(this.state.description != '' && this.state.price){
        axios.post('/restaurant/menu/complement/', parms
            ).then(response => {
            Alert.alert("Atención","Se agregó el complemento nuevo.");
            Actions.refresh({ key: Math.random() });
            })
            .catch(error => Alert.alert("Atención","Hubo un error. Los datos no fueron actualizados."));
    } else {
        if(this.state.description == ''){
            mensaje += '\n*Descripción '
        }
        if(this.state.price == ''){
            mensaje += '\n*Precio '
        }
        Alert.alert("Atención",mensaje)
    }
  }

  nuevoComplementoVisible(){
    let estilos = this.estilo()
    nuevoComplemento = <React.Fragment>
      <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                        onPress={() => this.nuevoComplemento()}>
        <Text style={estilos.botonMenuText}>Nuevo Complemento</Text>
      </TouchableOpacity>
    </React.Fragment>
  }

  onPriceChange(text){
    this.setState({ price: text });
    this.nuevoComplementoVisible();
  }

  onDescriptionChange(text){
    this.setState({ description: text });
    this.nuevoComplementoVisible();
  };

  quitarDelArray(arr){
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && array.length){
      what = a[--L];
      while ((ax=arr.indexOf(what)) !== -1){
        arr.splice(ax,1);
      }
    }
    return(arr)
  }

  activarComplemento(id){
    let {selectedComplements_id} = {...this.state}
    selectedComplements_id.push(id);
    this.setState(selectedComplements_id)
  }

  desactivarComplemento(id){
    let {selectedComplements_id} = {...this.state}
    selectedComplements_id = this.quitarDelArray(selectedComplements_id, id);
    this.setState(selectedComplements_id)
  }

  renderComplemento(contenido){
    let estilos = this.estilo()

    console.log("==========arreglo de complementos")
    console.log(this.state.complements_id)
    console.log("==========arreglo de complementos del artíuclo")
    console.log(this.state.selectedComplements_id)

    let complement_id = contenido.item.id
    if (contenido.item.is_active && contenido.item.is_available){
      if(this.state.selectedComplements_id.includes(complement_id)){
        return (
          <TouchableOpacity
            style={estilos.articulo}
            onPress={() => {
              this.desactivarComplemento(complement_id)
            }}
          >
           <View style={{flexDirection: 'row'}}>
              <View style={{flex:1, margin:5}}>
                <Text style = {estilos.complementSelect} >{contenido.item.description} - ${contenido.item.price}</Text>
              </View> 
            </View>
          </TouchableOpacity>
        );
      }else{
        return (
          <TouchableOpacity
            style={estilos.articulo}
            onPress={() => {
              this.activarComplemento(complement_id)
            }}
          >
           <View style={{flexDirection: 'row'}}>
              <View style={{flex:1, margin:5}}>
                <Text style = {estilos.complementNoSelect} >{contenido.item.description} - ${contenido.item.price}</Text>
              </View> 
            </View>
          </TouchableOpacity>
        );
      }
    }
  }

  componentDidMount() {
    nuevoComplemento = <React.Fragment></React.Fragment>;
    axios.get('/restaurant/menu/complement/'
     ).then(response => {
       let complements_id = []
      for(let i = 0; i < response.data.length; i++){
         complements_id.push(response.data[i].id)
       }
        this.setState({
            complements: response.data, 
            complements_id
        });
     })
     .catch(error =>  console.log(error));

    const base_url_section = '/restaurant/menu/article/' + this.state.received_data + '/';
    console.log("==============base_url_ detalle")
    console.log(base_url_section)
    axios.get(base_url_section
     ).then(response => {
      let selectedComplements_id = []
      for(let i = 0; i < response.data.complements.length; i++){
        selectedComplements_id.push(response.data.complements[i].id)
      }
        this.setState({
            id_articulo: response.data.id,
            name_articulo: response.data.name,
            complements_articulo: response.data.complements,
            selectedComplements_id
        });
     })
     .catch(error =>  console.log(error));

     
  }

  render() {
    let estilos = this.estilo()
    // console.log("==========Complementos")
    // console.log(this.state.complements)
    const complementos = this.state.complements;
    const complementos_art = this.state.complements_articulo;
    const datos = this.state.received_data;
    console.log("==========complementos")
    console.log(complementos)
    console.log("==========complementos del articulo")
    console.log(complementos_art)
    
    // const seccion = this.state.full_menu.menusection_set;
    
    return ( 
        <View style = {{flex: 1}}>
            <View style={estilos.container} >
                <Text style = {estilos.titulo2}>Complementos para {this.state.name_articulo}</Text>
                <View style = {{flexDirection: 'row'}}>
                    <View style={[estilos.fieldStyle, {paddingLeft: 20, paddingVertical: 20, paddingRight: 10, width:'65%'}]}>
                        <TextInput
                            placeholder="Nuevo Complemento"
                            autoCorrect={true}
                            autoCapitalize="sentences"
                            onChangeText={this.onDescriptionChange.bind(this)}
                            style={[estilos.login_textInputStyle]}
                            value={this.state.description}
                        />
                    </View>
                    <View style={[estilos.fieldStyle, {paddingLeft: 10, paddingVertical: 20, paddingRight: 20, width:'35%'}]}>
                        <TextInput
                            placeholder="Precio"
                            keyboardType="numeric"
                            onChangeText={this.onPriceChange.bind(this)}
                            style={[estilos.login_textInputStyle,{width:'10%'}]}
                            value={this.state.price}
                        />
                    </View>
                </View>
                {nuevoComplemento}
                <ScrollView style = {[estilos.ScrollContainer,{padding: 10}]} contentContainerStyle={estilos.contentContainer}>
                    <View>
                        <FlatList
                        data={complementos}
                        keyExtractor= {(item, index) => complementos + index.toString()}
                        renderItem={this.renderComplemento.bind(this)}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion,{margin: 15}]} 
                                  onPress={() => this.guardarCambios()}>
                    <Text style={estilos.botonMenuText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}