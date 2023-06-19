import { combineReducers } from "redux";
import { bookReducer } from './Book/bookSlice';
import { filterReducer } from "./Filter/filterSlice";

export const reducer = combineReducers({ 
    filter: filterReducer,  
    contacts: bookReducer,
});