import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {iconLogo, People} from '../../Assets';
import {ChatList, CustomText, Header} from '../../Component';

class DashboardScreen extends Component {
  render() {
    const {dataUser, navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header label="Chatting" />
        <ChatList onPress={() => navigation.navigate('Chatting')} />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
const styles = StyleSheet.create({});
