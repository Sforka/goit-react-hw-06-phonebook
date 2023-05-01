import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { update } from 'redux/filterSlice';

export const Filter = ({ filter }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <label>Find contacts by name </label>
      <input
        type="text"
        name="filter"
        placeholder="Enter filter"
        value={filter}
        onChange={e => dispatch(update(e.target.value))}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};