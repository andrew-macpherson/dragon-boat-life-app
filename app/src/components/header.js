import React from 'react';
import {NavLink} from 'react-router-dom';

export class Header extends React.Component{

	componentDidMount(){
		
	}

	render(){
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark">

					<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/dashboard"><img className="appLogo" src="/images/dragon-boat-life-logo-white.png" /> <span className="appName">Coach's Zone (BETA)</span></a>
					<div className="">
						<ul className="nav d-flex d-flex px-3">
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashboard">Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashboard/teams">Teams</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashboard/account">Account</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashboard/sign-out">Sign out</NavLink>
							</li>
						</ul>
					</div>

				</nav>
			</div>
		);
	}
}