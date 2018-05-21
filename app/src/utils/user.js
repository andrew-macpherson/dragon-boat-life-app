import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var user = {
	login(username,password,callback){
		//Logout user first if they are logged in. 

	    //Attempt to login
		fetch(constants.API_URL+'/dbUsers/login', {
			method: 'POST',
			body: JSON.stringify({
				'email'		: username,
				'password'	: password,
				'active': 1
			}),
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
			response.json().then(json => {
				//Make sure the user is active
		    	 // After Fetch 
		        Cookies.set('access_token', json.id);
		        var access_token =  Cookies.get('access_token');
		        callback(true,false,json);
		    });
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });
		return;
	},

	get(filters,callback){
		var access_token =  Cookies.get('access_token');

		// Get User
		fetch(constants.API_URL+'/dbUsers?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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
	        //error.json().then(json => {
		        callback(false,error);
		    //});
	    });

		return;
	},

	post(userData,callback){
		// Register User
		fetch(constants.API_URL+'/dbUsers', {
			method: 'POST',
			body: JSON.stringify(userData),
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

	patch(userId,userData,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/dbUsers/'+userId+'?access_token='+access_token, {
			method: 'PATCH',
			body: JSON.stringify(userData),
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

	loggedIn(username, password, callback){
		var access_token =  Cookies.get('access_token');
		if(access_token !== '' && access_token !== undefined){
			return true;
		}else{
			return false;
		}
	},
	currentUser(callback){
		var access_token =  Cookies.get('access_token');

		//Attempt to login

		var filters = {}

		fetch(constants.API_URL+'/dbUsers/me?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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

	logOut(callback){
		console.log('log out current user');
		var access_token =  Cookies.get('access_token');

		//Attempt to login
		fetch(constants.API_URL+'/dbUsers/logout?access_token='+access_token, {
			method: 'POST',
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
			Cookies.remove('access_token');
			callback(true);
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });
		return;
	},

	getTeams(userId, filters,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/dbUsers/'+userId+'/teams?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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

	getTeam(userId, teamId, filters,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/dbUsers/'+userId+'/teams/'+teamId+'?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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

	deleteTeam(userId, teamId,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/dbUsers/'+userId+'/teams/'+teamId+'?access_token='+access_token, {
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


export default user;
