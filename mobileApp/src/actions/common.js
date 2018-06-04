export function changeInput(type,newVal,change){
	return {
		type: type,
		item_to_change : change,
		new_value 	: newVal
    };
}

export function navigate(route){
	return {
		type: 'Navigation/NAVIGATE',
		routeName:route
	}
}