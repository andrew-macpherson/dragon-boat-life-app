

const initState = {
	preferredPaddleSide: 'No Preference',
	preferredSection: 'Any',
	user: {
		firstName:'',
		lastName:'',
		email:'',
		phoneNumber:'',
		gender:'Male',
		weight:''
	}
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

		case "CHANGE_TEAM_MEMBER_USER_INPUT":
			const newUserInputState = {
				...state,
				user: {
					...state.user,
					[action.item_to_change]: action.new_value
				}
				
			}
			console.log('newInputState: ',newUserInputState);
			return newUserInputState;

		case "RESET_TEAM_MEMBER_STATE":
			let resetTeamState = {
				firstName: '',
				lastName: '',
				weight:'',
				gender:'Male',
				preferredPaddleSide: 'No Preference',
				preferredSection: 'Any',
				user: {
					firstName:'',
					lastName:'',
					email:'',
					phoneNumber:'',
				}
			}
			console.log('resetTeamState',resetTeamState);
			return resetTeamState;


		default:
			return state;
	}
}
