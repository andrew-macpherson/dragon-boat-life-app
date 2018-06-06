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
import {getTeam} from 'Dragon-Boat-Life/src/actions/team.js';
import {getTeamEvents} from 'Dragon-Boat-Life/src/actions/events.js';

class TeamEvents extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const teamId = this.props.navigation.getParam('teamId', 'NO-ID');
    console.log('team id is',teamId);
    // Get team info
    this.props.getTeam(teamId);
    // Get team members
    this.props.getTeamEvents(teamId);
  }

  render() {

    return (
      <ScrollView>
        <View>
          <Text>Team Evemts</Text>   

           <List containerStyle={{marginBottom: 20}}>
            {this.props.events.events.map(function(obj, i){
              return (
                <ListItem
                  key={i}
                  title={obj.eventName}
                  onPress={() => this.props.navigate('Event',{eventId:obj.id})}
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
    events:state.events,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigate: (route) => dispatch(navigate(route)),
    getTeam:(teamId) => dispatch(getTeam(teamId)),
    getTeamEvents: (teamId) => dispatch(getTeamEvents(teamId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamEvents);