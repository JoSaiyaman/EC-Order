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

export default class dinersOrden extends React.Component {
  constructor(props) {
    super(props);  

    this.state = {
      received_data: this.props,
      answer1: 0,
      answer2: 0,
      comentario: ''
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

  answer1(answer){
    this.setState({answer1: answer})
  }
  renderPregunta1(numero){   
      console.log(numero)
    let estilos = this.estilo()
    if(numero.item == this.state.answer1){
        return (
            <TouchableOpacity style={estilos.listComplementos}
                            onPress={() => this.answer1(numero.item)}>
                <Icon
                    name="radio-button-checked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{numero.item}</Text>  
            </TouchableOpacity>        
        );
    }else{
        return (
            <TouchableOpacity style={estilos.listComplementos}
                            onPress={() => this.answer1(numero.item)}>
                <Icon
                    name="radio-button-unchecked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{numero.item}</Text>  
            </TouchableOpacity>        
        );
    }                   
  }
  answer2(answer){
    this.setState({answer2: answer})
  }
  renderPregunta2(numero){
    let estilos = this.estilo()                  
    if(numero.item == this.state.answer2){
        return (
            <TouchableOpacity style={estilos.listComplementos}
                            onPress={() => this.answer2(numero.item)}>
                <Icon
                    name="radio-button-checked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{numero.item}</Text>  
            </TouchableOpacity>        
        );
    }else{
        return (
            <TouchableOpacity style={estilos.listComplementos}
                            onPress={() => this.answer2(numero.item)}>
                <Icon
                    name="radio-button-unchecked"
                    type="MaterialIcons"
                />
                <Text style={estilos.contenido}>{numero.item}</Text>  
            </TouchableOpacity>        
        );
    } 
  }

  llamarMesero(){
    axios.post('/alternative_session/' + global.alt_space_session_key + '/space/account/summon_waiter/',
        ).then(response => {
        Alert.alert("Atención","Su mesero ha sido llamado.");
        })
        .catch(error => Alert.alert("Atención","Hubo un error. Su mesero no pudo ser llamado."));
  }
  
  onComentarioChange(text){
    this.setState({ comentario: text });
  };

  enviarEncuesta(){
      let servicio = parseInt(this.state.answer1)
      let calidad = parseInt(this.state.answer2)
    const parms = {
        "service_feedback": servicio,
        "food_quality_feedback": calidad,
        "feedback_comment": this.state.comentario
    };
    if(servicio != 0 && calidad != 0){
        const base_url_update = '/alternative_session/' + global.alt_space_session_key + '/space/account/feedback/';
        axios.put(base_url_update, parms
          ).then(response => {
             Alert.alert("Gracias por contestar la encuesta.")
             Actions.diners_cuenta();
          })
          .catch(error => Alert.alert("Atención","Hubo un error. Los datos no fueron actualizados."));

    } else {
        Alert.alert("Atención","Por favor conteste las preguntas.")
    }

}

  render() { 
    let estilos = this.estilo()

    const pregunta1 = [1,2,3,4,5];
    const pregunta2 = [1,2,3,4,5];
      return (   
        <View style={estilos.container}>
            <View>
                <Header
                backgroundColor= {estilos.navBar.backgroundColor}
                // leftComponent={{ icon: "keyboard-arrow-left", onPress:() => {Actions.pop()} }}
                centerComponent={{ text: "Llamar al Mesero", style: estilos.textButton, onPress:() => {this.llamarMesero()} }}
                rightComponent={{ text: "Omitir", style: estilos.textButton, onPress:() => {Actions.diners_cuenta()}  }}
                containerStyle={{
                    marginTop: Platform.OS === 'ios' ? 0 : - 24,
                    borderBottomWidth: 0
                }}
                />
            </View>
          <ScrollView style={{margin: 10}}>
              <View>
                <Text style={estilos.titulo1}>Encuesta</Text>
                <Text style={[estilos.titulo2,{textAlign: "justify"}]}>
                    Del 1 al 5, 1 siendo pésimo y 5 siendo excelente, ¿de qué manera evalúas nuestro servicio?
                </Text>
                <FlatList
                  horizontal = {true}
                  data={pregunta1}
                  keyExtractor= {(item, index) => pregunta1 + index.toString()}
                  renderItem={this.renderPregunta1.bind(this)}
                />
             </View>
             <Text style={[estilos.titulo2,{textAlign: "justify"}]}>
                 Del 1 al 5, 1 siendo pésimo y 5 siendo excelente, ¿de qué manera evalúas nuestra comida?
             </Text>
             <View>
                <FlatList
                  horizontal = {true}
                  data={pregunta2}
                  keyExtractor= {(item, index) => pregunta2 + index.toString()}
                  renderItem={this.renderPregunta2.bind(this)}
                />
             </View>
             <View style={[estilos.fieldStyle, {paddingHorizontal: 4, paddingVertical: 16}]}>
                <TextInput
                    placeholder="Comentarios"
                    multiline={true}
                    autoCorrect={true}
                    autoCapitalize="sentences"
                    onChangeText={this.onComentarioChange.bind(this)}
                    style={estilos.login_textInputStyle}
                    value={this.state.comentario}
                />
              </View>
             <View style={{marginTop:40, marginBottom:15}}>
                <TouchableOpacity style={[estilos.botonMenu,estilos.colorBotonesAccion]}
                                    onPress={() => this.enviarEncuesta()}>
                <Text style={estilos.botonMenuText}>Continuar</Text>
                </TouchableOpacity>
             </View>
              
          </ScrollView>
        </View>
      );
  }
}