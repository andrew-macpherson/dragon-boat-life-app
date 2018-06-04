const APP_ENV = process.env.REACT_APP_ENV;
if(APP_ENV === 'development') {
    var URL = 'http://dev.dragonboatlife.com';
	var API_BASE_URL = 'http://dev.dragonboatlife.com:3001';
} else if(APP_ENV === 'production') {
    var URL = 'https://app.dragonboatlife.com';
	var API_BASE_URL = 'https://app.dragonboatlife.com:3001';
} else { // local
    var URL = 'http://localhost:3000';
	var API_BASE_URL = 'http://127.0.0.1:3001';
}


export {URL};
export const SITE_ROOT = process.env.PUBLIC_URL;
export const API_URL = API_BASE_URL + '/api';