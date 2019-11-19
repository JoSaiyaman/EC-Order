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
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';


export default class AdminAccountReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            basic: true,
            closed_account_list: [],
        };
    }

    getClosedAccountList() {
        this.setState({ loading: true });
        axios
            .get(`/restaurant/accounts/list/`)
            .then(response => {
                this.setState({
                    loading: false,
                    closed_account_list: response.data
                });
            })
            .catch(error => {
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    componentDidMount() {
        this.setState({ loading: false });
        this.getClosedAccountList() 
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

        let closed_account_amount = this.state.closed_account_list.length

        return (
            <View style={{flex: 1, backgroundColor: "orange"}}>
                <View style={styles.orderTotalContainer}>
                    <Text style={styles.orderTotal}>Total de cuentas cerradas: <Text style={styles.orderTotalAmount}>{closed_account_amount.toString()}</Text></Text>           
                </View>
                <FlatList
                    contentContainerStyle={styles.openAccountContainer}
                    data={this.state.closed_account_list}
                    keyExtractor= {(item, index) => "CLOSED_ACCOUNT_" + index.toString()}
                    renderItem={(data, rowMap) => (
                        <TouchableHighlight
                            underlayColor = "#EEE"
                            style={[styles.openAccountCard]}
                            onPress={() => console.log("Hioo")}
                        >
                            <View >
                    <Text style={styles.openAccountCardReadyText}>Identificador: KCU{data.item.id}</Text>
                                <Text style={styles.openAccountCardSpaceName}>{data.item.closed_or_cancelled_at}</Text>
                                <Text style={styles.openAccountCardReadyText}>Espacio: <Text style={styles.openAccountCardReadyAmount}>{data.item.space}</Text></Text>
                                <Text style={styles.openAccountCardReadyText}>Monto total: <Text style={styles.openAccountCardReadyAmount}>{data.item.total_price.considered_price__sum}</Text></Text>
                            </View> 
                        </TouchableHighlight>
                    )}
                />
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
        fontSize: 20,
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