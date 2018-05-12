const APP_ENV = process.env.REACT_APP_ENV;

if(APP_ENV === 'development') {
    var URL          = 'http://app.dragonboatlife.com';
    var API_BASE_URL = 'http://app.dragonboatlife.com:3001';
    var UPLOADS_URL = 'http://app.dragonboatlife.com/app';
} else if(APP_ENV === 'production') {
    var URL          = 'http://app.dragonboatlife.com';
    var API_BASE_URL = 'http://app.dragonboatlife.com:3001';
    var UPLOADS_URL = 'http://app.dragonboatlife.com/app';
} else { // local
    var URL          = 'http://localhost:3000';
    var API_BASE_URL = 'http://localhost:3001';
    var UPLOADS_URL = 'http://localhost:8888/dragonboatlife/app';
}

export {URL};
export {API_BASE_URL};
export {UPLOADS_URL};
export const API_URL = API_BASE_URL + '/api';

export const SITE_ROOT = process.env.PUBLIC_URL;