import React from 'react';
import {connect} from 'react-redux';

//Import Actions
import {changeInput} from 'actions/common';
import {patch} from 'actions/user';

class PasswordForm extends React.Component{
	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
		this.handleUpdatePasswordValue = this.handleUpdatePasswordValue.bind(this);

		this.state = {
			password: '',
			passwordAgain: ''
		}
	}

	componentDidMount(){
		
	}

	handleUpdatePasswordValue(val,field){
		if(field == 'password'){
			this.setState({
				password:val
			});
		}else{
			this.setState({
				passwordAgain:val
			});
		}
	}

	handelOnSubmit(event){
        event.preventDefault();

        if(this.state.password !== this.state.passwordAgain){
        	alert('Passwords do not match');
        }else{
        	var data = {
	        	id: this.props.currentUser.id,
				password: this.props.currentUser.password,
	        }

	        this.props.patch(this.props.currentUser.id,this.props.currentUser);
        }
        
    }

	render(){
		return (
			<div className="card">
				<div className="card-header">
					Reset Password
				</div>
				<div className="card-body">

					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>New Password</label>
							<input name="email" className="form-control" type="password" value={this.state.password} onChange={(event) => this.handleUpdatePasswordValue(event.target.value,'password')} />
						</div>

						<div className="form-group">
							<label>Re Type New Password</label>
							<input name="email" className="form-control" type="password" value={this.state.passwordAgain} onChange={(event) => this.handleUpdatePasswordValue(event.target.value,'passwordAgain')} />
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


export default connect(mapStateToProps,mapDispatchToProps)(PasswordForm);
