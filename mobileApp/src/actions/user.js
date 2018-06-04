//Import Constants
import api from 'Dragon-Boat-Life/src/utils/api';

//Import Actions
import { NavigationActions } from 'react-navigation';

//current user
export function resetRegistrationForm() {
    return {
        type: 'RESET_REGISTRATION_FORM'
    };
}

export function setCurrentUserState(user){
    return {
        type: 'SET_USER_STATE',
        user: user
    };
}

/// Register user
export function register(data) {
    return (dispatch) => {

        //set data that isnt't set for DB insert
        data.username = data.email;
        // Set account type to coach. 
        data.accountType = 3;

        console.log('data is: ',data);
        
        api.post('dbUsers',data,(success,err,user) => {
        	console.log('some stuff might happen');
            if(success === true){
                //Reset Registration Form.
                dispatch(resetRegistrationForm());

                alert('registration successful');

                var loginData = {
                    email: data.email,
                    password: data.password
                }
                dispatch(login(loginData));

            }else{
                alert('There was an error: '+err);
            }
        });
        

    };
}

export function login(data) {
    return (dispatch) => {

        data.active = 1;

        api.loginUser(data,(success,err,user) => {
            if(success === true){

                // Redirect to Dashboard
                dispatch({
                    type:'Navigation/NAVIGATE',
                    routeName:'Dashboard'
                });

            }else{
                alert('There was an error: '+err);
            }
        });

    };
}

export function setUser(user){
    return (dispatch) => {

        dispatch(setCurrentUserState(user));
    }
}

export function logOut() {
    return (dispatch) => {

        api.logOutUser((success,err,user) => {
            if(success === true){

                dispatch({
                    type:'Navigation/NAVIGATE',
                    routeName:'Login'
                })
            }else{

                alert('There was an error: '+err);
            }
        });

    };
}



export function updateProfile(userId,data){
    return (dispatch) => {

        var endPoint = '/dbUsers/'+userId;

        api.patch(endPoint,data,(success,err,user) => {
            if(success === true){
                alert('Updates');

            }else{
                alert('fail ');
            }
        });
    }
}