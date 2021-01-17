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
import {colors, fonts} from '../../utils';
const d = new Date();
const n = d.getHours().toString();
const m = d.getMinutes().toString();
const q = n + ':' + m;
export default class ChatList extends Component {
  render() {
    const {onPress, name, lastChat, key, isReply} = this.props;
    return (
      <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
        <TouchableOpacity
          key={key}
          onPress={onPress}
          style={{
            padding: 20,
            paddingLeft: 15,
            paddingVertical: 0,
            paddingRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={People}
              style={{width: 60, height: 60, borderRadius: 30, marginTop: 10}}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingVertical: 15,
              paddingBottom: 20,
              borderBottomColor: colors.ternary,
              borderBottomWidth: 0.5,
              flexDirection: 'row',
              flex: 1,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  paddingBottom: 5,
                }}>
                {name}
              </Text>
              <Gap height={2} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {isReply && (
                  <View style={{marginRight: 5}}>
                    <Icon name="check" size={15} color={colors.ternary} />
                  </View>
                )}
                <View>
                  <Text
                    style={{
                      color: colors.ternary,
                      fontFamily: fonts.regular,
                      fontSize: 12,
                    }}
                    numberOfLines={1}>
                    {lastChat}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text>{q}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({});
