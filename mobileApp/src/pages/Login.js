import React from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//Import Components
//import LoginForm from 'app/src/components/LoginForm.js';

// Import Actions
import {navigate} from 'Dragon-Boat-Life/src/actions/common.js';
import {changeInput} from 'Dragon-Boat-Life/src/actions/common.js';
import {login} from 'Dragon-Boat-Life/src/actions/user.js';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }


    login(){
        //@ToDo: Validation
        console.log('this.props.login',this.props.login);
        this.props.loginUser(this.props.login);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Log In</Text>

                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'email')} />

                    <FormLabel>Password</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'password')} textInputRef='password'  secureTextEntry={true} />

                    <Button title='Log In' onPress={() => this.login()} />

                    <Button onPress={() => this.props.navigate('Register')} title="Registration" />

                </View>
            </ScrollView>
        );
    }
}


function mapStateToProps(state,ownProps){
  return {
    login: state.login
  }
}


const mapDispatchToProps = dispatch => {
  return {
    navigate: (route) => dispatch(navigate(route)),
    updateValue: (newVal,change) => dispatch(changeInput('CHANGE_LOGIN_INPUT',newVal,change)),
    loginUser:(data) => dispatch(login(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);
