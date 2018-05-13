//Import Constants
import user from 'utils/user';

import history from 'utils/history';


//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


//Common
export function resetRegistrationForm() {
    return {
        type: 'RESET_REGISTRATION_FORM'
    };
}

export function resetLoginForm() {
    return {
        type: 'RESET_LOGIN_FORM'
    };
}

export function setCurrentUserState(user){
    return {
        type: 'SET_USER_STATE',
        user: user
    };
}

export function resetCurrentUserState(){
    
    return {
        type: 'RESET_USER_STATE',
        user: user
    };
}


export function register(data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        data.username = data.email;

		user.post(data,(success,err,user) => {
			if(success === true){
				//Reset Registration Form.
				dispatch(resetRegistrationForm());
				//Show success message.
                toastr.success('Success', 'Registration Successful');

				//Remove loading animation
				dispatch(spinnerEnd());

                //Log the user in.
                dispatch(login(data));

			}else{
                toastr.error('Error', 'There was an error: '+err);
		        dispatch(spinnerEnd());
			}
		});

    };
}

export function patch(id,data) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        user.patch(data.id,data,(success,err,user) => {
            if(success === true){
                //Show success message.
                toastr.success('Success', 'User Updated');

                //Remove loading animation
                dispatch(spinnerEnd());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });

    };
}

export function login(data) {

    return (dispatch) => {

        dispatch(spinnerBegin());
        console.log('data test',data);

        user.login(data.email,data.password,(success,err,user) => {
            if(success === true){
                //Send user to dashboard
                history.push('/dashboard');

                //Clear loading
                dispatch(spinnerEnd());
                //reset login form
                dispatch(resetLoginForm());
            }else{
                //Display error message
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        })
    };
}


export function setUser(user){
    return (dispatch) => {

        dispatch(setCurrentUserState(user));
    }
}


export function logoutUser(){
    return (dispatch) => {
        //console.log('logging user out');

        user.logOut(() => {
            //empty current user state
            dispatch(resetCurrentUserState({}));

            //Send user to home
            history.push('/');
        });

    }
}