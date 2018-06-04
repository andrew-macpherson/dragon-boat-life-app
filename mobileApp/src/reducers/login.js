

const initState = {
	email: '',
	password:''
}


export function login(state = initState, action){
	switch(action.type){
		case "CHANGE_LOGIN_INPUT":
			const newLoginState = {
				...state,
				[action.item_to_change]: action.new_value
			}

			return newLoginState;

		case "RESET_LOGIN_FORM":
			let resetFormState = initState;

			return resetFormState;

		default: 
			return state;
	}
}