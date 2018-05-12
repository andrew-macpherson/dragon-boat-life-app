

const initState = {
	teams: []
}


// Handle changing application state
export const teams = (state = initState,action) => {
	switch(action.type){
		case "SET_TEAMS_STATE":
		let newState = {
				...initState,
				teams: action.teams
			}
			console.log('teams state: ',newState);
			return newState;

		case "RESET_TEAMS_STATE":
			let resetTeamState = {
				...initState
			}
			console.log(resetTeamState);
			return resetTeamState;


		default:
			return state;
	}
}
