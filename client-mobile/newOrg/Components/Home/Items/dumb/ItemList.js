'use strict';

var React = require('react-native');

var {
  // StyleSheet,
  ListView,
  View,
  SegmentedControlIOS,
  TouchableHighlight,
} = React;

//TODO: add styles, add addItem functions

var ItemList = React.createClass({

  componentDidMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  },

  render() {

    var dataSource = this.dataSource.cloneWithRows(this.props.items);

    return (
      <View >
        <SegmentedControlIOS
          values={['Pending', 'Bought']}
          selectedIndex={0}
          tintColor={'#2fb4da'}
          onValueChange={(val) => {
            if (val === 'Pending') {
              this.props.goToPendingItemsList();
            } else if (val === 'Bought') {
              this.props.goToBoughtItemsList();
            }
          }} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            automaticallyAdjustcontentInsets={false}
            contentInset={{bottom: 50}}
          />
      </View>
    );
  },

  renderRow(item) {

    return (
      <View>
        <TouchableHighlight
          onPress={() => this.props.goToItemDetailsView(item)} >
          <View>
            <Text>{item.description}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

  },

});

module.exports = ItemList;
