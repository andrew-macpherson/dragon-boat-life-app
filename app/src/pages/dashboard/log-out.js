import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

//Import Constants
import * as constants from 'utils/constants';

// Import actions
import {logoutUser} from 'actions/user.js';

class logOut extends React.Component{

	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.props.logoutUser();
	}

	render() {

		return false;
	}
}

function mapStateToProps(state,ownProps){
	return false;
}

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => dispatch(logoutUser())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(logOut);