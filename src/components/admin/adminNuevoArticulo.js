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

export default class adminNuevoArticulo extends React.Component {
  constructor(props) {
    super(props);  
    // const {height, width} = Dimensions.get("window");
    // this.height = height;
    // this.width = width;


    this.state = {
      section_id: this.props.data,
      name: '',
      description: '',
      price: ''
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

  crearArticulo(){
      let mensaje = 'Los siguientes campos están vacíos: '
      const parms = {
        "menu_section": this.state.section_id,
        "name": this.state.name,
        "description": this.state.description,
        "price": this.state.price
      };
      console.log(parms)
      if(this.state.name != '' && this.state.description != '' && this.state.price){
          const base_url_update = '/restaurant/menu/article/';
          axios.post(base_url_update, parms
            ).then(response => {
               Alert.alert("Atención","Nuevo artículo creado")
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

  
  onNameChange(text){
    this.setState({ name: text });
  };
  onPriceChange(text){
    this.setState({ price: text });
  };
  onDescriptionChange(text){
    this.setState({ description: text });
  };

  render() { 
    let estilos = this.estilo()

      return (   
        <View style={estilos.container}>
          <ScrollView style={{margin: 10}}>
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
              <TouchableOpacity style={[estilos.tabMenu,estilos.colorBotonesAccion]} 
                        onPress={() => this.crearArticulo()}>
                    <Text style={estilos.botonMenuText}>Crear Artículo</Text>
                </TouchableOpacity>
              <View>
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