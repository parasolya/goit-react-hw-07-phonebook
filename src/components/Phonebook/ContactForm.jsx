import { useState } from 'react';
import css from './Phonebook.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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
      name,
      phone,
    };
    onSubmit(contact);
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
