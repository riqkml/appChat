import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {People} from '../../Assets';
import {ChatItem, Header, InputChat} from '../../Component';
import auth from '@react-native-firebase/auth';
import {
  colors,
  configAPI,
  fonts,
  getChatTime,
  getDateTime,
  notificationData,
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
    const userId = auth().currentUser.uid;
    const dataChat = {
      sendBy: userData.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chat: content,
      isDate: idDoc,
    };
    const receiverToken = otherData.tokens ? otherData.tokens[0] : '';

    const forUser = {
      ...otherData,
      lastChatTime: today.getTime(),
      lastChatTimeShort: getChatTime(today, true),
      lastChat: content,
    };
    const forOther = {
      lastChatTime: today.getTime(),
      lastChatTimeShort: getChatTime(today, true),
      lastChat: content,
      ...userData,
    };
    if (content) {
      firestore()
        .collection('Chatting')
        .doc(userId)
        .collection(otherData.uid)
        .add(dataChat);
      firestore()
        .collection('Chatting')
        .doc(otherData.uid)
        .collection(userId)
        .add(dataChat);
      firestore()
        .collection('Messages')
        .doc(`${otherData.uid}`)
        .collection('History')
        .doc(`${userData.uid}`)
        .set(forOther);
      firestore()
        .collection('Messages')
        .doc(`${userData.uid}`)
        .collection('History')
        .doc(`${otherData.uid}`)
        .set(forUser);
      //user
      Axios.post(
        'https://fcm.googleapis.com/fcm/send',
        notificationData(userData.displayName, content, receiverToken),
        configAPI,
      );
      this.setState({content: ''});
    } else {
      this.setState({content: ''});
    }
  }
  _getChatting() {
    const {otherData} = this.props;
    const userId = auth().currentUser.uid;
    firestore()
      .collection('Chatting')
      .doc(userId)
      .collection(otherData.uid)
      .onSnapshot((querySnapshot) => {
        let newDataChat = [];
        console.log('masih disini', querySnapshot, otherData.uid, userId);
        querySnapshot.docs.forEach((documentSnapshot) => {
          const data = {
            ...documentSnapshot.data(),
            idDocRef: documentSnapshot.ref._documentPath._parts[3],
          };
          console.log('datas', data);
          newDataChat = [...newDataChat, data];
        });
        this.setState({
          chatData: newDataChat.sort((a, b) =>
            a.chatDate > b.chatDate ? 1 : -1,
          ),
        });
      });
  }
  async _deleteChat(item, data) {
    const {userData, otherData} = this.props;
    const today = new Date();
    const finder = data.findIndex((finder) => finder.chatDate == item.chatDate);
    if (finder > -1) {
      data.splice(finder, 1);
    }
    const historyContent = data[data.length - 1];
    const userId = auth().currentUser.uid;
    const otherId = this.props.otherData.uid;
    const reqUrl = await firestore()
      .collection('Chatting')
      .doc(userId)
      .collection(otherId)
      .doc(item.idDocRef);
    const reqUrlHistory = async (urlMessages, urlHistory) => {
      return await firestore()
        .collection('Messages')
        .doc(urlMessages)
        .collection('History')
        .doc(urlHistory);
    };
    const deleteChat = reqUrl.delete();
    const chatHistory = {
      lastChat: historyContent.chat,
      lastChatTime: today.getTime(),
      lastChatTimeShort: getChatTime(today, true),
      displayName: otherData.displayName,
    };
    if (deleteChat) {
      (await reqUrlHistory(`${userData.uid}`, `${otherData.uid}`)).set(
        chatHistory,
      );
    }
  }
  componentDidMount() {
    this._getChatting();
  }
  render() {
    const {chatData} = this.state;
    const {navigation, otherData, userData} = this.props;
    const {displayName} = otherData;
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
            {/* <Text>{JSON.stringify(chatData)}</Text> */}
            <View style={styles.chatbox}>
              {chatData.map((item, key) => {
                return (
                  <ChatItem
                    pressAlert={() =>
                      Alert.alert(
                        'Delete Message ?',
                        'The selected messages will only be deleted from your device.',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => this._deleteChat(item, chatData),
                          },
                        ],
                        {cancelable: false},
                      )
                    }
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
