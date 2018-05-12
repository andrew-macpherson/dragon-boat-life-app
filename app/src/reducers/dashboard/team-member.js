

const initState = {
	firstName: '',
	lastName: '',
	weight:'',
	gender:'Male',
	preferredPaddleSide: 'No Preference',
	preferredSection: 'Any'
}


// Handle changing application state
export const teamMember = (state = initState,action) => {
	switch(action.type){
		case "SET_TEAM_MEMBER_STATE":
			const newState = Object.assign({},state, action.teamMember);
			console.log('newState: ',newState);
			return newState;

		case "CHANGE_TEAM_MEMBER_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			console.log('newInputState: ',newInputState);
			return newInputState;

		case "RESET_TEAM_MEMBER_STATE":
			let resetTeamState = {
				...initState
			}
			console.log(resetTeamState);
			return resetTeamState;


		default:
			return state;
	}
}
