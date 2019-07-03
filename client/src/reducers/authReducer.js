import * as type from '../actions/type';
import isEmpty from "../validation/is-empy";
const initialState={
    isAuthenicated:false,
    user:{}
};

export default function(state=initialState, action){
    switch (action.type) {

        case type.SET_CURRENT_USER:
            
            return{
                ...state,
                isAuthenicated:!isEmpty(action.payload),
                user:action.payload,
            }
    
        default:
            return state;
    }
}