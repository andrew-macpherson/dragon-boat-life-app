import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

//Import Actions 
import {changeInput} from 'actions/common';
import {post,patch,resetEvent} from 'actions/event.js';

class CreateEventForm extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	componentDidMount(){
		//Reset the event object
		this.props.resetEvent();
	}

	handelOnSubmit(event){
		event.preventDefault();
		if(this.props.event.id !== undefined){
	        this.props.patch(this.props.event.id,this.props.event);
        }else{
        	this.props.post(this.props.event,this.props.team);
        }
	}

	render(){
		return (
			<div className="card">
				<div className="card-header">
					Create Event
				</div>
				<div className="card-body">
					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>Event Name</label>
							<input name="eventName" className="form-control" type="text" value={this.props.event.eventName} onChange={(event) => this.props.updateValue(event.target.value,'eventName')} />
						</div>
						<div className="form-group">
							<label>Minimum Female Paddlers</label>
							<input name="minFemale" className="form-control" type="text" value={this.props.event.minFemale} onChange={(event) => this.props.updateValue(event.target.value,'minFemale')} />
						</div>
						<div className="form-group mt-4">
							<button type="submit" className="btn btn-primary">{this.props.event.id !== undefined?"Update Event":"Add Event"}</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser,
		event: state.event,
		eventId: ownProps.eventId,
		team: ownProps.team,
	}
}


const mapDispatchToProps = dispatch => {
	return {
		resetEvent:() => dispatch(resetEvent()),
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_EVENT_INPUT',newVal,change)),
		post: (eventData,teamData) => dispatch(post(eventData,teamData)),
		patch: (eventId, eventData) => dispatch(patch(eventId, eventData))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateEventForm);
