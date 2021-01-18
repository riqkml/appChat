import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {colors, fonts} from '../../utils';

export default class User extends Component {
  render() {
    const {text, time, key, pressAlert, isDelete} = this.props;

    return (
      <TouchableOpacity
        key={key}
        onLongPress={pressAlert}
        style={styles.container}>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  time: {
    color: colors.ternary,
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.chat.textMe,
  },
  chatContent: {
    backgroundColor: colors.chat.boxMe,
    padding: 12,
    paddingRight: 18,
    maxWidth: '70%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
