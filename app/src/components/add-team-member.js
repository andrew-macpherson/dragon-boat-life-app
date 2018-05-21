import React from 'react';
import {connect} from 'react-redux';

//Import Actions 
import {changeInput} from 'actions/common';
import {post,patch,getTeamMember,resetTeamMember} from 'actions/team-member';
import {getUserTeam} from 'actions/team.js';

class AddEditTeamMemberForm extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);

	}

	componentDidMount(){
		

	}

	handelOnSubmit(event){
        event.preventDefault();
        console.log(this.props.teamMember);
        if(this.props.teamMember.id !== undefined){
        	this.props.patch(this.props.teamMember.id,this.props.teamMember);
        }else{
        	this.props.post(this.props.teamMember,this.props.team.id);
        }
    }

	render(){
		var disabled = (this.props.teamMember.id ? true : false);

		return (
			<div className="card">
				<div className="card-header">
					{this.props.btnTxt}
				</div>
				<div className="card-body">
					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>First Name</label>
							<input name="teamName" disabled={disabled} required className="form-control" type="text" value={this.props.teamMember.user.firstName} onChange={(event) => this.props.updateUserValue(event.target.value,'firstName')} />
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input name="teamName" disabled={disabled} className="form-control" type="text" value={this.props.teamMember.user.lastName} onChange={(event) => this.props.updateUserValue(event.target.value,'lastName')} />
						</div>
						<div className="form-group">
							<label>Email Address</label>
							<input name="teamName" required disabled={disabled} className="form-control" type="text" value={this.props.teamMember.user.email} onChange={(event) => this.props.updateUserValue(event.target.value,'email')} />
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input name="teamName" disabled={disabled} className="form-control" type="text" value={this.props.teamMember.user.phoneNumber} onChange={(event) => this.props.updateUserValue(event.target.value,'phoneNumber')} />
						</div>
						<div className="form-group">
							<label>Weight</label>
							<input name="teamName" required className="form-control" type="text" value={this.props.teamMember.user.weight} onChange={(event) => this.props.updateUserValue(event.target.value,'weight')} />
						</div>
						<div className="form-group">
							<label>Gender</label>
							<select className="form-control" value={this.props.teamMember.user.gender} onChange={(event) => this.props.updateUserValue(event.target.value,'gender')}>
								<option>Male</option>
								<option>Female</option>
							</select>
						</div>
						<div className="form-group">
							<label>Preferred Paddle Side</label>
							<select className="form-control" value={this.props.teamMember.preferredPaddleSide} onChange={(event) => this.props.updateValue(event.target.value,'preferredPaddleSide')}>
								<option>No Preference</option>
								<option>Left</option>
								<option>Right</option>
							</select>
						</div>
						<div className="form-group">
							<label>Preferred Section</label>
							<select className="form-control" value={this.props.teamMember.preferredSection} onChange={(event) => this.props.updateValue(event.target.value,'preferredSection')}>
								<option>Any</option>
								<option>Pace</option>
								<option>Engine</option>
								<option>Rockets</option>
							</select>
						</div>
						<div className="form-group mt-4">
							<button type="submit" className="btn btn-sm btn-primary">{this.props.btnTxt}</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		team: state.team,
		teamMember: ownProps.teamMember,
		currentUser: state.currentUser,
		btnTxt:ownProps.btnTxt
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_MEMBER_INPUT',newVal,change)),
		updateUserValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_MEMBER_USER_INPUT',newVal,change)),
		post: (data,teamId) => dispatch(post(data,teamId)),
		patch:(teamMemberId,teamMember) => dispatch(patch(teamMemberId,teamMember)),
		getTeamMember: (teamId,memberId) =>dispatch(getTeamMember(teamId,memberId)),
		resetTeamMember: () => dispatch(resetTeamMember())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AddEditTeamMemberForm);
