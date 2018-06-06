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
import {changeInput,navigate} from 'Dragon-Boat-Life/src/actions/common.js';
import {getTeam, getTeamMembers} from 'Dragon-Boat-Life/src/actions/team.js';

class Team extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const teamId = this.props.navigation.getParam('teamId', 'NO-ID');
    console.log('team id is',teamId);
    // Get team info
    this.props.getTeam(teamId);
    // Get team members
    this.props.getTeamMembers(teamId);
  }

  render() {

    return (
      <ScrollView>
        <View>
          <Text>Team</Text>   

          <List containerStyle={{marginBottom: 20}}>
            {this.props.teamMembers.teamMembers.map(function(obj, i){
              return (
                <ListItem
                  key={i}
                  title={obj.user.firstName+' '+obj.user.lastName}
                  onPress={() => this.props.navigate('TeamMember',{userId:obj.user.id})}
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
    team: state.team,
    teamMembers:state.teamMembers,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigate: (route) => dispatch(navigate(route)),
    getTeam:(teamId) => dispatch(getTeam(teamId)),
    getTeamMembers: (teamId) => dispatch(getTeamMembers(teamId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Team);