import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { contactsAction } from 'redux/actions';

export const bookReducer = createReducer(initialState, {
        [contactsAction]: (state, action) => ({
            ...state,               
            contacts: action.payload,
        })
}
);