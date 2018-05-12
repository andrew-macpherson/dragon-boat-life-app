import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var team = {

	get(filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/teams?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
			method: 'get'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		    	 // After Fetch 
		        callback(true,false,json);
		    });

		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},


	post(teamData,callback){
		// Register User
		fetch(constants.API_URL+'/teams', {
			method: 'POST',
			body: JSON.stringify(teamData),
			headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			callback(true,false,response);

		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

	patch(userId,teamData,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teams/'+userId+'?access_token='+access_token, {
			method: 'PATCH',
			body: JSON.stringify(teamData),
			headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			callback(true,false,response);

		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

	getEvents(teamId, filters,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teams/'+teamId+'/events?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
			method: 'get'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		    	 // After Fetch 
		        callback(true,false,json);
		    });

		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

	getEvent(teamId,eventId, filters,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teams/'+teamId+'/events/'+eventId+'?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
			method: 'get'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		    	 // After Fetch 
		        callback(true,false,json);
		    });

		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

	deleteTeamMember(teamId, teamMemberId,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teams/'+teamId+'/teamMembers/'+teamMemberId+'?access_token='+access_token, {
			method: 'delete'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			callback(true,false,response);
			
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

	deleteTeamEvent(teamId, eventId,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teams/'+teamId+'/events/'+eventId+'?access_token='+access_token, {
			method: 'delete'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			callback(true,false,response);
			
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},

}


export default team;
