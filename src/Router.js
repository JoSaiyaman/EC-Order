import React from 'react';
import {
    Scene,
    Stack,
    Router,
    Actions
} from 'react-native-router-flux';
import { 
    StyleSheet,
    StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Login from './components/Login';
import HomeScreen from './components/admin/HomeScreen';
import adminMenu from './components/admin/adminMenu';
import CookOrderTray from './components/cook/CookOrderTray';

import ScanQr from './components/ScanQr';
import WaiterSummary from './components/waiter/WaiterSummary';
import WaiterSummaryAccountDetail from './components/waiter/WaiterSummaryAccountDetail';
import adminDetalleArticulo from './components/admin/adminDetalleArticulo';
import adminComplementos from './components/admin/adminComplementos';
import adminNuevoArticulo from './components/admin/adminNuevoArticulo';
import AdminAccountReport from './components/admin/AdminAccountReport';
import AdminFeedbackReport from './components/admin/AdminFeedbackReport';
import dinersMenu from './components/diners/dinersMenu';
import dinersDetalleArticulo from './components/diners/dinersDetalleArticulo';
import dinersOrden from './components/diners/dinersOrden';
import dinersReview from './components/diners/dinersReview.js';
import dinersCuenta from './components/diners/dinersCuenta';
import DinersInitializeAccount from './components/diners/dinersInitializeAccount';
import adminAltaEspacio from './components/admin/adminAltaEspacio';
import adminExpandQR from './components/admin/adminExpandQR';
import adminAltaPuesto from './components/admin/adminAltaPuesto';


export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            back_color: 'blue'
        };
    }

    async componentWillMount() {
        this.getAsync();
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => (global.skip) ? this.setState({loading: false}) : console.log("Nadita papita") , 5000);             
    // }

    getAsync = async () => {
        try {
            let mode = await AsyncStorage.getItem("A_MODE")
            global.style = mode
            global.userId = await AsyncStorage.getItem("A_USUARIO")
            switch (global.style) {
                case 'dark':
                    this.setState({back_color: 'rgb(122,121,225)'});
                    break;
                case 'light': 
                    this.setState({back_color: 'rgb(255,166,1)'});
                    break;
                default: 
                    this.setState({back_color: '#ff8c00'}); //'rgb(255,166,1)'
                    break;
            }
        } catch(e) {
            console.log("####### FALLASSSSSSSS" + e)
        }
    }

    handle_mode_change() {
        if (global.skip) {
            switch (global.style) {
                case 'dark':
                    this.setState({back_color: 'rgb(122,121,225)'});
                    break;
                case 'light': 
                    this.setState({back_color: 'rgb(255,166,1)'});
                    break;
                default: 
                    this.setState({back_color: 'rgb(255,166,1)'});
                    break;
            }
            global.skip = false;
            Actions.admin()
        }
    }

    render() {
        return (
        <Router tintColor='white' navigationBarStyle={[style.navBar, {backgroundColor: this.state.back_color}]} titleStyle={{color: "white"}}>
            <Stack hideNavBar key="root">
                <Stack
                    key="auth"
                    type="reset"
                    style={style.navBarStyle}
                > 
                    <Scene
                        hideNavBar
                        title="Inicio de sesión"
                        key="login"
                        component={Login}
                        initial
                        // style={style.sceneStyle}
                        // on={() => global.skip === true}
                        // success={()=>this.handle_mode_change()}  
                        // failure="login"
                    />
                    {/* <Scene
                        title = "Elegir Idioma"
                        key="idioma_inicial"
                        component={IdiomaInicial}
                    /> */}

                </Stack>

                {/* <Stack
                    key="load"
                    type="reset"
                    style={style.navBarStyle}
                >
                    <Scene
                        // title="Inicio de sesión"
                        key="loading_screen"
                        component={LoadingScreen}
                        initial
                    />
                </Stack> */}


                
                <Stack
                    key="admin"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title=""
                        key="home_screen"
                        component={HomeScreen}
                        initial                        
                    />
                    <Scene
                        title="Configuración de Menú"
                        key="admin_menu"
                        component={adminMenu}          
                    />
                    <Scene
                        title="Configuración de Artículo"
                        key="admin_detalle_articulo"
                        component={adminDetalleArticulo}          
                    />
                    <Scene
                        title="Complementos"
                        key="admin_complementos"
                        component={adminComplementos}          
                    />
                    <Scene
                        title="Nuevo Artículo"
                        key="admin_nuevo_articulo"
                        component={adminNuevoArticulo}          
                    />
                    <Scene
                        title="Cuentas pasadas"
                        key="admin_account_report"
                        component={AdminAccountReport}          
                    />
                    <Scene
                        title="Reporte de retroalimentación"
                        key="admin_feedback_report"
                        component={AdminFeedbackReport}          
                    />

                    <Scene
                        title="Espacios"
                        key="admin_espacios"
                        component={adminAltaEspacio}
                    />

                    <Scene
                        title="QR"
                        key="admin_qr"
                        component={adminExpandQR} />

                    <Scene
                        title="Puestos"
                        key="admin_puestos"
                        component={adminAltaPuesto} />

                    {/* Configuración */}
                    {/* <Scene
                        title=""
                        key="settings"
                        component={Settings}
                    />
                    <Scene
                        title=""
                        key="idiomas"
                        component={Idioma}
                    />
                    <Scene
                        title=""
                        key="pantalla"
                        component={Pantalla}
                    /> */}

                </Stack>

                <Stack
                    key="pre_diners"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_initialize_account"
                        component={DinersInitializeAccount}
                        initial                        
                    />
                </Stack>

                <Stack
                    key="diners"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_menu"
                        component={dinersMenu}
                        initial                        
                    />
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_detalle_articulo"
                        component={dinersDetalleArticulo}              
                    />
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_orden"
                        component={dinersOrden}              
                    />
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_review"
                        component={dinersReview}
                    />
                    <Scene
                        hideNavBar
                        title=""
                        key="diners_cuenta"
                        component={dinersCuenta}
                    />
                </Stack>

                <Stack
                    key="cook"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title="Bandeja de ordenes"
                        key="cook_order_tray"
                        component={CookOrderTray}
                        initial                        
                    />
                </Stack>

                <Stack
                    key="scan"
                >

                    <Scene
                        hideNavBar
                        key="scanQr"
                        component={ScanQr} />

                </Stack>

                <Stack
                    key="waiter"
                    type="reset"
                    style={style.titleStyle}
                >
                    <Scene
                        hideNavBar
                        title="Cuentas abiertas"
                        key="waiter_open_account_summary"
                        component={WaiterSummary}
                        initial                        
                    />
                    <Scene
                        title="Ordenes por entregar"
                        key="waiter_summary_account_detail"
                        component={WaiterSummaryAccountDetail}                      
                    />
                </Stack>

            </Stack>

        </Router>
    )}
};

const style = StyleSheet.create({
    navBarStyle: {
        top: StatusBar.currentHeight,
        backgroundColor: "#1aa6a8",
        color: "white"
    },
    navBar: {
        backgroundColor: "#1aa6a8",
        color: "#FFF",
        fontWeight: "normal"
    },
    barButtonIconStyle: {
        tintColor: "#FFF"
    },
    titleStyle: {
        flexDirection: 'row',
        width: 200
    }
});  

