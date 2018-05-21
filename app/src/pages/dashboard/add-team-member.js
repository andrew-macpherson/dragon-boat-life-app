import React from 'react';
import {connect} from 'react-redux';
import {NavLink,Link} from 'react-router-dom';

//Import Actions 
import {changeInput} from 'actions/common';
import {post,patch,getTeamMember,resetTeamMember} from 'actions/team-member';
import {getUserTeam} from 'actions/team.js';

//Import Components
import AddEditTeamMemberForm from 'components/add-team-member.js';

class AddEditTeamMember extends React.Component{

	constructor(props){
		super(props);

	}

	componentDidMount(){
		var teamId = this.props.match.params.id;

		//Reset team member
		this.props.resetTeamMember();

		if(this.props.match.params.memberId !== undefined){	
			var memberId = this.props.match.params.memberId;

			this.props.getTeamMember(teamId,memberId);
		}

		//Get Team Info
		this.props.getUserTeam(this.props.currentUser.id,teamId);
	}


	render(){
		return (
			<div div className="container">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/"}>Home</NavLink>
					</li>
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/teams/"}>Teams</NavLink>
					</li>
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/team/"+this.props.team.id+"/view"}>{this.props.team.name}</NavLink>
					</li>
					<li className="breadcrumb-item active">Edit Team Member</li>
				</ol>

				<h3>Update Team Member</h3>
				{this.props.teamMember.id ?
				<AddEditTeamMemberForm teamMember={this.props.teamMember} btnTxt="Edit Team Member" />
				:
				'' }
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		team: state.team,
		teamMember: state.teamMember,
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_MEMBER_INPUT',newVal,change)),
		post: (data) => dispatch(post(data)),
		patch:(teamMemberId,teamMember) => dispatch(patch(teamMemberId,teamMember)),
		getTeamMember: (teamId,memberId) =>dispatch(getTeamMember(teamId,memberId)),
		resetTeamMember: () => dispatch(resetTeamMember()),
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId)),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AddEditTeamMember);
