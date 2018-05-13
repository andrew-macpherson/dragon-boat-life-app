import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import CreateEventForm from 'components/create-event.js';

//Import actions
import {getUserTeam} from 'actions/team.js';
import {getTeamEvents,deleteTeamEvent} from 'actions/event.js';

class TeamEvents extends React.Component{

	constructor(props){
		super(props);

		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);

		this.state = {
			teamId: 0
		}
	}

	componentDidMount(){
		var teamId = this.props.match.params.id;
		this.setState({teamId:teamId});
		this.props.getUserTeam(this.props.currentUser.id,teamId);

		this.props.getTeamEvents(teamId);
	}

	handleDeleteEvent(eventId){
		if(window.confirm('Are you sure you want to delete this event?')){
			this.props.deleteTeamEvent(this.props.match.params.id,eventId);
		}
	}

	render(){
		return (
			<div div className="container">

				<div className="row">
					<div className="col col-8">

						<div className="card">
								<div className="card-header">
									<span>Events</span>
								</div>
							<div className="card-body">

								<table className="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Event Name</th>
											<th style={{width:'100px'}}>Actions</th>
										</tr>
									</thead>
									<tbody>
										{this.props.events.map(function(event,index){
											return (
												<tr>
													<td>{event.eventName}</td>
													<td>
														<div className="btn-group">
															<NavLink className="btn btn-sm btn-primary" to={"/dashboard/team/"+this.state.teamId+"/event/"+event.id+"/edit"}>Edit</NavLink>
															<NavLink className="btn btn-sm btn-primary" to={"/dashboard/team/"+this.state.teamId+"/event/"+event.id+"/roster"}>Roster</NavLink>
															<button className="btn btn-sm btn-danger" type="button" onClick={(evt) => this.handleDeleteEvent(event.id)}>Delete</button>
														</div>
													</td>
												</tr>
											)
										},this)}
										

									</tbody>
								</table>
							</div>
						</div>

					</div>
					<div className="col col-4">
						<CreateEventForm team={this.props.team} />
					</div>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser,
		team: state.team,
		events:state.events.events
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId)),
		getTeamEvents: (teamId) => dispatch(getTeamEvents(teamId)),
		deleteTeamEvent: (teamId,eventId) => dispatch(deleteTeamEvent(teamId,eventId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(TeamEvents);
