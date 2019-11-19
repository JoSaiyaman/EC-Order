import React, {Component} from 'react';
import { 
  Platform,
  ScrollView,
  View,
  Text,
  Linking,
  Dimensions,
  TouchableOpacity,
  TextInput, 
  FlatList,
  StyleSheet,
  ListItem,
  Alert,
  TouchableHighlight,
  Button
} from 'react-native'; 
import { 
  Header,
  Image,
  Card,  
  Badge,  
} from 'react-native-elements';

import QRCode from 'react-native-qrcode-svg';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';
import { array } from 'prop-types';

export default class adminAltaEspacio extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.heigth = height;
        this.width = width;

        this.state ={

            espacios:[],
            new_spacio_name:"",
            loading:true

        };

        /**
         * *****************Estilo*********************
         * 
         */
        this.padding = 13
        this.style = StyleSheet.create({

            add_space_bar:{

                flexDirection:"row",
                justifyContent:"center",
                alignContent:"center",
                padding:this.padding                

            },

            label_text:{

                fontSize:20,
                flex:4,
                textAlign:"center",
                textAlignVertical:"center"

            },

            add_field:{

                flex:5,
                height:this.heigth*0.06,
                padding:3,
                backgroundColor:"white",
                borderRadius: 4,
                elevation:7

            },

            button:{

                flex:1,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"rgb(255,74,55)",
                height: 40
            },

            headers:{

                flexDirection:"row",
                justifyContent:"center",
                alignContent:"center"

            },

            header_center:{

                fontSize:20,
                textAlign:"center",
                textAlignVertical:"center"

            }

        });

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
     * *****************************************
     * Lifecycle********************************
     * ******************************************
     */

    componentDidMount(){

        let url = "/restaurant/space/list/";
        axios.get(url)
            .then((response)=>{

                //console.log(response)
                this.setState({

                    espacios: response.data,
                    loading:false

                });

            })
            .catch(error=>{

                Alert.alert("Ha habido un error. Intente más tarde");

            });

    }

    /**
     * *****************************************
     * Callbacks********************************
     * ******************************************
     */

    onAddMesage(){

        if(this.state.new_spacio_name == ""){

            Alert.alert("Debe introducir un nombre para la mesa");
            return

        }
        this.setState({

            new_spacio_name:""

        });
        let url = "/restaurant/space/";
        let params = {

            name:this.state.new_spacio_name

        };
        
        axios.post(url, params)
            .then((response)=>{

                let {espacios} = this.state;
                espacios.push(response.data);
                this.setState({espacios});

            })
            .catch((error)=>{

                Alert.alert("Ha habido un error. Intente más tarde");

            })

    }

    /**
     * *****************************************
     * Rendererss********************************
     * ******************************************
     */

    renderItem(mesa){

        /**
         * 
         * {
                "id": 1,
                "name": "Mesa grande 1",
                "space_qr_code": "S_b4ce81f6-ddd0-485a-9167-3d93c0acba43"
            }
         * 
         */

         let style = StyleSheet.create({
            main:{
                height: 60,
                width:this.width - 40,
                padding:this.padding,
                flexDirection:"row",
                marginBottom:20,
            },
            name:{
                flex: 5,
                fontSize:18,
                textAlign:"left",
                textAlignVertical:"center"
            },
            qr:{
                flex:3,
                justifyContent:"center",
                alignItems:"flex-end"
            }
         });

         let onTouchQR = ()=>{

            Actions.admin_qr({value:mesa.space_qr_code});

         }

        return(
            <View style={style.main}>
                <Text style={style.name}>
                    {mesa.name}
                </Text>
                <TouchableOpacity style={style.qr}
                    onPress={()=>onTouchQR()}
                >
                    <QRCode
                        value={mesa.space_qr_code}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderEmpty(){
        return (
            <Text style={{textAlign:"center", textAlignVertical:"center"}}>
                {
                    this.state.loading ? "Cargando..." : "No hay mesas disponibles"
                }
            </Text>
        )
    }

    render(){
        let dataToRender = this.state.espacios;

        return(
            <View style={{flex:1, alignItems: "center"}}>

                <View style={this.style.add_space_bar}>

                    <Text style={this.style.label_text}>

                        Nuevo espacio

                    </Text>

                    <TextInput
                        style={this.style.add_field}
                        value={this.state.new_spacio_name}
                        placeholder="Descripción..."
                        placeholderTextColor="gray"
                        onChangeText={(new_spacio_name)=>this.setState({new_spacio_name})}
                    />

                    <TouchableOpacity 
                        style={this.style.button}
                        onPress={()=>this.onAddMesage()}
                    >

                        <Icon size={20} name="ios-add" color="white" />

                    </TouchableOpacity>


                </View>

                <View style={this.style.headers}>
                    
                    <Text style={{flex:5, ...this.style.header_center}}>

                        Nombre

                    </Text>

                    <Text style={{flex:3, ...this.style.header_center}}>

                        QR

                    </Text>


                </View>

                <FlatList 
                    data={dataToRender}
                    ListEmptyComponent={this.renderEmpty()}
                    renderItem={({item})=>{

                        return this.renderItem(item)

                    }}
                    keyExtractor={(item)=>item.id}
                    extraData={dataToRender}
                />  
            </View>                

        );

    }

}