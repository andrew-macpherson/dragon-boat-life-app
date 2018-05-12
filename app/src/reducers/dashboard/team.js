

const initState = {
	id: '',
	name: ''
}


// Handle changing application state
export const team = (state = initState,action) => {
	switch(action.type){
		case "SET_TEAM_STATE":
			const newState = Object.assign({},state, action.team);
			console.log('newState: ',newState);
			return newState;

		case "CHANGE_TEAM_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			console.log('newInputState: ',newInputState);
			return newInputState;

		case "RESET_TEAM_STATE":
			let resetTeamState = {
				...initState
			}
			console.log(resetTeamState);
			return resetTeamState;


		default:
			return state;
	}
}
