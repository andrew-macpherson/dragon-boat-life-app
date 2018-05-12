import React from 'react';
import {connect} from 'react-redux';

//Import Actions 
import {changeInput} from 'actions/common';
import {post,resetTeam} from 'actions/team';

class CreateTeam extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	componentDidMount(){
		this.props.resetTeam();
	}

	handelOnSubmit(event){
        event.preventDefault();
        var data = {
        	userId:this.props.currentUser.id,
        	name:this.props.team.name
        }
        this.props.post(data);
    }

	render(){
		return (
			<div className="card">
				<div className="card-header">
					Create Team
				</div>
				<div className="card-body">
					<form  method="post" onSubmit={this.handelOnSubmit}>
						<div className="input-group">
							<input name="teamName" className="form-control" type="text" placeholder="Team Name" value={this.props.team.name} onChange={(event) => this.props.updateValue(event.target.value,'name')} />
							<span className="input-group-btn">
								<button type="submit" className="btn btn-primary">Add</button>
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
		team: state.team,
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {
		resetTeam:() => dispatch(resetTeam()),
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_TEAM_INPUT',newVal,change)),
		post: (data) => dispatch(post(data))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam);
