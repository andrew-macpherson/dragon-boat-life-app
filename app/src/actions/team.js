//Import Constants
import team from 'utils/team';
import user from 'utils/user';

import history from 'utils/history';


//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


export function resetTeam() {
    return {
        type: 'RESET_TEAM_STATE'
    };
}

export function setTeam(team){
    return {
        type: 'SET_TEAM_STATE',
        team: team
    };
}

export function setTeams(teams){
    return {
        type: 'SET_TEAMS_STATE',
        teams: teams
    }
}

export function post(data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.post(data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Team Added');

                //Remove loading animation
                dispatch(spinnerEnd());

                //Re Fetch Teams
                dispatch(getUserTeams(data.userId));

                //Reset team Form
                dispatch(resetTeam());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function patch(teamId,data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.patch(teamId,data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Team Updated');

                //Remove loading animation
                dispatch(spinnerEnd());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function getUserTeams(userId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        user.getTeams(userId,{},(success,err,teams) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(setTeams(teams));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function getUserTeam(userId,teamId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        user.getTeam(userId,teamId,{},(success,err,team) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(setTeam(team));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function deleteUserTeam(userId,teamId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        user.deleteTeam(userId,teamId,(success,err,team) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //re fetch user teams
                dispatch(getUserTeams(userId));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

