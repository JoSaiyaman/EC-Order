import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid,
    FlatList,
    StyleSheet,
    Button,
    Alert,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';
import { SwipeListView} from 'react-native-swipe-list-view';


export default class DinersInitializeAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    initializeAccount() {
        this.setState({ loading: true });
        let space_token = global.alt_space_session_key
        axios
            .post(`/alternative_session/${space_token}/space/account/`)
            .then(response => {
                this.setState({
                    loading: false
                });
                Actions.diners()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    render() {
        let estilos;
        switch (global.style) {
            case 'light':
                estilos = light;
                break;
            case 'dark':
                estilos = dark;
                break;
            default:
                estilos = light;
                break;
        }

        return (
            <View style={{flex: 1, backgroundColor: "orange", alignItems: "center", justifyContent: "center"}}>
                <Image
                    style={{width: 250, height: 210}}
                    source={require('../../../assets/images/e_order_logo.png')}
                />
                <Text style={{fontSize: 50, color: "white", fontWeight: "bold"}}>Bienvenido</Text>
                <TouchableOpacity
                    onPress={()=>this.initializeAccount()}
                    style={{backgroundColor: "#3d405b", padding: 15, margin:20, borderRadius: 35}}
                >
                    <Text style={{fontSize: 30, color: "white", fontWeight: "bold"}}>COMENZAR</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderTotal: {
        fontSize: 20,
        marginLeft: 30
    },
    orderTotalAmount: {
        color: "green"
    },
    orderTotalContainer: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: "white",
        elevation: 4,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    openAccountContainer: {
        alignItems: "center",   
    },
    openAccountCard: {
        width: 320,  
        backgroundColor: "white",
        padding: 15,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 10
        
    },
    openAccountCardSpaceName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222"

    }, 
    openAccountCardReadyAmount: {
        color: 'green', 
        fontWeight: "bold"
    },
    openAccountCardReadyText: {
        fontSize: 18,
        color: '#00000099'
    },
    openAccountCardWaiterSummonBadge: {
        backgroundColor: "#db3716",
        marginTop: 10,
        padding: 6,
        width: "100%",
        borderRadius: 4,
        alignItems: "center"
    },
    openAccountCardCloseAccountBadge: {
        backgroundColor: "#4364d1",
        marginTop: 10,
        padding: 6,
        width: "100%",
        borderRadius: 4,
        alignItems: "center"
    },
    openAccountCardBadgeText: {
        color: 'white',
        fontWeight: "bold",
        textAlign: "center"
    },
    openAccountCardBadgeSecondaryText: {
        color: 'white',
        textAlign: "center"
    }
});