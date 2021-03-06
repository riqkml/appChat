import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomText} from '..';
import {colors, fonts} from '../../utils';

export default class Header extends Component {
  render() {
    const {
      name,
      email,
      photo,
      isChatting,
      goBack,
      label,
      spacing,
      isOnline,
    } = this.props;
    return (
      <View style={styles.headerWrapper(spacing)}>
        {isChatting && (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={colors.white}
            onPress={goBack}
            style={{paddingRight: 10}}>
            <Icon color={colors.Icon} name="arrow-left" size={25} />
          </TouchableHighlight>
        )}
        {isChatting && (
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.avatarWrapper}>
              <Image
                source={photo}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
              <View style={styles.status(isOnline)} />
            </View>
          </View>
        )}
        <View style={styles.labelWrapper(isChatting)}>
          <CustomText style={styles.label}>
            {isChatting ? name : label}
          </CustomText>
          {isChatting && (
            <CustomText style={styles.subLabel}>
              {isOnline ? 'Online' : 'Offline'}
            </CustomText>
          )}
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={colors.white}
          style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon
            color={colors.Icon}
            name={isChatting ? 'ellipsis-v' : 'search'}
            size={25}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelWrapper: (isChatting) => ({
    flex: 3,
    alignItems: isChatting ? 'flex-start' : 'flex-start',
  }),
  headerWrapper: (spacing) => ({
    backgroundColor: colors.white,
    paddingVertical: spacing ? spacing : 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.ternary,
  }),
  avatarWrapper: {
    backgroundColor: colors.user.border,
    width: 57,
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    borderRadius: 30,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.chat.text,
    letterSpacing: 0.5,
  },
  subLabel: {
    fontFamily: fonts.extralight,
    fontSize: 12,
    color: colors.chat.text,
    letterSpacing: 0.5,
  },
  status: (isOnline) => ({
    width: 10,
    height: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: isOnline ? colors.user.online : colors.user.offline,
  }),
});
