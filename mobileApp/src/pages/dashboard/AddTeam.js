import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


//Import Actions
import {changeInput,navigate} from 'Dragon-Boat-Life/src/actions/common.js';
import {post} from 'Dragon-Boat-Life/src/actions/team.js';

class Teams extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  updateProfile(event){

        var data = {
          userId:this.props.currentUser.id,
          name:this.props.team.name
        }

        this.props.post(data);
    }

  render() {

    return (
      <ScrollView>
        <View>
          <Text>Add Team</Text>
          
          <FormLabel>Team Name</FormLabel>
          <FormInput value={this.props.team.firstName} onChangeText={(value) => this.props.updateValue(value,'name')} />

          <Button title='Add Team' onPress={() => this.updateProfile()} />

        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    team: state.team,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: (data) => dispatch(post(data)),
    navigate: (route) => dispatch(navigate(route)),
    updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_INPUT',newVal,change)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Teams);