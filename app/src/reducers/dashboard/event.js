

const initState = {
	eventName: '',
	minFemale: 0,
	teamId: 0
}


// Handle changing application state
export const event = (state = initState,action) => {
	switch(action.type){
		case "SET_EVENT_STATE":
			const newState = Object.assign({},state, action.event);
			console.log('newState: ',newState);
			return newState;

		case "CHANGE_EVENT_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			console.log('newInputState: ',newInputState);
			return newInputState;

		case "RESET_EVENT_STATE":
			let resetEventState = {
				...initState
			}
			console.log(resetEventState);
			return resetEventState;


		default:
			return state;
	}
}
