//Import Constants
import event from 'utils/event';
import user from 'utils/user';
import race from 'utils/race';

import history from 'utils/history';


//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


export function resetRace() {
    return {
        type: 'RESET_RACE_STATE'
    };
}

export function setRace(race){
    return {
        type: 'SET_RACE_STATE',
        race: race
    };
}

export function setRaces(races){
    return {
        type: 'SET_RACES_STATE',
        races: races
    }
}

export function updateRaceObject(raceIndex,raceData){
    return {
        type: 'CHANGE_RACE',
        value: raceData,
        index: raceIndex
    }
}

export function getEventRaces(teamId, eventId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        var filters = {

        }
        console.log('getting raes');
        event.getRaces(eventId,filters,(success,err,races) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(setRaces(races));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}

export function post(eventId,teamId,raceData) {
    return (dispatch) => {

        dispatch(spinnerBegin());


        var data = raceData;
        data['eventId'] = eventId;

        race.post(data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Race Added');

                //Remove loading animation
                dispatch(spinnerEnd());

                // Re fetch races
                dispatch(getEventRaces(teamId, eventId));

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function patch(raceId,raceData) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        race.patch(raceId,raceData,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'Race Updated');

                //Remove loading animation
                dispatch(spinnerEnd());

                // Re fetch races
                //dispatch(getEventRaces(teamId, eventId));

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}


export function deleteEventRace(eventId,raceId,teamId){
    return (dispatch) => {

        dispatch(spinnerBegin());

        event.deleteEventRace(eventId,raceId,(success,err,event) => {
            if(success === true){
                //Clear loading
                dispatch(spinnerEnd());

                // Re fetch races
                dispatch(getEventRaces(teamId, eventId));
                
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}