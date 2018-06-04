import React from 'react';
import { AsyncStorage } from 'react-native';
import {connect} from 'react-redux';

import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';

// Import Actions
import {logOut,setUser} from 'Dragon-Boat-Life/src/actions/user.js';
import {navigate} from 'Dragon-Boat-Life/src/actions/common.js';

//Import Utilities
import api from 'Dragon-Boat-Life/src/utils/api.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);

    
  }

  componentDidMount(){
    //check if logged in i.e. the access token is set.
    AsyncStorage.getItem("access_token").then((value) => {
        if(value){
          // Check if the current user state is empty.
          if(this.props.currentUser.id === ''){
            //Get current user data
            api.currentUser((success,error,user) => {
              // Set the current user state
              this.props.setUser(user);
            });
          }
        }else{
          console.log('access token not set');
          //User is not logged in, lets send them to login page.
          this.props.navigate('Login')
        }
    });

  }

  render() {
    return (
      <ScrollView>
        <Text>Dashboard Home</Text>

        <Button onPress={() => this.props.navigate('Account')} title="Account" />
        <Button onPress={() => this.props.navigate('Teams')} title="Teams" />

        <Button onPress={() => this.props.logOut()} title="Log Out" />
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
    navigate: (route) => dispatch(navigate(route)),
    logOut:(data) => dispatch(logOut(data)),
    setUser: (data) => dispatch(setUser(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);