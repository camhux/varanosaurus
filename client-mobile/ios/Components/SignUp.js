'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} = React;

var SignUp = React.createClass({

  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  render: function() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
          placeholder='username'
          keyboardType='default'
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          placeholder='password'
          secureTextEntry={true}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.submit}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableHighlight>

        <Text> Already registered? </Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.props.goToLogin}
        >

        <Text style={styles.btnText}>Log In</Text>

        </TouchableHighlight>

      </View>
    );
  },

  submit() {
    if (this.state.username === '' || this.state.password === '') {
      return;
    }

    this.props.handleSignup({username: this.state.username, password: this.state.password});
  },

});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    height: 15,
    flex: 1,
    margin: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
});

module.exports = SignUp;
