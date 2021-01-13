import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {CustomText, Header} from '../../Component';

class DashboardScreen extends Component {
  render() {
    const {dataUser} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header name={dataUser.user} email={dataUser.email} />
        <CustomText>{JSON.stringify(dataUser)}</CustomText>
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
