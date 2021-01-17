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
    const {userData, otherData, route} = this.props;
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
