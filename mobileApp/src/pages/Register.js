import React from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

// Import Actions
import {changeInput} from 'Dragon-Boat-Life/src/actions/common.js';

//Import Components
import {register} from 'Dragon-Boat-Life/src/actions/user.js';


class Register extends React.Component {
    constructor(props){
        super(props);
    }

    register(){
        //@ToDo: Validation
        this.props.register(this.props.registration);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Register</Text>

                    <FormLabel>First Name</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'firstName')} />

                    <FormLabel>Last Name</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'lastName')} />

                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'email')} />

                    <FormLabel>Password</FormLabel>
                    <FormInput onChangeText={(value) => this.props.updateValue(value,'password')} textInputRef='password'  secureTextEntry={true} />

                    <Button title='Register' onPress={() => this.register()} />

                </View>
            </ScrollView>
        );
    }
}



function mapStateToProps(state,ownProps){
  return {
    registration: state.registration
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateValue: (newVal,change) => dispatch(changeInput('CHANGE_REGISTRAION_INPUT',newVal,change)),
    register: (data) => dispatch(register(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);
