

const initState = {
	teamMembers: []
}


// Handle changing application state
export const teamMembers = (state = initState,action) => {
	switch(action.type){
		case "SET_TEAM_MEMBERS_STATE":
		let newState = {
				...initState,
				teamMembers: action.teamMembers
			}
			console.log('teams state: ',newState);
			return newState;

		case "RESET_TEAM_MEMBERS_STATE":
			let resetTeamState = {
				...initState
			}
			console.log(resetTeamState);
			return resetTeamState;


		default:
			return state;
	}
}
