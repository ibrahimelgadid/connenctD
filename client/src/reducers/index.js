import { combineReducers } from "redux";

import profileReducer from "./profileReducer";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import postReducer from "./postReducer";




export default combineReducers({

    profile:profileReducer,
    auth:authReducer,
    errors:errorsReducer,
    post:postReducer
})