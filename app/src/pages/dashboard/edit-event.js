import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import CreateEventForm from 'components/create-event.js';

//Import Actions 
import {getTeamEvent} from 'actions/event.js';
import {getUserTeam} from 'actions/team.js';

class EditEvent extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			eventId:0
		}
	}

	componentDidMount(){
		var teamId = this.props.match.params.id;

		this.props.getUserTeam(this.props.currentUser.id,teamId);

		if(this.props.match.params.eventId !== undefined){
			var eventId = this.props.match.params.eventId;
			this.setState({eventId:eventId});

			this.props.getTeamEvent(teamId,eventId);
		}
	}

	render(){
		return (
			<div div className="container">
				<h1>Edit Event</h1>

				<CreateEventForm team={this.props.team} eventId={this.state.eventId} />

			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser,
		event: state.event,
		team: state.team,
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getTeamEvent: (teamId,eventId) => dispatch(getTeamEvent(teamId,eventId)),
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(EditEvent);
