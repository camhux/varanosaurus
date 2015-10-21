'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var ItemDetails = React.createClass({
  render: function() {
    console.log('this props is...', this.props);
    return (
      <View style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
          <Text style={styles.itemName}>{this.props.item.itemName}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF'
  },
  itemName: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
  },
  mainSection: {
    flex: 1,
  }
});

module.exports = ItemDetails;