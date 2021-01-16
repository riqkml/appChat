import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {People} from '../../Assets';
import {fonts} from '../../utils';

export default class ContactList extends Component {
  render() {
    const {data, onClick} = this.props;
    return (
      <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
        <TouchableOpacity onPress={onClick}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <View>
              <Image
                source={People}
                style={{width: 60, height: 60, borderRadius: 40}}
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <Text style={{fontFamily: fonts.semibold, fontSize: 16}}>
                {data.displayName}
              </Text>
              <Text>{data.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({});
