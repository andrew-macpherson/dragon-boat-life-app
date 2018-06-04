import * as constants from 'Dragon-Boat-Life/src/utils/constants';
import { AsyncStorage } from 'react-native';


var api = {

	get(endpoint,callback){
		const access_token = AsyncStorage.getItem('access_token');
		AsyncStorage.getItem('access_token', (err, result) => {
			if(result){
				var url = constants.API_URL+'/'+endpoint+'?access_token='+result;
			}else{
				var url = constants.API_URL+'/'+endpoint;
			}

			fetch(constants.API_URL+'/'+endpoint+'?access_token='+access_token, {
				method: 'GET'
			}).then(function(response) {
		        if (!response.ok) {
		            throw response;
		        }
		        return response;
		    }).then(function(response){
				//Success.
				response.json().then(json => {
					callback(true,false,json);
			    });

			}).catch(function(error) {
				error.json().then(json => {
			        callback(false,json.error.message);
			    });	
		    });

			return;
		});
	},

	patch(endpoint,data,callback){
		const access_token = AsyncStorage.getItem('access_token');
		AsyncStorage.getItem('access_token', (err, result) => {
			if(result){
				var url = constants.API_URL+'/'+endpoint+'?access_token='+result;
			}else{
				var url = constants.API_URL+'/'+endpoint;
			}

			fetch(url, {
				method: 'PATCH',
				body: JSON.stringify(data),
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
					callback(true,false,response);
			    });

			}).catch(function(error) {
		        error.json().then(json => {
			        callback(false,json.error.message);
			    });
		    });

			return;
		});
	},

	post(endpoint,data,callback){
		const access_token = AsyncStorage.getItem('access_token');
		AsyncStorage.getItem('access_token', (err, result) => {
			if(result){
				var url = constants.API_URL+'/'+endpoint+'?access_token='+result;
			}else{
				var url = constants.API_URL+'/'+endpoint;
			}

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
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
					callback(true,false,response);
			    });

			}).catch(function(error) {
				console.log(error);
		        error.json().then(json => {
			        callback(false,json.error.message);
			    });
		    });

			return;
	    });

		
	},

	delete(endpoint,data,callback){
		const access_token = AsyncStorage.getItem('access_token');
		AsyncStorage.getItem('access_token', (err, result) => {
			if(result){
				var url = constants.API_URL+'/'+endpoint+'?access_token='+result;
			}else{
				var url = constants.API_URL+'/'+endpoint;
			}

			fetch(url, {
				method: 'DELETE'
			}).then(function(response) {
		        if (!response.ok) {
		            throw response;
		        }
		        return response;
		    }).then(function(response){
				//Success.
				response.json().then(json => {
					callback(true,false,response);
			    });

			}).catch(function(error) {
		        error.json().then(json => {
			        callback(false,json.error.message);
			    });
		    });

			return;
		});
	},



	loginUser(data,callback){
		//const access_token = AsyncStorage.getItem('access_token');
		//AsyncStorage.getItem('access_token', (err, result) => {
			var url = constants.API_URL+'/dbUsers/login';

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
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
					AsyncStorage.setItem('access_token', json.id);
					callback(true,false,response);
			    });

			}).catch(function(error) {
				console.log(error);
		        error.json().then(json => {
			        callback(false,json.error.message);
			    });
		    });

			return;
	    //});

		
	},


	logOutUser(callback){
		AsyncStorage.getItem('access_token', (err, result) => {
			//Attempt to login
			if(result){
				var url = constants.API_URL+'/dbUsers/logout?access_token='+result;
			}else{
				var url = constants.API_URL+'/dbUsers/logout';
			}

			

			fetch(url, {
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
				AsyncStorage.removeItem('access_token');
				callback(true);
			}).catch(function(error) {
		        error.json().then(json => {
			        callback(false,json.error.message);
			    });
		    });
			return;
		});
	},

	currentUser(callback){
		var filters = {}

		AsyncStorage.getItem('access_token', (err, result) => {
			if(result){
				var url = constants.API_URL+'/dbUsers/me?filter='+JSON.stringify(filters)+'&access_token='+result;
			}else{
				var url = constants.API_URL+'/dbUsers/me?filter='+JSON.stringify(filters);
			}

			fetch(url, {
				method: 'GET'
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
		});
	},

}


export default api;