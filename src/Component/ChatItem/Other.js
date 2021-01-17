import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {colors, fonts} from '../../utils';

export default class Other extends Component {
  render() {
    const {text, time, key} = this.props;
    return (
      <View key={key} style={styles.container}>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  time: {
    color: colors.ternary,
    fontSize: 12,
    fontFamily: fonts.extralight,
    marginTop: 5,
    marginLeft: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.chat.text,
  },
  chatContent: {
    backgroundColor: colors.white,
    padding: 12,
    paddingRight: 18,
    maxWidth: '70%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
