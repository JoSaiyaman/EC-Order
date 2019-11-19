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

export default adminExpandQR = (props)=>{

    /**
     * @param String value Valor del QR
     * 
     */
    const {height, width} = Dimensions.get("window");
    let style = StyleSheet.create({

        main:{

            flex: 1,
            justifyContent:"center",
            alignItems:"center"

        }

    });

    return(

        <View style={style.main}>

            <QRCode
                value={props.value}
                size={width*0.8} />

        </View>

    );

}