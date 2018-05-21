import React from 'react';
import {connect} from 'react-redux';

//Import Actions
import {changeInput} from 'actions/common';
import {patch} from 'actions/user';

class AccountForm extends React.Component{
	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	componentDidMount(){
		
	}

	handelOnSubmit(event){
        event.preventDefault();

        var data = {
        	id: this.props.currentUser.id,
			email: this.props.currentUser.email,
			firstName: this.props.currentUser.firstName,
			lastName: this.props.currentUser.lastName,
			phoneNumber: this.props.currentUser.phoneNumber,
			gender: this.props.currentUser.gender,
			weight: this.props.currentUser.weight,
        }

        this.props.patch(this.props.currentUser.id,data);
    }

	render(){
		return (
			<div className="card">
				<div className="card-header">
					Account
				</div>
				<div className="card-body">

				<form method="post" onSubmit={this.handelOnSubmit}>
					<div className="form-group">
						<label>First Name</label>
						<input name="email" required className="form-control" type="text" value={this.props.currentUser.firstName} onChange={(event) => this.props.updateValue(event.target.value,'firstName')} />
					</div>
					<div className="form-group">
						<label>Last Name</label>
						<input name="email" className="form-control" type="text" value={this.props.currentUser.lastName} onChange={(event) => this.props.updateValue(event.target.value,'lastName')} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input name="email" required className="form-control" type="text" value={this.props.currentUser.email} onChange={(event) => this.props.updateValue(event.target.value,'email')} />
					</div>
					<div className="form-group">
						<label>Phone Number</label>
						<input name="email" className="form-control" type="text" value={this.props.currentUser.phoneNumber} onChange={(event) => this.props.updateValue(event.target.value,'phoneNumber')} />
					</div>
					<div className="form-group">
						<label>Weight</label>
						<input name="teamName" required className="form-control" type="text" value={this.props.currentUser.weight} onChange={(event) => this.props.updateValue(event.target.value,'weight')} />
					</div>
					<div className="form-group">
						<label>Gender</label>
						<select className="form-control" value={this.props.currentUser.gender} onChange={(event) => this.props.updateValue(event.target.value,'gender')}>
							<option>Male</option>
							<option>Female</option>
						</select>
					</div>
					<div className="form-group mt-4">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</form>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_USER_INPUT',newVal,change)),
		patch:(id,data) => dispatch(patch(id,data))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AccountForm);
