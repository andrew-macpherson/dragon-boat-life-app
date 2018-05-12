//Import Constants
import event from 'utils/event';
import user from 'utils/user';
import team from 'utils/team';

import history from 'utils/history';


//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


export function resetEvent() {
    return {
        type: 'RESET_EVENT_STATE'
    };
}

export function setEvent(event){
    return {
        type: 'SET_EVENT_STATE',
        event: event
    };
}

export function setEvents(events){
    return {
        type: 'SET_EVENTS_STATE',
        events: events
    }
}

export function post(eventData,teamData) {
    return (dispatch) => {

        dispatch(spinnerBegin());


        var data = eventData;
        data['teamId'] = teamData.id;

        event.post(data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Event Added');

                //Remove loading animation
                dispatch(spinnerEnd());

                //Reset event
                dispatch(resetEvent());

                //Get team events
                dispatch(getTeamEvents(teamData.id));

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function patch(eventId,data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        event.patch(eventId,data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Event Updated');

                //Remove loading animation
                dispatch(spinnerEnd());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function getTeamEvents(teamId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.getEvents(teamId,{},(success,err,events) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(setEvents(events));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function getTeamEvent(teamId,eventId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.getEvent(teamId,eventId,{},(success,err,event) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(setEvent(event));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function deleteTeamEvent(teamId,eventId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        team.deleteTeamEvent(teamId,eventId,(success,err,event) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(getTeamEvents(teamId));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}



export function getEventRaces(teamId, eventId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        var filters = {

        }

        event.getRaces(eventId,filters,(success,err,event) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                //dispatch(getTeamEvents(eventId));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}