'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Icon = require('react-native-vector-icons/Ionicons');

// var Actions = require('../Actions/Actions');
var Routes = require('../../Services/Routes');

var {
  View,
  Navigator,
  TouchableOpacity,
  Text,
} = React;

var NavRedux = React.createClass({

  render() {
    return (
        <Navigator
          initialRoute={Routes.hometab}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          ref='navigator'
          navigationBar={<Navigator.NavigationBar
            style={Styles.navbar.container}
            routeMapper={this.routeMapper} />}
        />
      );
  },

  renderScene(route, navigator) {
    var Component = route.component;
    return <Component {...route.props} navigator={navigator} />;
  },

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  },

  routeMapper: {

    LeftButton(route, navigator, index) {
      if (index === 0) {
        return null;
      }

      return (<View>
                <TouchableOpacity
                  style={{marginTop: 8, marginLeft: 15, width:100}}
                  underlayColor={'transparent'}
                  onPress={() => {
                  if (index > 0) {
                    navigator.pop();
                  }
                }}>
                  <Icon name='ios-arrow-back' size={30} color="{Styles.secondaryColor}" />
                </TouchableOpacity>
              </View>
              );
    },

    RightButton() {
      return null;
    },

    Title() {
      return (<Text style={{marginTop: 10, fontSize: 26, fontFamily: Styles.kneadFont, color: Styles.accentColor}}>Knead</Text>);
    },

  },

});

module.exports = NavRedux;
