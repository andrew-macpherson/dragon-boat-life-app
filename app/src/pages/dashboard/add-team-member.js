import React from 'react';
import {connect} from 'react-redux';

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
				<h3>Update Team Member</h3>
				{this.props.teamMember.id ?
				<AddEditTeamMemberForm teamMember={this.props.teamMember} />
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
