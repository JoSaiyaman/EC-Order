import React, { Component } from 'react';
import { 
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TextInput, 
  ToastAndroid
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
        Actions.main();
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

  renderButton() {
    return (
      <Button title={"Login"} 
      buttonStyle={{backgroundColor: 'rgb(255,74,55)', width:130, elevation: 1}} 
      onPress={this.handleRequest.bind(this)}/>  
    );
  }

  render() {
    let estilos;
    let bgimage;
    // console.log("GLOBAL STYLE => "+ global.style)
    // switch (global.style){
    switch ('light'){
    case 'light':
      estilos = light;
      bgimage = require('../../assets/images/yellow_forked_background.png')
      break;
    case 'dark':
      estilos = dark;
      bgimage = require('../../assets/images/yellow_squared_background.png')
      break;
    default:
      estilos = light;
      bgimage = require('../../assets/images/yellow_forked_background.png')
      break; 
    }

    const {
      formContainerStyle,
      fieldStyle,
      buttonContainerStyle,
      viewFontLogin
    } = style;
    const version = 'V0.0.0';
    return (
      <ScrollView style={estilos.loginBackground}>
        <ImageBackground source={bgimage} style={{width: '100%'}}>
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
                  // source={require("../../assets/images/LOGO.png")}
                  />
                  <View style = {viewFontLogin}>
                    <Text style = {estilos.fontLogin}>Usuario</Text>
                  </View>
                  <View style={fieldStyle}>
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={this.onUsernameChange.bind(this)}
                      style={estilos.login_textInputStyle}
                      value={this.state.username} // Async
                    />
                  </View>
                  <View style = {viewFontLogin}><Text style = {estilos.fontLogin}>Contraseña</Text></View>
                  <View style={fieldStyle}>
                    <TextInput
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={this.onPasswordChange.bind(this)}
                      style={estilos.login_textInputStyle}
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
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
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