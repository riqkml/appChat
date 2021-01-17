import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ShowPassword extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {isLook, onClick, border} = this.props;
    return (
      <TouchableOpacity onPress={onClick} style={styles.eyeIcon}>
        {isLook ? (
          <Icon name="eye-slash" color={border} size={20} />
        ) : (
          <Icon name="eye" color={border} size={20} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  eyeIcon: {
    justifyContent: 'center',
    padding: 5,
  },
});
