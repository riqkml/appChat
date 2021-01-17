import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {People} from '../../Assets';
import {ChatItem, Header, InputChat} from '../../Component';
import {
  colors,
  fonts,
  getChatTime,
  getDateTime,
  getChatDocument,
} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import Axios from 'axios';
class ChattingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      chatData: [],
    };
  }
  _chatSend() {
    const {content} = this.state;
    const {userData, otherData, route, apiKey} = this.props;
    const today = new Date();

    const idDoc = getDateTime(today);
    const isReply = this.props.route.params.isReply;
    const chatId = `${userData.uid}_${otherData.uid}`;
    const chatIdReply = route.params.roomRef;
    const dataChat = {
      sendBy: userData.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chat: content,
      isDate: idDoc,
      isDeleteUser: false,
      isDeleteOther: false,
    };
    const receiverToken = otherData.tokens[0];
    const dataNotif = {
      to: receiverToken,
      collapse_key: 'type_a',
      notification: {
        title: userData.displayName,
        body: content,
      },
      data: {
        body: 'Body of Your Notification in Data',
        title: 'Title of Your Notification in Title',
        key_1: 'Value for key_1',
        key_2: 'Value for key_2',
      },
    };
    const configAPI = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAi2M3DSw:APA91bHrglbRNtvyLu9IFEXF0gZC_b5Szbf7FHDuiULULQI_JEmq24FT1bUnJNBw7zkxfnujJKuNHponsL2D58oXkKO9wovgsuPBJnATlrTbHBT04wsCo9AKDUrzldi5xVXmmffhMl_c',
      },
    };
    console.log('config', this.props);
    if (content) {
      firestore()
        .collection('Chatting')
        .doc(chatIdReply ? chatIdReply : chatId)
        .collection('allChat')
        .add(dataChat);

      //user
      const forUser = {
        ...otherData,
        lastChatTime: today.getTime(),
        lastChatTimeShort: getChatTime(today, true),
        isReply: isReply ? true : false,
        lastChat: content,
        roomRef: chatIdReply ? chatIdReply : chatId,
      };
      firestore()
        .collection('Messages')
        .doc(`${userData.uid}`)
        .collection('History')
        .doc(`${otherData.uid}`)
        // .update(forUser);
        .set(forUser);
      //user

      const forOther = {
        lastChat: content,
        lastChatTime: today.getTime(),
        lastChatTimeShort: getChatTime(today, true),
        isReply: isReply ? true : false,
        roomRef: chatIdReply ? chatIdReply : chatId,
        ...userData,
      };
      console.log('for user', forUser, forOther);
      firestore()
        .collection('Messages')
        .doc(`${otherData.uid}`)
        .collection('History')
        .doc(`${userData.uid}`)
        // .update(forUser);
        .set(forOther);
      Axios.post('https://fcm.googleapis.com/fcm/send', dataNotif, configAPI);
      this.setState({content: ''});
    } else {
      this.setState({content: ''});
    }
  }
  _getChatting() {
    const {userData, otherData, route} = this.props;
    const today = new Date();
    const isReply = this.props.route.params.isReply;
    const chatId = `${userData.uid}_${otherData.uid}`;
    const chatIdReply = route.params.roomRef;
    const idDoc = getDateTime(today);
    firestore()
      .collection('Chatting')
      .doc(chatIdReply ? chatIdReply : chatId)
      .collection('allChat')
      .onSnapshot((querySnapshot) => {
        let newDataChat = [];
        querySnapshot.docs.forEach((documentSnapshot) => {
          const data = documentSnapshot.data();
          newDataChat = [...newDataChat, data];
        });
        this.setState({
          chatData: newDataChat.sort((a, b) =>
            a.chatDate > b.chatDate ? 1 : -1,
          ),
        });
      });
  }
  componentDidMount() {
    this._getChatting();
  }
  render() {
    const {chatData} = this.state;
    const {navigation, otherData, userData} = this.props;
    const isReply = this.props.route.params.isReply;
    const {email, displayName, uid} = otherData;
    const {content} = this.state;
    console.log('date', chatData);
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header
          goBack={() => navigation.navigate('mainApp')}
          photo={People}
          name={displayName}
          isChatting
        />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.chatbox}>
              {chatData.map((item, key) => {
                return (
                  <ChatItem
                    text={item.chat}
                    time={item.chatTime}
                    key={item.chatDate}
                    isMe={item.sendBy === userData.uid}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <InputChat
          label={displayName}
          value={content}
          onChangeText={(e) => {
            this.setState({content: e});
          }}
          onPress={() => {
            this._chatSend();
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    otherData: state.chatReducer.otherData,
    userData: state.authReducer.userLoginData,
    apiKey: state.authReducer.fireStoreKey,
  };
};
const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingScreen);
const styles = StyleSheet.create({
  chatbox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    backgroundColor: colors.backgroundRoom,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.Icon,
  },
});
