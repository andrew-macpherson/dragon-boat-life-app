//Import spinner
import {pendingTask,begin,end,endAll} from 'react-redux-spinner';

//Import toastr
import {toastr} from 'react-redux-toastr';

export function changeInput(type,newVal,change){
	return {
		type: type,
		item_to_change : change,
		new_value 	: newVal
    };
}

export function spinnerBegin(){
	return {
		type:'SPINENR_BEGIN',
        [ pendingTask ]: begin
    };
}
export function spinnerEnd(){
	return {
		type:'SPINENR_END',
        [ pendingTask ]: end
    };
}

export function spinnerEndAll(){
	return {
		type:'SPINENR_END_ALL',
        [ pendingTask ]: endAll
    };
}