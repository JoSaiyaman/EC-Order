import React, { Component } from 'react';
import Router from './src/Router';
import axios from 'axios'
// import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  render() {
    return (
      <Router />
    );
  }

  // componentDidMount(){
  //   SplashScreen.hide();
  // }
  
  componentWillMount() {
    axios.defaults.baseURL = 'https://dry-escarpment-18808.herokuapp.com';
    axios.defaults.timeout = 40000;
  }
}