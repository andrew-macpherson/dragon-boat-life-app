import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

//Import Actions
import {getUserTeams,deleteUserTeam} from 'actions/team.js';

//Import Components
import CreateTeam from 'components/create-team.js';

class Teams extends React.Component{

	constructor(props){
		super(props);

		this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
	}

	componentDidMount(){
		console.log('this.props.currentUser.id',this.props.currentUser);
		this.props.getUserTeams(this.props.currentUser.id);
	}

	handleDeleteTeam(teamId){
		if(window.confirm('Are you sure you want to delete this team?')){
			this.props.deleteUserTeam(this.props.currentUser.id,teamId);
		}
	}

	render(){
		return (
			<div div className="container">

				<div className="row">
					<div className="col col-8">

						<div className="card">
								<div className="card-header">
									Teams
								</div>
							<div className="card-body">

								<table className="table table-bordered table-striped">
									<thead>
										<tr >
											<th>Team</th>
											<th style={{width:'100px'}}>Actions</th>
										</tr>
									</thead>
									<tbody>

										{this.props.teams.teams.map(function(obj, i){
										  return (
										  	<tr>
												<td>{obj.name}</td>
												<td>
													<div className="btn-group">
														<NavLink className="btn btn-sm btn-primary" to={"/dashboard/team/"+obj.id+"/view"}>View</NavLink>
														<NavLink className="btn btn-sm btn-primary" to={"/dashboard/team/"+obj.id+"/events"}>Events</NavLink>
														<button className="btn btn-sm btn-danger" type="button" onClick={(event) => this.handleDeleteTeam(obj.id)}>Delete</button>
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
						<CreateTeam />
					</div>
				</div>
			</div>
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
		getUserTeams: (userId) => dispatch(getUserTeams(userId)),
		deleteUserTeam: (userId,teamId) => dispatch(deleteUserTeam(userId,teamId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Teams);
