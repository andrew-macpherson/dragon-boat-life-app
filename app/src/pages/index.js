import * as constants from 'utils/constants';

import {API_BASE_URL} from 'utils/constants';


import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import RegistrationForm from 'components/registration-form.js';
import LoginForm from 'components/login-form.js';

//Import action
import {changeInput} from 'actions/common';


class Index extends React.Component{

	render(){
		return(
			<div className="container">
				<div id="homePageBgImage"></div>

				<div className="row">
					<div className="col-12 text-center">
						<img className="homePageLogo" src="/images/dragon-boat-life-logo-white.png" />
					</div>
				</div>

				<div className="row">
					<div className="col-6">
						<LoginForm />
					</div>

					<div className="col-6">
						<RegistrationForm />
					</div>

				</div>
				
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		login: state.login,
		registration: state.registration
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_LOGIN_INPUT',newVal,change)),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
