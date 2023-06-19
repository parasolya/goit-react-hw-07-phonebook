import React from 'react';
import ContactForm from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';
import css from '././Phonebook/Phonebook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterAction } from '../redux/Filter/filterSlice';
import {
  selectContacts,
  selectFilter,
  selectError,
  selectIsLoading,
} from '../redux/selectors';
import { useEffect } from 'react';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';
import Loader from './Phonebook/Loader';

function App() {
  const contacts = useSelector(selectContacts);
  const { filter } = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const formSubmitHandler = data => {
    data.id = nanoid();
    const sameName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const sameNumber = contacts.find(
      el => el.phone.toLowerCase() === data.phone.toLowerCase()
    );
    if (sameNumber) return alert(sameNumber.phone + ' is already in contacts.');

    dispatch(addContact(data));
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
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.phonebook__section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>

      <Filter value={filter} changeFilter={handleChangeFilter} />
      {error && <h2>{error}</h2>}
      {isLoading && !error && <Loader />}
      <ContactList contacts={visibleContacts()} onDelete={deleteContacts} />
    </div>
  );
}

export default App;
