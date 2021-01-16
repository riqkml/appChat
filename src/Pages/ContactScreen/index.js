import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, ContactList, Header} from '../../Component';
import {colors, getData} from '../../utils';
import firestore from '@react-native-firebase/firestore';

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: [],
    };
  }
  async _getContact() {
    const {dataContact} = this.state;
    const uDetail = await getData('uDetail');
    const user = await firestore()
      .collection('Users')
      .where('uid', '!=', uDetail.uid)
      .get();
    const uData = user._docs;
    let tmp = [];
    if (dataContact.length != uData.length) {
      for (let index = 0; index < uData.length; index++) {
        tmp.push(uData[index]._data);
      }
      this.setState({
        dataContact: [...tmp],
      });
    }
  }
  componentDidMount() {
    this._getContact();
  }
  render() {
    const {dataContact} = this.state;
    const {otherData, navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header label="Contact" />
        <FlatList
          data={dataContact}
          renderItem={({item}) => (
            <ContactList
              data={item}
              onClick={() => {
                otherData(item);
                navigation.navigate('Chatting');
              }}
            />
          )}
          keyExtractor={(contact) => contact.uid}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.chatReducer.otherData,
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
const styles = StyleSheet.create({});
