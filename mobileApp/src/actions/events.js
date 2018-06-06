//Import Constants
import api from 'Dragon-Boat-Life/src/utils/api';

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


export function getTeamEvents(teamId){
    return (dispatch) => {

        api.get('teams/'+teamId+'/events',{},(success,err,events) => {
            if(success === true){

                //reset login form
                dispatch(setEvents(events));
                
            }else{

            }
        })
    };
}