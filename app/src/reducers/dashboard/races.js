

const initState = {
	races: []
}


// Handle changing application state
export const races = (state = initState,action) => {
	switch(action.type){
		case "SET_RACES_STATE":
		let newState = {
				...initState,
				races: action.races
			}
			console.log('races state: ',newState);
			return newState;

		case "CHANGE_RACE":
			const newInputState = {
				...state
			}
			newInputState.races[action.index] = action.value;

			console.log('newValueState: ',newInputState);
			return newInputState;

		case "RESET_RACES_STATE":
			let resetRaceState = {
				...initState
			}
			console.log(resetRaceState);
			return resetRaceState;


		default:
			return state;
	}
}
