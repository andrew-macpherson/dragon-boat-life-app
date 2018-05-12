

const initState = {
	events: []
}


// Handle changing application state
export const events = (state = initState,action) => {
	switch(action.type){
		case "SET_EVENTS_STATE":
		let newState = {
				...initState,
				events: action.events
			}
			console.log('events state: ',newState);
			return newState;

		case "RESET_EVENTS_STATE":
			let resetEventState = {
				...initState
			}
			console.log(resetEventState);
			return resetEventState;


		default:
			return state;
	}
}
