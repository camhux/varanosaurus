'use strict';

var React = require('react-native');

// var Home = require('./ios/Components/Home');
var LogIn = require('./ios/Components/LogIn');
var SignUp = require('./ios/Components/SignUp');

var {
  AsyncStorage,
  AppRegistry,
  Text,
  // StyleSheet,
  // Navigator,
  // NavigatorIOS, // KC
} = React;

var Knead = React.createClass({

  getInitialState() {
    return {
      token: null,
      view: 'loading',
    };
  },

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(function(token) {
        if (token) {
          this.setState({token, view: 'home'});
        } else {
          this.setState({view: 'login'});
        }
      }.bind(this));
  },

  render() {
    switch (this.state.view) {
      case 'loading':
        return this.renderLoading();
      case 'home':
        return this.renderHome();
      case 'login':
        return this.renderLogin();
      case 'signup':
        return this.renderSignup();
      default:
        return this.renderLogin();
    }
  },

  renderLogin() {
    return <LogIn
      goToSignup={ () => this.setState({view: 'signup'}) }
      handleLogin={this.handleLogin}
    />;
  },

  renderSignup() {
    return <SignUp
      goToLogin={ () => this.setState({view: 'login'})}
      handleSignup={this.handleSignup}
    />;
  },

  renderHome() {

  },

  renderLoading() {
    return <Text> Loading... </Text>;
  },

  handleLogin(data) {
    console.log(data);
  },

  handleSignup(data) {
    console.log(data);
  },

});

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

AppRegistry.registerComponent('Knead', () => Knead);
