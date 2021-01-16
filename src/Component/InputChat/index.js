import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils';

export default class InputChat extends Component {
  render() {
    const {onPress, value, onChangeText} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputchat}
          value={value}
          onChangeText={onChangeText}
          placeholder="Tulis pesan untuk Mary"
        />
        <TouchableHighlight>
          <TouchableOpacity onPress={onPress}>
            <Icon name="paper-plane" size={25} color={colors.Icon} />
          </TouchableOpacity>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  inputchat: {
    marginRight: 10,
    backgroundColor: colors.white,
    padding: 14,
    flex: 1,
    maxHeight: 45,
    borderRadius: 10,
  },
});
