import PropTypes from 'prop-types';
import { selectFilter, selectContacts } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { filterAction } from 'redux/Filter/filterSlice';

const Filter = ({ value, changeFilter }) => {

  const { filter } = useSelector(selectFilter); 
  const contacts = useSelector(selectContacts); 

  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    dispatch(filterAction(e.currentTarget.value));
  };
  // const visibleContacts = () => {
  //   const visible = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   return visible;
  // };
  
  return (
    <div>
      <label>Find contacts by name   <br/>
        <input type="text" value={filter} onChange={(e) => {handleChangeFilter(e)}} />
      </label>
    </div>
    )
        
};
Filter.prototype = {
  value: PropTypes.string.isRequired,  
  changeFilter: PropTypes.func.isRequired,
};
export default Filter;
