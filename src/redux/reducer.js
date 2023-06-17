import { combineReducers } from "redux";
import { bookReducer } from './Book/bookReducer';
import { filterReducer } from "./Filter/filterReduce";

export const reducer = combineReducers({ 
    filter: filterReducer,  
    contacts: bookReducer,
});