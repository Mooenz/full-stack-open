import PropTypes from 'prop-types';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with <input onChange={ handleFilter } />
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired
}

export default Filter;
