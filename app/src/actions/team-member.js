//Import Constants
import team from 'utils/team';
import teamMember from 'utils/team-member.js';
import user from 'utils/user';

import history from 'utils/history';


//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


export function resetTeamMember() {
    return {
        type: 'RESET_TEAM_MEMBER_STATE'
    };
}

export function setTeamMember(teamMember){
    return {
        type: 'SET_TEAM_MEMBER_STATE',
        teamMember: teamMember
    };
}

export function setTeamMembers(teamMembers){
    return {
        type: 'SET_TEAM_MEMBERS_STATE',
        teamMembers: teamMembers
    }
}

export function post(data,teamId) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        console.log('teamId is');
        console.log(teamId);

        teamMember.post(data,teamId,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Team Added');

                //Remove loading animation
                dispatch(spinnerEnd());

                //Reset team
                dispatch(resetTeamMember());

                // Re fetch team members
                console.log(data);
                dispatch(getTeamMembers(teamId));

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function patch(teamMemberId,data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        teamMember.patch(teamMemberId,data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Team Member Updated');

                //Remove loading animation
                dispatch(spinnerEnd());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}


export function getTeamMembers(teamId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        var filters = {
            where: {
                teamId:teamId
            }
        }

        teamMember.get(filters,(success,err,teamMembers) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                console.log(teamMembers);
                dispatch(setTeamMembers(teamMembers));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function getTeamMember(teamId,memberId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        var filters = {
            where: {teamId:teamId}
        }

        teamMember.getSingle(memberId,filters,(success,err,teamMember) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                console.log('Team Member Is: ',teamMember);
                dispatch(setTeamMember(teamMember));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function deleteTeamMember(teamId,teamMemberId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.deleteTeamMember(teamId,teamMemberId,(success,err,team) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //re fetch user teams
                dispatch(getTeamMembers(teamId));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}