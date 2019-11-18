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
import { 
    Header,
    Icon 
} from 'react-native-elements';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';
import { array } from 'prop-types';

export default class dinersDetalleArticulo extends React.Component {
  constructor(props) {
    super(props);  

    this.state = {
      received_data: this.props,
      data: {},
      cantidad: '0',
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
  checkComplemento(id){
    let {selectedComplements_id} = {...this.state}
    selectedComplements_id.push(id);
    this.setState(selectedComplements_id)
  }
  uncheckComplemento(id){
    let {selectedComplements_id} = {...this.state}
    selectedComplements_id = this.quitarDelArray(selectedComplements_id, id);
    this.setState(selectedComplements_id)
  }
  renderComplemento(complementos){   
    let estilos = this.estilo()
    if (complementos.item.is_active && complementos.item.is_available){
        if(this.state.selectedComplements_id.includes(complementos.item.id)){                   
        return (
            <TouchableOpacity style={estilos.listComplementos}
            onPress={() => this.uncheckComplemento(complementos.item.id)}>
                <Icon
                    name="radio-button-checked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{complementos.item.description} - ${complementos.item.price}</Text>  
            </TouchableOpacity>
        );
    }else{
        return (
            <TouchableOpacity style={estilos.listComplementos}
                onPress={() => this.checkComplemento(complementos.item.id)}>
                <Icon
                    name="radio-button-unchecked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{complementos.item.description} - ${complementos.item.price}</Text>  
            </TouchableOpacity>
        );
      }
    }
  }

  onCantidadChange(text){
    this.setState({ cantidad: text });
  }
  cantidadPlus(){
    var cantNum = parseFloat(this.state.cantidad) + 1
    var cantText = cantNum.toString()
    console.log(cantText)
    this.setState({ cantidad: cantText });
  }
  cantidadMinus(){
    let cantNum = parseFloat(this.state.cantidad).toFixed(2)
    let cantText;
    if(cantNum > 0){
        cantNum--
        cantText = cantNum.toString()
        this.setState({ cantidad: cantText });
    }
  }

  componentDidMount() {
    const base_url_section = '/alternative_session/' + global.alt_space_session_key + '/space/menu/articles/' + this.state.received_data.id + '/';
    console.log("==============base_url_ detalle")
    console.log(base_url_section)
    axios.get(base_url_section
     ).then(response => {
        this.setState({
            data: response.data
        });
     })
     .catch(error =>  console.log(error));
  }

  enviarOrden(){
    let cantNum = parseFloat(this.state.cantidad).toFixed(0)
    if (cantNum > 0){
        const parms = {
            "menu_article": this.state.received_data.id,
            "quantity": cantNum,
            "complements": this.state.selectedComplements_id
        }; 
        axios.post('alternative_session/' + global.alt_space_session_key + '/space/account/order/', parms
            ).then(response => {
            Alert.alert("Atención","La orden fue actualizada. Dirígase a la lista de órdenes (esquina superior derecha) para confirmar.");
            this.setState({
                cantidad: '0',
                selectedComplements_id: []
            });
            })
            .catch(error => Alert.alert("Atención","Hubo un error. La lsita de órdenes no fue actualizada."));
    }else{
        Alert.alert("Indique la cantidad a pedir.")
    }
  }

  llamarMesero(){
    axios.post('alternative_session/' + global.alt_space_session_key + '/space/account/summon_waiter/',
        ).then(response => {
        Alert.alert("Atención","Su mesero ha sido llamado.");
        })
        .catch(error => Alert.alert("Atención","Hubo un error. Su mesero no pudo ser llamado."));
  }

  verOrden(){
    Alert.alert("Aquí va la pantalla de órdenes y eso")
  }

  render() { 
    let estilos = this.estilo()

    const datos = this.state.data;
      return (   
        <View style={estilos.container}>
            <View>
                <Header
                backgroundColor= {estilos.navBar.backgroundColor}
                leftComponent={{ icon: "keyboard-arrow-left", onPress:() => {Actions.pop()} }}
                rightComponent={{ icon:"assignment", onPress:() => {this.verOrden()} }}
                centerComponent={{ text: "Llamar al Mesero", style: estilos.textButton, onPress:() => {this.llamarMesero()} }}
                containerStyle={{
                    marginTop: Platform.OS === 'ios' ? 0 : - 24,
                    borderBottomWidth: 0
                }}
                />
            </View>
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
              <View>
                <Text style={estilos.titulo1}>{datos.name} - ${datos.price}</Text>
              </View>
              <View><Text style={[estilos.subtitulo1,{fontWeight:'normal'}]}>{datos.description}</Text></View>
              <View>
                <FlatList
                  ListHeaderComponent = {
                    <View >
                        <Text style={estilos.titulo2}>Agregar complementos</Text>
                    </View>
                    }
                  data={datos.complements}
                  keyExtractor= {(item, index) => datos.complements + index.toString()}
                  renderItem={this.renderComplemento.bind(this)}
                />
             </View>
                <Text style={estilos.titulo2}>Cantidad a pedir:</Text>
             <View style={[estilos.listComplementos,{justifyContent:'center', paddingBottom:60, paddingHorizontal: 80}]}>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion,{borderBottomRightRadius:0,borderTopRightRadius:0}]} 
                                    onPress={() => this.cantidadMinus()}>
                    <Text style={estilos.botonMenuText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    onChangeText={this.onCantidadChange.bind(this)}
                    style={[estilos.login_textInputStyle,{width:'10%'}]}
                    value={this.state.cantidad}
                />
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion,{borderBottomLeftRadius:0,borderTopLeftRadius:0}]} 
                                    onPress={() => this.cantidadPlus()}>
                    <Text style={estilos.botonMenuText}>+</Text>
                </TouchableOpacity>
             </View>
             <View>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]} 
                                    onPress={() => this.enviarOrden()}>
                    <Text style={estilos.botonMenuText}>Agregar a la orden</Text>
                </TouchableOpacity>
             </View>
              
          </ScrollView>
        </View>
      );
  }
}