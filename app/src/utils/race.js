import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var race = {

	get(filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/races?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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


	post(raceData,callback){
		// Register User
		fetch(constants.API_URL+'/races', {
			method: 'POST',
			body: JSON.stringify(raceData),
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

	patch(raceId,raceData,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/races/'+raceId+'?access_token='+access_token, {
			method: 'PATCH',
			body: JSON.stringify(raceData),
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


export default race;
