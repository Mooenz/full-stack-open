import PropTypes from 'prop-types';

const Total = ({ total }) => {
  const totals = total.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);
  return <p><strong>total of { totals } exercises</strong></p>;
};

Total.propTypes = {
  total: PropTypes.array.isRequired,
};

export default Total;
