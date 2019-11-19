import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid,
    FlatList,
    StyleSheet,
    Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import light from '../Common/lightMode';
import dark from '../Common/DarkMode';
import { SwipeListView} from 'react-native-swipe-list-view';


export default class CookOrderTray extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            basic: true,
            order_list: [
            ],
        };
    }

    getOrderList() {
        this.setState({ loading: true });
        let cook_token = global.alt_space_session_key
        axios
            .get(`/alternative_session/${cook_token}/cook/account_orders/`)
            .then(response => {
                this.setState({
                    loading: false,
                    order_list: response.data
                });
            })
            .catch(error => {
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    acceptOrder(order_id) {
        this.setState({ loading: true });
        let cook_token = global.alt_space_session_key
        axios
            .put(`/alternative_session/${cook_token}/cook/account_orders/${order_id}/accept/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getOrderList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    rejectOrder(order_id) {
        this.setState({ loading: true });
        let cook_token = global.alt_space_session_key
        axios
            .put(`/alternative_session/${cook_token}/cook/account_orders/${order_id}/reject/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getOrderList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    readyOrder(order_id) {
        this.setState({ loading: true });
        let cook_token = global.alt_space_session_key
        axios
            .put(`/alternative_session/${cook_token}/cook/account_orders/${order_id}/ready/`, {})
            .then(response => {
                this.setState({
                    loading: false
                });
                this.getOrderList()
            })
            .catch(error => {
                this.setState({ loading: false });
                let error_text = "Ha ocurrido un error"
                ToastAndroid.showWithGravityAndOffset(error_text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50)
            }); 
    }

    componentDidMount() {
        this.get_order_interval = setInterval(() => this.getOrderList(), 5000);
        this.setState({ loading: false });
        this.getOrderList() 
    }

    componentWillUnmount () {
        clearInterval(this.get_order_interval);
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

        let order_amount = this.state.order_list.length

        return (
            <View style={{flex: 1}}>
                <View style={styles.orderTotalContainer}>
                    <Button title={"Salir"}
                        color="orange" 
                        onPress={() => Actions.auth()}
                    />  
                    <Text style={styles.orderTotal}>Total de ordenes: <Text style={styles.orderTotalAmount}>{order_amount.toString()}</Text></Text>           
                </View>
                <SwipeListView
                    data={this.state.order_list}
                    renderItem={(data, rowMap) => (
                        <TouchableHighlight
                            onPress={() => this.acceptOrder(data.item.id)}
                            style={[styles.rowFront, data.item.status == 'ORDERED' ? styles.orderCardOrdered : styles.orderCardReady]}
                            underlayColor={'#AAA'}>
                            <View style={[styles.orderCard]}>
                                <Text style={styles.orderCardOrderId}>Orden #{data.item.id} - {data.item.space_name}</Text>
                                <Text style={styles.orderCardMenuArticle}><Text style={styles.orderCardQuantity}>{data.item.quantity}x</Text> {data.item.menu_article}</Text>
                                <FlatList
                                    data={data.item.complements}
                                    keyExtractor={(item, index) => "COMPLEMENT_" + index.toString()}
                                    renderItem={(data) => (
                                        <Text style={styles.orderCardComplement}> - {data.item}</Text>
                                    )}
                                />
                            </View> 
                        </TouchableHighlight>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            
                            <TouchableOpacity
                                style={[styles.backBtn, styles.backLeftBtn]}
                                onPress={() => this.rejectOrder(data.item.id)}>
                                <Text style={styles.backTextWhite}>Rechazar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.backBtn, styles.backRightBtn]}
                                onPress={() => this.readyOrder(data.item.id)}>
                                <Text style={styles.backTextWhite}>Listo</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                    leftOpenValue={75}
                    stopLeftSwipe={75}
                    rightOpenValue={-75}
                    stopRightSwipe={-75}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
        fontWeight: "bold"
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#BBB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        // borderBottomColor: '#CCC',
        // borderBottomWidth: 1,
    },
    backLeftBtn: {
        backgroundColor: '#ff5050',
        left: 0,

    },
    backRightBtn: {
        backgroundColor: '#99cc00',
        right: 0,
    },
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
    orderCard: {
        width: '70%',  
        marginHorizontal: 20 
    },
    orderCardOrdered: {
        backgroundColor: 'white'
    },
    orderCardReady: {
        backgroundColor: '#ccff99'
    },
    orderCardMenuArticle: {
        fontSize: 18
    }, 
    orderCardQuantity: {
        color: 'green'
    },
    orderCardOrderId: {
        color: '#00000099'
    }, 
    orderCardComplement: {
        color: '#00000099'
    }
});