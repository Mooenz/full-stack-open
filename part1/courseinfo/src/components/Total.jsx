import PropTypes from 'prop-types';

const Total = ({ total }) => {
  const totals = total.map((part) => part.exercises).reduce((a, b) => a + b);
  return <p>Number of exercises { totals }</p>;
};

Total.propTypes = {
  total: PropTypes.array.isRequired,
};

export default Total;
