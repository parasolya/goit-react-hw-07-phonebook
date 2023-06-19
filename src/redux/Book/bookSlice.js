import { createSlice } from "@reduxjs/toolkit";
import{ initialStateBook } from "./initialStateBook";
import { fetchContacts, addContact, deleteContact } from '../../redux/operations';


const handlePending = state => {
  return {
    ...state,
    isLoading: true,
  };
};

const handleRejected = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};


const handleFetchContactsSuccess = (state, action) => {
  return { ...state, isLoading: false, error: null, contacts: action.payload };
};

const handleAddContactSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    contacts: [action.payload, ...state.contacts],
  };
};

const handleDeleteContactSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    contacts: state.contacts.filter(a => a.id !== action.payload.id),
  };
};


export const bookSlice = createSlice({
    name: 'contacts',
    initialState: initialStateBook,
    extraReducers: {
            [fetchContacts.pending]: handlePending,
            [addContact.pending]: handlePending,
            [deleteContact.pending]: handlePending,
            [fetchContacts.rejected]: handleRejected,
            [addContact.rejected]: handleRejected,
            [deleteContact.rejected]: handleRejected,
            [fetchContacts.fulfilled]: handleFetchContactsSuccess,
            [addContact.fulfilled]: handleAddContactSuccess,
            [deleteContact.fulfilled]: handleDeleteContactSuccess,
          },
});

export const bookReducer = bookSlice.reducer;

