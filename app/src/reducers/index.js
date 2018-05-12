import { combineReducers } from 'redux';

//Loading spinner
import {pendingTasksReducer} from 'react-redux-spinner';
//Toaster
import {reducer as toastrReducer} from 'react-redux-toastr';

//Registration / Login
import {registration} from 'reducers/registration.js';
import {login} from 'reducers/login.js';

//Dashboard Reducers
import {currentUser} from 'reducers/dashboard/currentUser.js';
import {team} from 'reducers/dashboard/team.js';
import {teams} from 'reducers/dashboard/teams.js';
import {teamMember} from 'reducers/dashboard/team-member.js';
import {teamMembers} from 'reducers/dashboard/team-members.js';

import {events} from 'reducers/dashboard/events.js';
import {event} from 'reducers/dashboard/event.js';

import {races} from 'reducers/dashboard/races.js';

export default combineReducers({
  pendingTasks: pendingTasksReducer,
  toastr: toastrReducer,
  currentUser,
  registration,
  login,
  team,
  teams,
  teamMember,
  teamMembers,
  events,
  event,
  races
})
