import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {colors, fonts} from '../../utils';

export default class Label extends Component {
  render() {
    const {title, content} = this.props;
    return (
      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        <View>
          <Text style={styles.title}>{`${title} : `}</Text>
        </View>
        <View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  content: {
    color: colors.ternary,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
});
