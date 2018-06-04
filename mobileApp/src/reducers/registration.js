

const initState = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	password:'',
}


export function registration(state = initState, action){
	switch(action.type){
		case "CHANGE_REGISTRAION_INPUT":
			const newRegistrationState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			
			return newRegistrationState;

		case "RESET_REGISTRATION_FORM":
			let resetFormState = initState;

			return resetFormState;

		default: 
			return state;
	}
}