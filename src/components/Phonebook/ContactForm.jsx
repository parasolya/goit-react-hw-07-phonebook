import { useState } from 'react';
import css from './Phonebook.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContact } from 'redux/operations';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleContactAdd = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      phone,
    };

    const sameName = contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (sameName) return alert(sameName.name + ' is already in contacts.');

    const sameNumber = contacts.find(
      el => el.phone.toLowerCase() === contact.phone.toLowerCase()
    );
    if (sameNumber) return alert(sameNumber.phone + ' is already in contacts.');

    dispatch(addContact(contact));

    setName('');
    setPhone('');
  };

  return (
    <div>
      <form className={css.phonebook__form} onSubmit={handleContactAdd}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={e => {
              handleInputChange(e);
            }}
            value={name}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={e => {
              handleInputChange(e);
            }}
          />
        </label>
        <button className={css.submit__btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ContactForm;
