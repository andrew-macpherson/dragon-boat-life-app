

const initState = {
	isAdmin: 0,
	accessToken: '',

	id: '',
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	phone: '',
	active: ''
}


// Handle changing application state
export const currentUser = (state = initState,action) => {
	switch(action.type){
		case "SET_USER_STATE":
			const newState = Object.assign({},state, action.user);
			console.log('New State',newState);
			return newState;

		case "CHANGE_USER_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			console.log('New State',newInputState);
			return newInputState;


		case "RESET_USER_STATE":
			let resetUserState = initState;
			console.log('New State',resetUserState);
			return resetUserState;

		
		default: 
			return state;
	}
}