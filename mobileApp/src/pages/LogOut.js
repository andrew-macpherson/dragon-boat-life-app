import React from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


//Import Actions
//import {logOut} from 'app/src/actions/user.js';

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
      //this.props.logOut();
    }

    render() {
        return false;
    }
}



function mapStateToProps(state,ownProps){
  return {

  }
}


const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);
