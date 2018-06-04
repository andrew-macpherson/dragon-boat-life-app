//Import Constants
import api from 'Dragon-Boat-Life/src/utils/api';

//Import Actions
import { NavigationActions } from 'react-navigation';


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

        team.post(data,(success,err,user) => {
            if(success === true){
                //Re Fetch Teams
                dispatch(getUserTeams(data.userId));

                //Reset team Form
                dispatch(resetTeam());

            }else{

            }
        });

    };
}

export function patch(teamId,data) {
    return (dispatch) => {

        team.patch(teamId,data,(success,err,user) => {
            if(success === true){


            }else{

            }
        });

    };
}

export function getUserTeams(userId){
    return (dispatch) => {

        var endPoint = 'dbUsers/'+userId+'/teams';
        
        api.get(endPoint,(success,err,teams) => {
            if(success === true){
                
                dispatch(setTeams(teams));
                
            }else{
                
            }
        })
    };
}

export function getUserTeam(userId,teamId){
    return (dispatch) => {

        user.getTeam(userId,teamId,{},(success,err,team) => {
            if(success === true){

                dispatch(setTeam(team));
                
            }else{

            }
        })
    };
}

export function deleteUserTeam(userId,teamId){
    return (dispatch) => {

        user.deleteTeam(userId,teamId,(success,err,team) => {
            if(success === true){

                dispatch(getUserTeams(userId));
                
            }else{

            }
        })
    };
}

