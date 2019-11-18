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

export default class dinersOrden extends React.Component {
  constructor(props) {
    super(props);  

    this.state = {
      received_data: this.props,
      data1: [],
      data2: [],
      preTotal: 0,
      total: 0
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

  ordenarTodo(){
    const base_url_ordenar = '/alternative_session/' + global.alt_space_session_key + '/space/account/order_cart/'
    console.log("==============base_url_ordenar")
    console.log(base_url_ordenar)
    axios.post(base_url_ordenar
     ).then(response => {
        Actions.refresh({ key: Math.random() });
     })
     .catch(error => Alert.alert("Alerta","No se pudieron realizar las órdenes."));
  }

  quitarPendiente(id){
    const base_url_del_cart = '/alternative_session/' + global.alt_space_session_key + '/space/account/order/'+ id +'/'
    axios.delete(base_url_del_cart
     ).then(response => {
        Actions.refresh({ key: Math.random() });
     })
     .catch(error => Alert.alert("Alerta","No se pudo quitar esta opción de la orden."));
  }

  renderPendientes(orden){   
    let estilos = this.estilo()                   
    return (
        <View style = {{flexDirection: 'row'}}>
            <View style = {{flex: 4}}>
                    <Text style={estilos.subtitulo1}>{orden.item.quantity} - {orden.item.menu_article}</Text>
                    { orden.item.complements.map((item, key)=>(
                        <Text key={key} style={estilos.contenido}> { item } </Text>)
                    )}
            </View>
            <View style = {{flex: 2}}>
                <Text style={estilos.subtitulo1}>${orden.item.considered_price}</Text>  
            </View>
            <View style = {{flex: 1}}>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]}
                onPress={() => {this.quitarPendiente(orden.item.id)}}>
                    <Text style={estilos.botonMenuText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

  renderOrdenados(ordenado){
    let estilos = this.estilo()  
    let color = ''
    let precio = ordenado.item.considered_price;
    switch(ordenado.item.status){
        case "ORDERED":
            color = 'rgb(141, 156, 255)'
            break
        case "ACCEPTED":
            color = 'rgb(247, 255, 141)'
            break
        case "REJECTED":
            color = 'rgb(255, 141, 141)'
            precio = "0.00"
            break
        case "READY":
            color = 'rgb(147, 255, 141)'
            break
        default:
            color = 'white'
            break
    }                 
    return (
        <View style = {{flexDirection: 'row'}}>
            <View style = {{flex: 4}}>
                    <Text style={estilos.subtitulo1}>{ordenado.item.quantity} - {ordenado.item.menu_article}</Text>
                    { ordenado.item.complements.map((item, key)=>(
                        <Text key={key} style={estilos.contenido}> { item } </Text>)
                    )}
            </View>
            <View style = {{flex: 2}}>
                <Text style={estilos.subtitulo1}>${precio}</Text>  
                <Text style={[estilos.contenido,{backgroundColor: color,textAlign: 'center'}]}>
                    {ordenado.item.status}
                </Text>
                <Text></Text>
            </View>
        </View>
    );
  }

  componentDidMount() {
    const base_url_pendiente = '/alternative_session/' + global.alt_space_session_key + '/space/account/order/'
    axios.get(base_url_pendiente
     ).then(response => {
        let preTotal = 0
        for(let i = 0; i < response.data.length; i++){
            preTotal += parseFloat(response.data[i].considered_price)
        }
        this.setState({
            data1: response.data,
            preTotal
        });
     })
     .catch(error =>  console.log(error));
     
    const base_url_ordenado = '/alternative_session/' + global.alt_space_session_key + '/space/account/order_follow_up/'
    axios.get(base_url_ordenado
     ).then(response => {
        let total = 0
        for(let i = 0; i < response.data.length; i++){
            if(response.data[i].status !== "REJECTED"){
                total += parseFloat(response.data[i].considered_price)
            }
        }
        this.setState({
            data2: response.data,
            total
        });
     })
     .catch(error =>  console.log(error));
     

  }

  llamarMesero(){
    axios.post('/alternative_session/' + global.alt_space_session_key + '/space/account/summon_waiter/',
        ).then(response => {
        Alert.alert("Atención","Su mesero ha sido llamado.");
        })
        .catch(error => Alert.alert("Atención","Hubo un error. Su mesero no pudo ser llamado."));
  }

  solicitarCuenta(){
    const base_url_cuenta = '/alternative_session/' + global.alt_space_session_key + '/space/account/check_solicitation/'
  axios.post(base_url_cuenta
      ).then(response => {
          Actions.diners_review();
      })
      .catch(error => Alert.alert("Alerta","No se pudo solicitar la cuenta."));
  
}

pedirCuenta(){
  Alert.alert(
      'Atención',
      'Está por pedir la cuenta. Esto lo imposibilitará de seguir ordenando.',
      [
        {
          text: 'Regresar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.solicitarCuenta()},
      ],
      {cancelable: true},
    );
}


  render() { 
    let estilos = this.estilo()

    const porOrdenar = this.state.data1;
    const ordenado = this.state.data2;
      return (   
        <View style={estilos.container}>
            <View>
                <Header
                backgroundColor= {estilos.navBar.backgroundColor}
                leftComponent={{ icon: "keyboard-arrow-left", onPress:() => {Actions.pop()} }}
                centerComponent={{ text: "Llamar al Mesero", style: estilos.textButton, onPress:() => {this.llamarMesero()} }}
                containerStyle={{
                    marginTop: Platform.OS === 'ios' ? 0 : - 24,
                    borderBottomWidth: 0
                }}
                />
            </View>
          <ScrollView style={{margin: 10}}>
              <View>
                <FlatList
                  ListHeaderComponent = {
                    <View >
                        <Text style={estilos.titulo1}>Pendientes de Ordenar</Text>
                    </View>
                    }
                  data={porOrdenar}
                  keyExtractor= {(item, index) => porOrdenar + index.toString()}
                  renderItem={this.renderPendientes.bind(this)}
                />
             </View>
             <View>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]}
                                    onPress={() => this.ordenarTodo()}>
                    <Text style={estilos.botonMenuText}>Ordenar todo - ${this.state.preTotal.toFixed(2)}</Text>
                </TouchableOpacity>
             </View>
             <View>
                <FlatList
                  ListHeaderComponent = {
                    <View >
                        <Text style={estilos.titulo1}>Artículos Ordenados</Text>
                    </View>
                    }
                  data={ordenado}
                  keyExtractor= {(item, index) => ordenado + index.toString()}
                  renderItem={this.renderOrdenados.bind(this)}
                />
             </View>
             <View style={{marginTop:40, marginBottom:15}}>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]}
                                    onPress={() => this.pedirCuenta()}>
                <Text style={estilos.botonMenuText}>Pedir Cuenta - ${this.state.total.toFixed(2)}</Text>
                </TouchableOpacity>
             </View>
              
          </ScrollView>
        </View>
      );
  }
}