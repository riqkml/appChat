import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils';
import ShowPassword from './ShowPassword';
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLook: true,
      border: 'black',
    };
  }

  render() {
    const {isLook, border} = this.state;
    const {
      icon,
      sizeIcon,
      label,
      isBorder,
      isPassword,
      secure,
      onChangeText,
    } = this.props;
    const onFocusForm = () => {
      this.setState({
        border: colors.primary,
      });
    };
    const onBlurForm = () => {
      this.setState({
        border: 'black',
      });
    };
    return (
      <View>
        <View style={styles.input(isBorder, border)}>
          <View style={styles.iconSection}>
            <Icon size={sizeIcon} name={icon} />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              placeholder={label}
              onBlur={onBlurForm}
              onChangeText={onChangeText}
              onFocus={onFocusForm}
              secureTextEntry={secure && isLook}
              style={styles.textInput(border)}
            />
          </View>
          {isPassword && (
            <ShowPassword
              // border={border}
              isLook={isLook}
              onClick={() => this.setState({isLook: !this.state.isLook})}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: (isBorder, border) => ({
    borderColor: border,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    borderWidth: isBorder ? 0.5 : 0,
    marginBottom: 10,
    borderRadius: isBorder ? 5 : 0,
  }),
  iconSection: {padding: 10},
  inputSection: {flex: 1},
  textInput: (border) => ({
    // color: border,
    marginLeft: 5,
  }),
});
