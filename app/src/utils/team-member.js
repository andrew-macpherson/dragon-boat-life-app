import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var teamMember = {

	get(filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/teamMembers?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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

	getSingle(id,filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/teamMembers/'+id+'?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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


	post(teamMember,teamId,callback){
		// Register User
		fetch(constants.API_URL+'/teams/'+teamId+'/teamMembers', {
			method: 'POST',
			body: JSON.stringify(teamMember),
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
	        callback(false,error);
	    });

		return;
	},

	patch(teamMemberId,teamMemberData,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/teamMembers/'+teamMemberId+'?access_token='+access_token, {
			method: 'PATCH',
			body: JSON.stringify(teamMemberData),
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
	}

}


export default teamMember;
