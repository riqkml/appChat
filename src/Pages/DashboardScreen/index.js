import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {iconLogo, People} from '../../Assets';
import {ChatList, CustomText, Header} from '../../Component';
import firestore from '@react-native-firebase/firestore';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listChat: [],
    };
  }

  _getHistoryChat() {
    const {dataUser} = this.props;
    firestore()
      .collection('Messages')
      .doc(dataUser.uid)
      .collection('History')
      .onSnapshot((querySnapshot) => {
        let newDataChat = [];
        const data = querySnapshot.docs;
        data.forEach((documentSnapshot) => {
          newDataChat.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        this.setState({
          listChat: newDataChat.sort((a, b) =>
            a.lastChatTime < b.lastChatTime ? 1 : -1,
          ),
        });
      });
  }
  componentDidMount() {
    this._getHistoryChat();
  }
  render() {
    const {dataUser, navigation, otherData} = this.props;
    const {listChat} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header label="Chatting" spacing={15} />
        <ScrollView>
          {listChat &&
            listChat.map((item, key) => {
              return (
                <ChatList
                  key={key}
                  lastChat={item.lastChat}
                  name={item.displayName}
                  isReply={item.isReply}
                  time={item.lastChatTimeShort}
                  onPress={() => {
                    navigation.navigate('Chatting', {
                      roomRef: item.roomRef,
                    });
                    otherData(item);
                  }}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataUser: state.authReducer.userLoginData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    otherData: (value) =>
      dispatch({
        type: 'START-CHAT',
        otherData: value,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
const styles = StyleSheet.create({});
