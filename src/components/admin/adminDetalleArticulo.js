import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image, 
  Dimensions,
  TextInput, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { colors } from 'react-native-elements';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';

let botonGuardar = <React.Fragment></React.Fragment>;
export default class adminDetalleArticulo extends React.Component {
  constructor(props) {
    super(props);  
    // const {height, width} = Dimensions.get("window");
    // this.height = height;
    // this.width = width;


    this.state = {
      received_data: this.props,
      data: {},
      name: '',
      description: '',
      price: ''
    };
    console.log("=============Detalle=======")
    console.log(this.state.received_data)
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

  componentDidMount() {
    botonGuardar = <React.Fragment></React.Fragment>;
    const base_url_section = '/restaurant/menu/article/' + this.state.received_data.id + '/';
    console.log("==============base_url_ detalle")
    console.log(base_url_section)
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            data: response.data,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price
        });
     })
     .catch(error =>  console.log(error));
  }

  guardarCambios(){
      let mensaje = 'Los siguientes campos están vacíos: '
      const parms = {
        "name": this.state.name,
        "description": this.state.description,
        "price": this.state.price,
        "is_active": true,
        "is_available": true
      };
      if(this.state.name != '' && this.state.description != '' && this.state.price){
          const base_url_update = '/restaurant/menu/article/' + this.state.received_data.id + '/';
          axios.put(base_url_update, parms
            ).then(response => {
               Alert.alert("Atención","Artículo actualizado")
               Actions.pop({ refresh: {key: Math.random()} });
            })
            .catch(error => Alert.alert("Atención","Hubo un error. Los datos no fueron actualizados."));

      } else {
          if(this.state.name == ''){
              mensaje += '\n*Nombre'
          }
          if(this.state.description == ''){
            mensaje += '\n*Descripción '
          }
          if(this.state.price == ''){
            mensaje += '\n*Precio '
          }
          Alert.alert("Atención",mensaje)
      }

  }

  botonGuardarVisible(){
    let estilos = this.estilo()
    botonGuardar = <React.Fragment>
      <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                        onPress={() => this.guardarCambios()}>
        <Text style={estilos.botonMenuText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </React.Fragment>
  }
  
  onNameChange(text){
    this.setState({ name: text });
    this.botonGuardarVisible();
  };
  onPriceChange(text){
    this.setState({ price: text });
    this.botonGuardarVisible();
  };
  onDescriptionChange(text){
    this.setState({ description: text });
    this.botonGuardarVisible();
  };

  render() { 
    let estilos = this.estilo()
    // const loading_producto_data = this.state.loading_producto_data;

    const datos = this.state.data;
    // var datos = this.state.received_data; // Esto funciona mejor en el menú del cliente. Acá no porque puede haber cambios.
    // if (loading_producto_data != true) {
      return (   
        <View style={estilos.container}>
          <ScrollView style={{margin: 10}}>
              <ScrollView>
                <View style ={estilos.header}>
                    <FlatList
                    horizontal={true}
                    data={datos.menuarticleimage_set}
                    keyExtractor= {(item, index) => datos.menuarticleimage_set + index.toString()}
                    renderItem={({ item }) => {
                    return (
                        <Image source={{uri: item.image}} style={{width: 100, height: 100}}/>
                        );
                    }}
                    />
                </View>
              </ScrollView>
              <View style={[estilos.fieldStyle, {padding: 20}]}>
                <TextInput
                    placeholder="Nombre del artículo"
                    autoCorrect={true}
                    autoCapitalize="sentences"
                    onChangeText={this.onNameChange.bind(this)}
                    style={estilos.login_textInputStyle}
                    value={this.state.name}
                />
              </View>
              <View style={[estilos.fieldStyle, {padding: 20}]}>
                <TextInput
                    placeholder="Precio del artículo"
                    keyboardType="numeric"
                    onChangeText={this.onPriceChange.bind(this)}
                    style={estilos.login_textInputStyle}
                    value={this.state.price}
                />
              </View>
              <View style={[estilos.fieldStyle, {padding: 20}]}>
                <TextInput
                    placeholder="Descripción del artículo"
                    multiline={true}
                    autoCorrect={true}
                    autoCapitalize="sentences"
                    onChangeText={this.onDescriptionChange.bind(this)}
                    style={estilos.login_textInputStyle}
                    value={this.state.description}
                />
              </View>
              {botonGuardar}
              <View>
                <FlatList
                ListHeaderComponent = {
                  <View >
                    <Text style={estilos.subtitulo1}> Complementos </Text>
                  </View>
                  }
                  data={datos.complements}
                  keyExtractor= {(item, index) => datos.complements + index.toString()}
                  renderItem={({ item }) => {
                  return (
                    <View>
                      <Text style={estilos.contenido}>{item.description} - ${item.price}</Text>  
                    </View>
                    );
                  }}
                />
             </View>
             <View>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                                    onPress={() => Actions.admin_complementos(datos.id)}>
                    <Text style={estilos.botonMenuText}>Editar Complementos</Text>
                </TouchableOpacity>
             </View>
              
          </ScrollView>
        </View>
      );
    // } else {
    //   return (   
    //     <LoadingScreen/>
    //   );
    // } 
  }
}