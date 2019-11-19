import React, { Component } from 'react';
import { 
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TextInput, 
  ToastAndroid,
  Alert
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import light from './Common/lightMode';
import dark from './Common/DarkMode';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginProcessing: false,
      // PRUEBAS ---------------------
      password: 'password',
      // PRUEBAS END ----------------------
      username: global.userId
    };
  }  

  setUserId(USUARIO) {
    (async ()=>{
     await AsyncStorage.setItem("A_USUARIO",USUARIO)
     console.log("############# Se guardó el USUARIO")
    })()
  }

  handleRequest() {
    const payload = { 
      "username": this.state.username, 
      "password": this.state.password 
    } 
    
    if (payload.username == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Se debe ingresar un usuario',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else if (payload.password == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Se debe ingresar una contraseña',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      this.setState({ loginProcessing: true });
      axios
      .post('/auth/login/', payload)
      .then(response => {
        const token = response.data.token;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        console.log(token)
        Actions.admin();
        this.setUserId(payload.username);
      })
      .catch(error => {
        this.setState({loginProcessing: false});
        ToastAndroid.showWithGravityAndOffset("Las credenciales no son válidas.",ToastAndroid.LONG,ToastAndroid.BOTTOM,0,50);
      })
    }
  }

// ======================temp: Esto no va aquí; va con el escáner de QR
  dinerLogin(){
    let QR = 'S_b4ce81f6-ddd0-485a-9167-3d93c0acba43'
    this.setState({ loginProcessing: true });
    axios
    .get('/alternative_session/' + QR + '/')
    .then(response => {
      if(response.data.active_account){
        // const token = response.data.token;
        // axios.defaults.headers.common.Authorization = `Token ${token}`;
        global.alt_space_session_key = response.data.session_key
        Actions.diners()
      }else{
        this.setState({loginProcessing: false});
        Alert.alert("Cuenta desactivada");
      }
    })
    .catch(error => {
      this.setState({loginProcessing: false});
      Alert.alert("Hubo un error")
      })
  }
// ==========================================temp

  handleRequest() {
    const payload = { 
      "username": this.state.username, 
      "password": this.state.password 
    } 
    
    if (payload.username == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Se debe ingresar un usuario',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else if (payload.password == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Se debe ingresar una contraseña',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      this.setState({ loginProcessing: true });
      axios
      .post('/auth/login/', payload)
      .then(response => {
        const token = response.data.token;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        console.log(token)
        Actions.admin();
        this.setUserId(payload.username);
      })
      .catch(error => {
        this.setState({loginProcessing: false});
        ToastAndroid.showWithGravityAndOffset("Las credenciales no son válidas.",ToastAndroid.LONG,ToastAndroid.BOTTOM,0,50);
      })
    }
  }
  
  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
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

  renderButton() {
    let estilos = this.estilo()
    return (
      <View>
        <Button title={"Iniciar sesión"} 
        buttonStyle={[estilos.colorBotonesAccion,{ width:130, elevation: 1, backgroundColor: "#3d405b"}]} 
        onPress={this.handleRequest.bind(this)}/>  
        <Button title={"Escanear QR"}
          buttonStyle={{ backgroundColor: 'rgb(255,74,55)', width: 130, elevation: 1, marginTop:20 }}
          onPress={() => Actions.scan()} />
      </View>
    );
  }
  render() {
    let estilos = this.estilo()
    // let bgimage;
    // console.log("GLOBAL STYLE => "+ global.style)
    // switch (global.style){
    //   switch('light'){
    //   case 'light':
    //     bgimage = require('../../assets/images/yellow_forked_background.png')
    //     break;
    //   case 'dark':
    //     bgimage = require('../../assets/images/yellow_squared_background.png')
    //     break;
    //   default:
    //     bgimage = require('../../assets/images/yellow_forked_background.png')
    //     break; 
    // }

    const {
      formContainerStyle,
      buttonContainerStyle,
      viewFontLogin
    } = style;
    const version = 'V0.0.0';
    return (
      <ScrollView style={[estilos.loginBackground, {backgroundColor: "orange"}]}>
        <ImageBackground style={{width: '100%'}}>
          <View style={styles.versionPosition}>
            <Text>{version}</Text>
          </View>
          <View style={styles.mainDiv} >
            <Overlay
              isVisible={this.state.loginProcessing}
              windowBackgroundColor="rgba(255, 255, 255, .3)"
              overlayBackgroundColor="rgba(255, 255, 255, .0)"
              fullScreen= {true}
            >
              <View style={estilos.loadingContainer}>
                <Image style={estilos.logo_image} source={require("../../assets/gifs/bars.gif")}/>
              </View>
            </Overlay>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={formContainerStyle}>
                  <Image style={estilos.login_logo_image} 
                    source={require('../../assets/images/e_order_logo.png')}
                  />
                  <View style = {viewFontLogin}>
                    <Text style = {[estilos.fontLogin, {fontWeight: "bold"}]}>Usuario</Text>
                  </View>
                  <View style={estilos.fieldStyle}>
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={this.onUsernameChange.bind(this)}
                      style={[estilos.login_textInputStyle, {backgroundColor: 'white', color: "#222"}]}
                      value={this.state.username} // Async
                    />
                  </View>
                  <View style = {viewFontLogin}>
                    <Text style = {[estilos.fontLogin, {fontWeight: "bold"}]}>Contraseña</Text>
                  </View>
                  <View style={estilos.fieldStyle}>
                    <TextInput
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={this.onPasswordChange.bind(this)}
                      style={[estilos.login_textInputStyle, {backgroundColor: 'white', color: "#222"}]}
                    />
                  </View>
                </View>
                <View style={buttonContainerStyle}>
                  {this.renderButton()}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewFontLogin: {
    width: 300,
    alignItems: 'flex-start'
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
});

const styles = StyleSheet.create({
  mainDiv: {
      flex: 1,
      margin: 35,
      marginTop: 20,
      marginBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  versionPosition: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 5,
    color: "white"
  }
});


export default Login;