import PropTypes from 'prop-types';
import css from './Phonebook.module.css';
import { selectFilter, selectContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
  const { filter } = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul>
        {visibleContacts.map(el => {
          return (
            <li className={css.contacts__item} key={el.id}>
              <p>
                {el.name}: <span>{el.phone}</span>
              </p>
              <button
                className={css.contacts__btn}
                onClick={() => deleteContacts(el.id)}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
ContactList.prototype = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;
