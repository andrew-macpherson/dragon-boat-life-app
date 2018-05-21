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

export function addTeamMember(data,teamId){
    return (dispatch) => {
        dispatch(spinnerBegin());
        teamMember.post(data,teamId,(success,err,teamMember) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Team Member Added');

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
    }
}

export function updateTeamMember(teamMemberId,data){
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
    }
}

export function post(data,teamId) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        // Check if dbUser already exists
        // If so user their ID to add the new paddler
        // If not create a new DB User

        var userFilter = {
            where: {
                email: data.user.email
            }
        }
        user.get(userFilter,(success,err,dbUser) => {

            if(success === true){
                console.log('user is',dbUser);
                // If user exists use the ID else add a new user first. 
                if(dbUser.length > 0){
                    
                    data.userId = dbUser[0].id;
                    dispatch(addTeamMember(data,teamId));
                    dispatch(spinnerEnd());

                }else{
                    var userData = {
                        email:data.user.email,
                        username:data.user.email,
                        phoneNumber:data.user.phoneNumber,
                        firstName:data.user.firstName,
                        lastName:data.user.lastName,
                        gender:data.user.gender,
                        weight:data.user.weight,
                        password: 'randomPass',
                        accountType:4
                    }
                    user.post(userData,(success,err,dbUser) => {
                        if(success === true){
                            data.userId = dbUser.id;
                            dispatch(addTeamMember(data,teamId));
                            dispatch(spinnerEnd());
                            
                        }else{
                            toastr.error('Error', 'There was an error: '+err);
                            dispatch(spinnerEnd());
                        }
                    });
                }

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

        // Check if dbUser already exists
        // If so user their ID to add the new paddler
        // If not create a new DB User

        var userFilter = {
            where: {
                email: data.user.email
            }
        }
        user.get(userFilter,(success,err,dbUser) => {
            if(success === true){

                
                // If user exists use the ID else add a new user first. 
                var userData = {
                    email:data.user.email,
                    username:data.user.email,
                    phoneNumber:data.user.phoneNumber,
                    firstName:data.user.firstName,
                    lastName:data.user.lastName,
                    gender:data.user.gender,
                    weight:data.user.weight,
                }

                if(dbUser.length > 0){
                    user.patch(dbUser[0].id,userData,(success,err,dbUser) => {
                        if(success === true){
                            data.userId = dbUser.id;
                            dispatch(updateTeamMember(teamMemberId,data));
                            dispatch(spinnerEnd());
                        }else{
                            toastr.error('Error', 'There was an error: '+err);
                            dispatch(spinnerEnd());
                        }
                    });
                    dispatch(updateTeamMember(teamMemberId,data));
                }else{
                    user.password = 'randomPass';
                    user.accountType=4;

                    user.post(userData,(success,err,dbUser) => {
                        if(success === true){
                            data.userId = dbUser.id;
                            dispatch(updateTeamMember(teamMemberId,data));
                            dispatch(spinnerEnd());
                        }else{
                            toastr.error('Error', 'There was an error: '+err);
                            dispatch(spinnerEnd());
                        }
                    });
                }

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
            },
            include: 'user'
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
            where: {teamId:teamId},
            include: 'user'
        }

        teamMember.getSingle(memberId,filters,(success,err,teamMember) => {

            if(success === true){
                console.log('teamMember: fdsfds',teamMember);
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