import React from 'react';
import {connect} from 'react-redux';
import {NavLink,Link} from 'react-router-dom';

//Import Actions
import {getTeamMembers,getTeam,deleteTeamMember,resetTeamMember} from 'actions/team-member.js';

import {getUserTeam} from 'actions/team.js';

//Import Components
import EditTeam from 'components/edit-team.js';
import AddEditTeamMemberForm from 'components/add-team-member.js';

class Team extends React.Component{

	constructor(props){
		super(props);

		this.handleDeleteTeamMember = this.handleDeleteTeamMember.bind(this);
	}

	componentDidMount(){
		var teamId = this.props.match.params.id;


		this.props.getTeamMembers(teamId);
		this.props.getUserTeam(this.props.currentUser.id,teamId);

		//Reset team member
		this.props.resetTeamMember();
	}

	handleDeleteTeamMember(teamMemberId){
		if(window.confirm('Are you sure you want to delete this team member?')){
			this.props.deleteTeamMember(this.props.match.params.id,teamMemberId);
		}
	}

	render(){
		return (
			<div div className="container">

				<div className="row">
					<div className="col col-8">

						<div className="card">
							<div className="card-header">
								{this.props.team.name}

							</div>
							<div className="card-body">

								<table className="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Paddler Name</th>
											<th>Weight</th>
											<th>Preferred Paddle Side</th>
											<th>Preferred Position</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>

										{this.props.teamMembers.teamMembers.map(function(item,index){
											return (
												<tr>
													<td>{item.firstName} {item.lastName}</td>
													<td>{item.weight}</td>
													<td>{item.preferredPaddleSide}</td>
													<td>{item.preferredSection}</td>
													<td>
														<div className="btn-group">
															<Link to={"/dashboard/team/"+this.props.team.id+"/edit-member/"+item.id} className="btn btn-sm btn-primary">Edit</Link>
															<button className="btn btn-sm btn-danger" onClick={(event) => this.handleDeleteTeamMember(item.id)}>Delete</button>
														</div>
													</td>
												</tr>
											);
										},this)}
										
										
									</tbody>
								</table>

							</div>
						</div>

					</div>
					<div className="col col-4">
						<EditTeam team={this.props.team} />

						<AddEditTeamMemberForm teamMember={this.props.teamMember} btnTxt="Add Team Member" />
					</div>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		teamMembers: state.teamMembers,
		teamMember: state.teamMember,
		currentUser: state.currentUser,
		team: state.team
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getTeamMembers: (teamId) => dispatch(getTeamMembers(teamId)),
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId)),
		deleteTeamMember: (teamId,teamMemberId) => dispatch(deleteTeamMember(teamId,teamMemberId)),
		resetTeamMember: () => dispatch(resetTeamMember())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Team);
