

const initState = {
	accessToken: '',

	id: '',
	email: '',
	firstName: '',
	lastName: '',
	phoneNumber: '',
	
}


// Handle changing application state
export const currentUser = (state = initState,action) => {
	switch(action.type){
		case "SET_USER_STATE":
			const newState = Object.assign({},state, action.user);
			console.log('newState: ',newState);
			return newState;

		case "CHANGE_USER_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			console.log('newInputState: ',newInputState);
			return newInputState;

		case "RESET_USER_STATE":
			let resetUserState = {
				...initState
			}
			console.log(resetUserState);
			return resetUserState;


		default:
			return state;
	}
}
