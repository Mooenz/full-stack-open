import PropTypes from 'prop-types';

const Header = ({ course }) => {
  return <h2>{ course }</h2>;
};

Header.propTypes = {
  course: PropTypes.string.isRequired,
};

export default Header;
