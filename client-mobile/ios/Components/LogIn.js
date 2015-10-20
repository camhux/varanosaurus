'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} = React;

var LogIn = React.createClass({

  getInitialState() {

    return {
      username: '',
      password: '',
    };

  },

  render() {
    return (
      <View style={styles.container}>

        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
          placeholder='Username'
          keyboardType='default'
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          onSubmitEditing={this.submit}
          placeholder='Password'
          secureTextEntry={true}
        />

        <TouchableHighlight onPress={this.submit}>
          <Text style={styles.loginBtn}> Log in </Text>
        </TouchableHighlight>

        <Text style={styles.prompt} >
         Not signed in?
        </Text>

        <TouchableHighlight onPress={this.props.goToSignup}>
          <Text style={styles.signupBtn}> Sign Up! </Text>
        </TouchableHighlight>
      </View>
    );
  },

  submit() {
    if (this.state.username === '' || this.state.password === '') {
      return;
    }

    this.props.handleLogin({username: this.state.username, password: this.state.password});
  },

});

var styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#999',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },

  loginBtn: {

  },
});

module.exports = LogIn;
