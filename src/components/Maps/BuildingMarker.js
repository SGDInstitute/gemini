import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default class BuildingMarker extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.amount]}>{title}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#009999',
    padding: 2,
    borderRadius: 3,
    borderColor: '#009999',
    borderWidth: 0.5,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#009999',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#009999',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});