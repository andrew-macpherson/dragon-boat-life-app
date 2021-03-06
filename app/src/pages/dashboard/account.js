import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

//Import Components
import AccountForm from 'components/account-form.js';
import PasswordForm from 'components/password-form.js';

class Account extends React.Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		
	}

	

	render(){
		return (
			<div className="container">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/"}>Home</NavLink>
					</li>
					<li className="breadcrumb-item active">Account</li>
				</ol>

				<div className="row">
					<div className="col col-12 col-md-8">
						<AccountForm />
					</div>
					<div className="col col-12 col-md-4">
						<PasswordForm />
						
					</div>
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

	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Account);
