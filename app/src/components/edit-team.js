import React from 'react';
import {connect} from 'react-redux';

//Import Actions
import {changeInput} from 'actions/common';
import {patch,getUserTeam} from 'actions/team.js';

class CreateTeam extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	componentDidMount(){
		var teamId = this.props.team.id;
		this.props.getUserTeam(this.props.currentUser.id,teamId);
	}

	handelOnSubmit(event){
		event.preventDefault();
		this.props.patch(this.props.team.id,this.props.team);
	}

	render(){
		return (
			<div className="card">
				<div className="card-header">
					Edit Team
				</div>
				<div className="card-body">
					<form method="post" onSubmit={this.handelOnSubmit}>

						<div className="input-group">
							<input name="teamName" className="form-control" type="text" value={this.props.team.name} onChange={(event) => this.props.updateValue(event.target.value,'name')} />
							<span className="input-group-btn">
								<button type="submit" className="btn btn-primary">Edit</button>
							</span>
						</div>

					</form>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		team: ownProps.team,
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_INPUT',newVal,change)),
		patch: (teamId,data) => dispatch(patch(teamId,data)),
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam);
