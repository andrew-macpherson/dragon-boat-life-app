import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker
} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//Import Actions
import {changeInput} from 'Dragon-Boat-Life/src/actions/common.js';
import {updateProfile} from 'Dragon-Boat-Life/src/actions/user.js';

class Account extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.currentUser);
  }

  updateProfile(event){

        var data = {
          id: this.props.currentUser.id,
          email: this.props.currentUser.email,
          firstName: this.props.currentUser.firstName,
          lastName: this.props.currentUser.lastName,
          phoneNumber: this.props.currentUser.phoneNumber,
          gender: this.props.currentUser.gender,
          weight: this.props.currentUser.weight,
        }

        this.props.updateProfile(this.props.currentUser.id,data);
    }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Account</Text>

          <FormLabel>First Name</FormLabel>
          <FormInput value={this.props.currentUser.firstName} onChangeText={(value) => this.props.updateValue(value,'firstName')} />

          <FormLabel>Last Name</FormLabel>
          <FormInput value={this.props.currentUser.lastName} onChangeText={(value) => this.props.updateValue(value,'lastName')} />

          <FormLabel>Email</FormLabel>
          <FormInput value={this.props.currentUser.email} onChangeText={(value) => this.props.updateValue(value,'email')} />

          <FormLabel>Phone Number</FormLabel>
          <FormInput value={this.props.currentUser.phoneNumber} onChangeText={(value) => this.props.updateValue(value,'phoneNumber')} />

          <FormLabel>Weight</FormLabel>
          <FormInput value={this.props.currentUser.weight} onChangeText={(value) => this.props.updateValue(value,'weight')} />

          <FormLabel>Gender</FormLabel>

          <Picker
            selectedValue={this.props.currentUser.gender}
            onValueChange={(value, itemIndex) => this.props.updateValue(value, 'gender')}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>

          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={(value) => this.props.updateValue(value,'password')} textInputRef='password'  secureTextEntry={true} />

          <Button title='Update Profile' onPress={() => this.updateProfile()} />


        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateValue: (newVal,change) => dispatch(changeInput('CHANGE_USER_INPUT',newVal,change)),
    updateProfile:(id,data) => dispatch(updateProfile(id,data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);