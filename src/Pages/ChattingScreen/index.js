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
    const {userData, otherData} = this.props;
    const today = new Date();
    const dataChat = {
      sendBy: userData.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chat: content,
      isDeleteUser: false,
      isDeleteOther: false,
    };
    const idDoc = getDateTime(today);
    firestore()
      .collection('Chatting')
      .doc(`${userData.uid}_${otherData.uid}`)
      .collection('allChat')
      .doc(idDoc)
      .collection('Today')
      .add(dataChat);
    this.setState({content: ''});
  }
  _getChatting() {
    const {userData, otherData} = this.props;
    const today = new Date();
    const idDoc = getDateTime(today);
    firestore()
      .collectionGroup(`Today`)
      .onSnapshot((querySnapshot) => {
        const currId = `${userData.uid}_${otherData.uid}`;
        let newDataChat = [];
        const newDataDate = [];
        let tempDate = '';
        querySnapshot.docs.forEach((documentSnapshot) => {
          const ref = documentSnapshot.ref._documentPath._parts[5];
          const refDate = documentSnapshot.ref._documentPath._parts[3];
          const refId = documentSnapshot.ref._documentPath._parts[1];
          const idDoc = getDateTime(today);
          const data = documentSnapshot.data();
          tempDate = refDate;
          if (refId == currId) {
            if (newDataChat.length > 0) {
              console.log('error', newDataChat.length, newDataChat);
              const findId = newDataChat.findIndex(
                (finder) => finder.id == refDate,
              );
              if (findId !== -1) {
                newDataChat[findId].data[
                  newDataChat[findId].data.length
                ] = data;
                newDataChat[findId].data.sort((a, b) =>
                  a.chatDate > b.chatDate ? 1 : -1,
                );
              }
            } else {
              const initData = {
                id: refDate,
                data: [data],
              };
              newDataChat = [initData];
            }
          }
        });
        if (newDataChat.length != 0) {
          this.setState({chatData: newDataChat});
        } else {
          this.setState({chatData: []});
        }
      });
  }
  componentDidMount() {
    this._getChatting();
  }
  render() {
    const {chatData} = this.state;
    const {navigation, otherData, userData} = this.props;
    const {email, displayName, uid} = otherData;
    const {text} = this.state;
    console.log('chat', this.state.chatData);
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header
          goBack={() => navigation.goBack()}
          photo={People}
          name={displayName}
          isChatting
        />
        <View style={styles.content}>
          <ScrollView>
            {chatData.map((val, key) => {
              return (
                <View style={styles.chatbox}>
                  <Text style={styles.date}>{val.id}</Text>
                  {val.data.sort().map((item, key) => {
                    return (
                      <ChatItem
                        text={item.chat}
                        time={item.chatTime}
                        key={key}
                        isMe={item.sendBy === userData.uid}
                      />
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <InputChat
          value={text}
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
