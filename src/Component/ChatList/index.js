import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Gap} from '..';
import {People} from '../../Assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, fonts, Height, Width} from '../../utils';
export default class ChatList extends Component {
  render() {
    const {onPress, name, lastChat, keys, isReply, time, isOnline} = this.props;
    return (
      <TouchableHighlight
        key={keys}
        activeOpacity={0.6}
        underlayColor="#DDDDDD">
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View>
            <Image source={People} style={styles.imagePhoto} />
          </View>
          <View style={styles.wrapper}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>{name}</Text>
              <Gap height={2} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {isReply && (
                  <View style={{marginRight: 5}}>
                    <Icon name="check" size={15} color={colors.ternary} />
                  </View>
                )}
                <View>
                  <Text style={styles.subLabel} numberOfLines={1}>
                    {lastChat}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text>{time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  imagePhoto: {width: 60, height: 60, borderRadius: 30, marginTop: 10},
  container: {
    padding: 20,
    paddingLeft: 15,
    paddingVertical: 0,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 20,
    borderBottomColor: colors.ternary,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
    paddingBottom: 5,
  },
  subLabel: {
    color: colors.ternary,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
