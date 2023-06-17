import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { filterAction } from 'redux/actions';

export const filterReducer = createReducer(initialState, {
    [filterAction]: (state, action) => ({
            ...state,           
            filter: action.payload,            
        })      
}
);