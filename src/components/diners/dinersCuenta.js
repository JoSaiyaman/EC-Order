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

export default class dinersCuenta extends React.Component {
  constructor(props) {
    super(props);  

    this.state = {
      received_data: this.props,
      data: [],
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

  renderCuenta(articulo){   
    let estilos = this.estilo()                   
    return (
        <View style = {{flexDirection: 'row', paddingVertical:5}}>
            <View style = {{flex: 4}}>
                    <Text style={estilos.subtitulo1}>{articulo.item.quantity} - {articulo.item.menu_article}</Text>
                    { articulo.item.complements.map((item, key)=>(
                        <Text key={key} style={[estilos.contenido,{padding: 0}]}> { item } </Text>)
                    )}
            </View>
            <View style = {{flex: 2}}>
                <Text style={estilos.subtitulo1}>${articulo.item.considered_price}</Text>  
            </View>
        </View>
    );
  }


  componentDidMount() {
    const base_url_ticket = '/alternative_session/' + global.alt_space_session_key + '/space/account/ticket/'
    axios.get(base_url_ticket
     ).then(response => {
        this.setState({
            data: response.data,
            total: response.data.total_price.considered_price__sum
        });
     })
     .catch(error =>  console.log(error));
     
     

  }

  render() { 
    let estilos = this.estilo()

    const articulos = this.state.data.accountorder_set;
      return (   
        <View style={estilos.container}>
          <ScrollView style={{margin: 10}}>
              <View>
                <FlatList
                  ListHeaderComponent = {
                    <View >
                        <Text style={estilos.titulo1}>Cuenta</Text>
                    </View>
                    }
                  data={articulos}
                  keyExtractor= {(item, index) => articulos + index.toString()}
                  renderItem={this.renderCuenta.bind(this)}
                />
             </View>  
             {/* ======Temp. Esto no se hace. Sólo el mesero cierra la cuenta. */} 
             <TouchableOpacity onPress={() => Actions.auth()}> 
                <Text style={[estilos.titulo1,{textAlign:'right'}]}>Total: ${this.state.total}</Text>               
             </TouchableOpacity>
          </ScrollView>
        </View>
      );
  }
}