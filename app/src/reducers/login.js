

const initState = {
	email: '',
	password:''
}


export function login(state = initState, action){
	switch(action.type){
		case "CHANGE_LOGIN_INPUT":
			const newRegistrationState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			
			return newRegistrationState;

		case "RESET_LOGIN_FORM":
			let resetFormState = {
				email: '',
				password:''
			};

			return resetFormState;

		default: 
			return state;
	}
}