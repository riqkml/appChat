import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Other from './Other';
import User from './User';

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      isMe,
      text,
      time,
      key,
      id,
      pressAlert,
      isDeleteOther,
      isDeleteUser,
    } = this.props;

    if (isMe) {
      return (
        <User
          isDelete={isDeleteUser}
          pressAlert={pressAlert}
          id={id}
          text={text}
          time={time}
          key={key}
        />
      );
    } else {
      return (
        <Other
          isDelete={isDeleteOther}
          pressAlert={pressAlert}
          id={id}
          text={text}
          time={time}
          key={key}
        />
      );
    }
  }
}

const styles = StyleSheet.create({});
