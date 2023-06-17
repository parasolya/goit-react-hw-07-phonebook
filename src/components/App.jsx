// import { useEffect } from 'react';
import React from 'react';
import ContactForm from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import css from '././Phonebook/Phonebook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactsAction, filterAction } from '../redux/actions';

function App() {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  
  const formSubmitHandler = data => {   
    data.id = nanoid();
    const sameName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const sameNumber = contacts.find(
      el => el.number.toLowerCase() === data.number.toLowerCase()
    );
    if (sameNumber)
      return alert(sameNumber.number + ' is already in contacts.');
    dispatch(contactsAction([data, ...contacts]));
  };

  const handleChangeFilter = e => {
    dispatch(filterAction(e.currentTarget.value));
  };
  const visibleContacts = () => {
    const visible = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return visible;
  };

  const deleteContacts = id => {
    const updateArray = contacts.filter(contact => contact.id !== id);
    dispatch(contactsAction(updateArray));
  };

  return (
    <div className={css.phonebook__section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>

      <Filter value={filter} changeFilter={handleChangeFilter} />
      {contacts.length ? (
        <ContactList contacts={visibleContacts()} onDelete={deleteContacts} />
      ) : (
        <p>No any contacts</p>
      )}
    </div>
  );
}

export default App;
