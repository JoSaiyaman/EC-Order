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
  Picker,
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

export default class adminAltaPuesto extends Component{

    constructor(props){

        super(props);
        const {height, width} = Dimensions.get("window");
        this.heigth = height;
        this.width = width;

        this.state ={

            espacios:[],
            tipo_puesto:"WAITER",
            tipo_puesto_usuario:"Mesero",
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
                flex:3,
                textAlign:"center",
                textAlignVertical:"center"

            },

            add_field:{

                flex:3,
                height:this.heigth*0.06,
                padding:3,
                margin:3,
                backgroundColor:"white",
                borderRadius: 4,
                elevation:7

            },

            button:{

                flex:2,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"rgb(255,74,55)",
                width: 30

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

        let url = "restaurant/position/list/";
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

    onAddPuesto(){

        if(this.state.new_spacio_name == ""){

            Alert.alert("Debe introducir un nombre para la mesa");
            return

        }
        this.setState({

            new_spacio_name:""

        });
        let url = "/restaurant/position/";
        let params = {

            description:this.state.new_spacio_name,
            role: this.state.tipo_puesto

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
     * Utility********************************
     * ******************************************
     */

    getPuestoAccordingToRole(role){
        /**
         * @param String role Tal como viene en la db
         * 
         */
        const WAITER = "WAITER";
        const COOK = "COOK";
         switch(role){

            case WAITER:
                return "Mesero"
                break;
            case COOK:
                return "Cocinero"
                break;

         }

    }

    /**
     * *****************************************
     * Rendererss********************************
     * ******************************************
     */

    renderItem(puesto){

        /**
         * 
         * "id": 1,
            "role": "WAITER",
            "description": "Mesero vespertino",
            "is_active": true,
            "spaces": [],
            "position_qr_code": "W_efc60842-e550-497a-862d-48f4955722f0"
         * 
         */

         let style = StyleSheet.create({

            main:{

                height:60,
                width:this.width -40,
                // padding:this.padding,
                flexDirection:"row",
                marginBottom:20

            },

            name:{

                flex: 3,
                fontSize:18,
                textAlign:"center",
                textAlignVertical:"center"

            },

            qr:{

                flex:4,                
                justifyContent:"center",
                alignItems:"flex-end"

            },



         });

         let onTouchQR = ()=>{

            Actions.admin_qr({value:puesto.position_qr_code});

         }

        return(

            <View style={style.main}>

                <Text style={style.name}>

                    {puesto.description}

                </Text>

                <Text style={style.name}>

                    {this.getPuestoAccordingToRole(puesto.role)}

                </Text>

                <TouchableOpacity style={style.qr}
                    onPress={()=>onTouchQR()}

                >

                    <QRCode
                        value={puesto.position_qr_code}
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

                    this.state.loading ? "Cargando..." : "No hay puestos disponibles"


                }

            </Text>

        )


    }

    render(){

        let dataToRender = this.state.espacios;

        return(

            <View style={{flex:1, alignItems: "center"}}>

                <View style={this.style.headers}>
                    
                    <Text style={{flex:3, ...this.style.header_center}}>

                        Nombre

                    </Text>

                    <Text style={{flex:3, ...this.style.header_center}}>

                        Puesto

                    </Text>

                    <Text style={{flex:3, ...this.style.header_center}}>

                        QR

                    </Text>


                </View>

                <View style={[this.style.add_space_bar]}>

                    <TextInput
                        style={this.style.add_field}
                        value={this.state.new_spacio_name}
                        placeholder="Nombre..."
                        placeholderTextColor="gray"
                        onChangeText={(new_spacio_name)=>this.setState({new_spacio_name})}
                    />

                    <Picker
                        style={this.style.add_field}
                        selectedValue={this.state.tipo_puesto}
                        onValueChange={(value, index)=>{
                                                        
                            this.setState({
                                
                                tipo_puesto:value

                            });
                            
                            

                        }}
                    >

                        <Picker.Item label="Mesero" value="WAITER" />
                        <Picker.Item label="Cocinero" value="COOK" />                        
                        

                    </Picker>

                    <View style={{flex:1}}>



                    </View>

                    <TouchableOpacity 
                        style={this.style.button}
                        onPress={()=>this.onAddPuesto()}
                    >

                        <Icon size={20} name="ios-add" color="white" />

                    </TouchableOpacity>


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