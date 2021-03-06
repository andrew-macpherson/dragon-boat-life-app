import {API_BASE_URL} from 'utils/constants';

import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

//Import action
import {changeInput} from 'actions/common';
import {register} from 'actions/user';

import ReCAPTCHA from 'react-google-recaptcha';


class RegistrationFrom extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			canSubmit: false
		}

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
		this.onCaptchaChange = this.onCaptchaChange.bind(this);
	}

	handelOnSubmit(event){
        event.preventDefault();

        if(this.state.canSubmit){
	        this.props.register(this.props.registration);
        }else{
        	alert('Are you a robot?');
        }
    }

    onCaptchaChange(value){
    	console.log("Captcha value:", value);

    	this.setState({canSubmit:true});

    }

	render(){
		return(
			<div className="card">
				<div className="card-header">
					Register
				</div>
				<div className="card-body">

					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>First Name</label>
							<input name="email" className="form-control" type="text" value={this.props.registration.firstName} onChange={(event) => this.props.updateValue(event.target.value,'firstName')} />
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input name="email" className="form-control" type="text" value={this.props.registration.lastName} onChange={(event) => this.props.updateValue(event.target.value,'lastName')} />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input name="email" className="form-control" type="text" value={this.props.registration.email} onChange={(event) => this.props.updateValue(event.target.value,'email')} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input name="password" className="form-control" type="password" value={this.props.registration.password} onChange={(event) => this.props.updateValue(event.target.value,'password')} />
						</div>

						<div className="form-group">
							<ReCAPTCHA
							    ref="recaptcha"
							    sitekey="6Lco8VgUAAAAADVcldM05si1iLiJlgjrYHPjkLXp"
							    onChange={this.onCaptchaChange}
							/>
					  	</div>

						<div className="form-group aligncenter mt-4">
							<button type="submit" className="btn btn-lg btn-warning">Register</button>
						</div>
					</form>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		registration: state.registration
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_REGISTRAION_INPUT',newVal,change)),
		register: (data) => dispatch(register(data))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(RegistrationFrom);