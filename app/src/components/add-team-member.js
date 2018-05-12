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

		this.state = {
			btnTxt: 'Add Team Member'
		}
	}

	componentDidMount(){
		console.log('dsadsa',this.props.teamMember);
		if(this.props.teamMember.id){
			this.setState({btnTxt:'Edit Team Member'});
		}else{
			this.setState({btnTxt:'Add Team Member'});
		}

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
		return (
			<div className="card">
				<div className="card-header">
					Add Team Member
				</div>
				<div className="card-body">
					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>First Name</label>
							<input name="teamName" className="form-control" type="text" value={this.props.teamMember.firstName} onChange={(event) => this.props.updateValue(event.target.value,'firstName')} />
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input name="teamName" className="form-control" type="text" value={this.props.teamMember.lastName} onChange={(event) => this.props.updateValue(event.target.value,'lastName')} />
						</div>
						<div className="form-group">
							<label>Weight</label>
							<input name="teamName" className="form-control" type="text" value={this.props.teamMember.weight} onChange={(event) => this.props.updateValue(event.target.value,'weight')} />
						</div>
						<div className="form-group">
							<label>Gender</label>
							<select className="form-control" value={this.props.teamMember.gender} onChange={(event) => this.props.updateValue(event.target.value,'gender')}>
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
							<button type="submit" className="btn btn-sm btn-primary">{this.state.btnTxt}</button>
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
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_MEMBER_INPUT',newVal,change)),
		post: (data,teamId) => dispatch(post(data,teamId)),
		patch:(teamMemberId,teamMember) => dispatch(patch(teamMemberId,teamMember)),
		getTeamMember: (teamId,memberId) =>dispatch(getTeamMember(teamId,memberId)),
		resetTeamMember: () => dispatch(resetTeamMember())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AddEditTeamMemberForm);
