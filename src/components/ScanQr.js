import React, { Component } from 'react';
import { 
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import light from './Common/lightMode';
import dark from './Common/DarkMode';


export default class ScanQr extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.heigth = height;
        this.width = width;      
        this.state = {

            loginProcessing:false

        };
        this.scan = true;

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

    /**
     * 
     * @param String icon nombre del icono del conjunto de iconos
     *              importado
     * @param Function onPress callback para presionar el circulo
     */
    renderCircle(icon, onPress){

        let estilos = this.estilo();
        let circlePadding = 5;
        let circleStyle = {

            width:this.width*0.1,
            height: this.width*0.1,
            borderRadius: this.width*0.1/2,
            justifyContent:"center",
            alignItems:"center",
            elevation: 7,
            backgroundColor:"rgb(255,74,55)"

        };

        return(

            <TouchableOpacity
                style={[estilos.floating_icon, circleStyle]}
                onPress={()=>onPress()}
            >

                <Icon size={this.width*0.1}
                    color="white"
                    name={icon} />

            </TouchableOpacity>

        );

    }

    renderTitle(title){
        
        let titleStyle = {

            width:this.width*0.5,
            marginTop: 20,
            padding: 20,
            marginLeft:this.width*0.25,
            position:"absolute",            
            borderRadius: 13,
            justifyContent:"center",
            alignItems:"center",
            elevation: 7,
            backgroundColor:"white"

        };

        let textStyle={

            fontSize: 15,
            textAlign:"center"

        }

        return(

            <View style={titleStyle}>

                <Text style={textStyle}>

                    {title}

                </Text>

            </View>

        );

    }

    /*********************Callbacks*** */
    onQrRead(data){

        if(!this.scan){

            return;

        }
        this.scan = false;
        this.setState({

            loginProcessing:true

        });
        let url = `/alternative_session/${data.data}`;

        console.log(url);
        axios
            .get(url)
            .then((response)=>{

                global.session_mode = response.data.session_mode;
                global.alt_space_session_key  = response.data.session_key;
                global.active_account = response.data.active_account;
                // Alert.alert("Bienvenido");                

                console.log(global.session_mode);
                console.log(global.alt_space_session_key);
                console.log(global.active_account);
                this.setState({

                    loginProcessing:false

                });

                if(global.session_mode == "COOK"){

                    Actions.cook();

                }else if (global.session_mode == "WAITER"){

                    Actions.waiter();

                }else if (global.session_mode == "SPACE"){
                    if (global.active_account == true) {
                        Actions.diners()
                    } else {
                        Actions.pre_diners();
                    }
                }
                this.scan = true;

            })
            .catch((reason)=>{

                Alert.alert("Ha habido un error");
                this.setState({

                    loginProcessing:false

                });
                this.scan = true;

            })

    }

    render(){

        let estilos = this.estilo();
        let cameraStyle = {

            flex: 1

        }
        return(

            <RNCamera
                style={cameraStyle}
                onBarCodeRead={(event)=>this.onQrRead(event)}
            
            >

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

                {this.renderCircle("md-arrow-round-back", ()=>{

                    Actions.pop();

                })}

                {this.renderTitle("Apunte hacia el código QR para iniciar sesión")}


            </RNCamera>

        );

    }

    

}