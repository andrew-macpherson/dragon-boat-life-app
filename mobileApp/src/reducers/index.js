import { combineReducers } from 'redux';

import {navigation} from './nav.js';
import {registration} from './registration.js';
import {login} from './login.js';
import {currentUser} from './currentUser.js';
import {teams} from './teams.js';
import {team} from './team.js';
import {teamMembers} from './team-members.js';

import {events} from './events.js';


export default combineReducers({
	navigation:navigation,
	currentUser,
	registration,
	login,
	teams,
	team,
	teamMembers,
	events
});