import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    StyleSheet,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';


export default class WaiterSummaryAccountDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current_account: this.props.account_id,
            loading: true,
            basic: true,
            ready_order_list: [],
        };
    }

    markAsDelivered(order_id) {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        let account_id = this.state.current_account
        axios
            .post(`/alternative_session/${waiter_token}/waiter/open_accounts/${account_id}/orders/${order_id}/delivered/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getReadyOrderList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                console.log(error.response)
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    getReadyOrderList() {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        let account_id = this.state.current_account
        axios
            .get(`/alternative_session/${waiter_token}/waiter/open_accounts/${account_id}/orders/`)
            .then(response => {
                this.setState({
                    loading: false,
                    ready_order_list: response.data
                });
            })
            .catch(error => {
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }
    
    cancelAccount() {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        let account_id = this.state.current_account
        axios
            .post(`/alternative_session/${waiter_token}/waiter/open_accounts/${account_id}/cancel/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                Actions.waiter()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                Actions.waiter()
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    componentDidMount() {
        this.setState({ loading: false });
        this.getReadyOrderList() 
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
            <View style={{flex: 1, backgroundColor: "white"}}>
                <FlatList
                    contentContainerStyle={styles.openAccountContainer}
                    data={this.state.ready_order_list}
                    keyExtractor= {(item, index) => "OPEN_ACCOUNT_" + index.toString()}
                    renderItem={(data, rowMap) => (
                        <View style={styles.readyOrderCard}>
                            <Text style={styles.readyOrderCardTitle}>{data.item.menu_article}</Text>
                            <Text style={styles.readyOrderCardContent}>Cantidad por entregar: <Text style={styles.readyOrderCardQuantity}>{data.item.quantity}</Text></Text>
                            <FlatList
                                data={data.item.complements}
                                keyExtractor={(item, index) => "COMPLEMENT_" + index.toString()}
                                renderItem={(data) => (
                                    <Text style={styles.orderCardComplement}> - {data.item}</Text>
                                )}
                            />
                            <TouchableOpacity
                                style={[styles.waiterReadyOrderDeliverBadge]}
                                onPress={() => this.markAsDelivered(data.item.id)}
                            >
                                <Text style={styles.openAccountCardBadgeText}>MARCAR ENTREGA</Text>
                            </TouchableOpacity>
                        </View> 
                    )}
                />
                <TouchableOpacity
                    onPress={() => Alert.alert(
                        "Confirmación",
                        '¿Seguro que desea cancelar la cuenta?',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'Si', onPress: () => this.cancelAccount()},
                        ],
                        {cancelable: true},
                      )}
                >
                    <Text style={[styles.waiterCancelAccount]}>Cancelar cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    openAccountContainer: {
        alignItems: "center",   
    },
    readyOrderCard: {
        width: 320,  
        backgroundColor: "white",
        padding: 5,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 10
    },
    readyOrderCardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222"

    }, 
    readyOrderCardQuantity: {
        color: 'green', 
        fontWeight: "bold"
    },
    readyOrderCardContent: {
        fontSize: 18,
        color: '#00000099'
    },
    openAccountCardBadgeText: {
        backgroundColor: "green",
        color: "white",
        borderRadius: 3,
        elevation: 4,
        width: 150,
        padding: 5,
        textAlign: "center",
        marginTop: 5
    },
    waiterCancelAccount: {
        width: "100%",
        color: "red",
        backgroundColor: "white",
        padding: 5,
        textAlign: "center",
        elevation: 20
    }
});