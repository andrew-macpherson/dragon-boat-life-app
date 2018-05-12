import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var event = {

	get(filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/events?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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


	post(eventData,callback){
		// Register User
		fetch(constants.API_URL+'/events', {
			method: 'POST',
			body: JSON.stringify(eventData),
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

	patch(userId,eventData,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/events/'+userId+'?access_token='+access_token, {
			method: 'PATCH',
			body: JSON.stringify(eventData),
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

	getRaces(eventId,filters,callback){
		var access_token =  Cookies.get('access_token');

		// Register User
		fetch(constants.API_URL+'/events/'+eventId+'/races?filter='+JSON.stringify(filters)+'&access_token='+access_token, {
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

	deleteEventRace(eventId, raceId,callback){
		var access_token =  Cookies.get('access_token');
		
		// Register User
		fetch(constants.API_URL+'/events/'+eventId+'/races/'+raceId+'?access_token='+access_token, {
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


export default event;
