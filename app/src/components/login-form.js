import {API_BASE_URL} from 'utils/constants';

import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

//Import action
import {changeInput} from 'actions/common';
import {login} from 'actions/user';

class LoginForm extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	handelOnSubmit(event){
        event.preventDefault();
        this.props.login(this.props.loginData);
    }

	render(){
		return(
			<div className="card">
				<div className="card-header">
					Login
				</div>
				<div className="card-body">

					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>Email Address</label>
							<input name="email" className="form-control" type="text" value={this.props.loginData.email} onChange={(event) => this.props.updateValue(event.target.value,'email')} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input name="password" className="form-control" type="password" value={this.props.loginData.password} onChange={(event) => this.props.updateValue(event.target.value,'password')} />
						</div>
						<div className="form-group aligncenter mt-4">
							<button type="submit" className="btn btn-lg btn-warning">Log In</button>
						</div>
					</form>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		loginData: state.login
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_LOGIN_INPUT',newVal,change)),
		login: (loginData) => dispatch(login(loginData))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
