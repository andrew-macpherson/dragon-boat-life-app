import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';


//Import Actions
import {changeInput} from 'Dragon-Boat-Life/src/actions/common.js';
import {getUserTeams,deleteUserTeam} from 'Dragon-Boat-Life/src/actions/team.js';

class Teams extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getUserTeams(this.props.currentUser.id);
  }

  render() {

    return (
      <ScrollView>
        <View>
          <Text>Teams</Text>
          <List containerStyle={{marginBottom: 20}}>
            {this.props.teams.teams.map(function(obj, i){
              return (
                <ListItem
                  key={i}
                  title={obj.name}
                />
              )
            },this)}
          </List>

        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    teams: state.teams,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserTeams: (userId) => dispatch(getUserTeams(userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Teams);