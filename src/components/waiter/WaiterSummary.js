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
import { SwipeListView} from 'react-native-swipe-list-view';


export default class WaiterSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            basic: true,
            open_account_list: [],
        };
    }

    getOpenAccountList() {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        axios
            .get(`/alternative_session/${waiter_token}/waiter/open_accounts/`)
            .then(response => {
                this.setState({
                    loading: false,
                    open_account_list: response.data
                });
            })
            .catch(error => {
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    deactivateSummon(account_id) {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        axios
            .post(`/alternative_session/${waiter_token}/waiter/open_accounts/${account_id}/deactivate_summon/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getOpenAccountList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                console.log(error.response)
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    closeAccount(account_id) {
        this.setState({ loading: true });
        let waiter_token = "VW_efc60842-e550-497a-862d-48f4955722f0"
        axios
            .post(`/alternative_session/${waiter_token}/waiter/open_accounts/${account_id}/close/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getOpenAccountList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                this.getOpenAccountList()
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    componentDidMount() {
        this.get_open_account_list = setInterval(() => this.getOpenAccountList(), 5000);
        this.setState({ loading: false });
        this.getOpenAccountList() 
    }

    componentWillUnmount () {
        clearInterval(this.get_open_account_list);
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

        let open_account_amount = this.state.open_account_list.length

        return (
            <View style={{flex: 1, backgroundColor: "orange"}}>
                <View style={styles.orderTotalContainer}>
                    <Button title={"Salir"}
                        color="orange" 
                        onPress={() => Actions.auth()}
                    />  
                    <Text style={styles.orderTotal}>Cuentas abiertas: <Text style={styles.orderTotalAmount}>{open_account_amount.toString()}</Text></Text>           
                </View>
                <FlatList
                    contentContainerStyle={styles.openAccountContainer}
                    data={this.state.open_account_list}
                    keyExtractor= {(item, index) => "OPEN_ACCOUNT_" + index.toString()}
                    renderItem={(data, rowMap) => (
                        <TouchableHighlight
                            underlayColor = "#EEE"
                            style={[styles.openAccountCard]}
                            onPress={() => Actions.waiter_summary_account_detail({"account_id": data.item.id})}
                        >
                            <View >
                                <Text style={styles.openAccountCardSpaceName}>{data.item.space}</Text>
                                <Text style={styles.openAccountCardReadyText}>Ordenes listas para entregar: <Text style={styles.openAccountCardReadyAmount}>{data.item.ready_order_count.id__count}</Text></Text>
                                <TouchableHighlight
                                    underlayColor = "#bd2f13"
                                    style={[styles.openAccountCardWaiterSummonBadge, data.item.summon_waiter ? {} : {display: "none"}]}
                                    onPress={() => this.deactivateSummon(data.item.id)}
                                >
                                    <View >
                                        <Text style={styles.openAccountCardBadgeText}>HA SOLICITADO UN MESERO</Text>
                                        <Text style={styles.openAccountCardBadgeSecondaryText}>(Si va a antender, haga click aqui para desactivar la solicitud)</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor = "#3a57b5"
                                    style={[styles.openAccountCardCloseAccountBadge, data.item.awaiting_check ? {} : {display: "none"}]}
                                    onPress={() => Alert.alert(
                                        "Confirmación",
                                        '¿Seguro que desea cerrar la cuenta?',
                                        [
                                          {
                                            text: 'Cancelar',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                          },
                                          {text: 'Si', onPress: () => this.closeAccount(data.item.id)},
                                        ],
                                        {cancelable: true},
                                      )}
                                >
                                    <View >
                                        <Text style={styles.openAccountCardBadgeText}>HA PEDIDO LA CUENTA</Text>
                                        <Text style={styles.openAccountCardBadgeSecondaryText}>(Si ya se pago, haga click aqui para confirmarlo)</Text>
                                    </View>
                                </TouchableHighlight>
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