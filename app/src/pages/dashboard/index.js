import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
// import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

//Import Auth
import user from 'utils/user';
import {setUser} from 'actions/user';

//Import History Component
import history from 'utils/history';
 
// Import Page Components
import Home from 'pages/dashboard/home.js';
import LogOut from 'pages/dashboard/log-out.js';

import Teams from 'pages/dashboard/teams.js';

import Team from 'pages/dashboard/team.js';
import AddEditTeamMember from 'pages/dashboard/add-team-member.js';

import TeamEvents from 'pages/dashboard/team-events.js';
import EditEvent from 'pages/dashboard/edit-event.js';

import EventRoster from 'pages/dashboard/event-roster.js';

import Account from 'pages/dashboard/account.js';

//Import Components
import {Header} from 'components/header.js';
import {Footer} from 'components/footer.js';

class Dashboard extends React.Component{

	componentDidMount(){
		//check if logged in i.e. the access token is set.
		if(user.loggedIn()){
			// Check if the current user state is empty.
			if(this.props.currentUser.id === ''){
				//Get current user data
				user.currentUser((success,error,user) => {
					// Set the current user state
					this.props.setUser(user);
				});
			}



		}else{
			console.log('access token not set');
			//User is not logged in, lets send them to login page.
			history.push('/');
		}
	}

	render(){
		return (
			<div>
				<Header />
				{this.props.currentUser.id !== '' ?
					<div className="applicationContainer">
						<Route exact={true} path="/dashboard" component={Home} />
						<Route exact={true} path="/dashboard/sign-out" component={LogOut} />
						<Route exact={true} path="/dashboard/teams" component={Teams} />

						<Route exact={true} path="/dashboard/team/:id/view" component={Team} />
						<Route exact={true} path="/dashboard/team/:id/add-member" component={AddEditTeamMember} />
						<Route exact={true} path="/dashboard/team/:id/edit-member/:memberId" component={AddEditTeamMember} />

						<Route exact={true} path="/dashboard/team/:id/events" component={TeamEvents} />
						<Route exact={true} path="/dashboard/team/:id/event/:eventId/edit" component={EditEvent} />

						<Route exact={true} path="/dashboard/team/:id/event/:eventId/roster" component={EventRoster} />
						

						<Route exact={true} path="/dashboard/account" component={Account} />
					</div>
				: 'Loading...'}
				<Footer />
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
		setUser: (data) => dispatch(setUser(data)),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
