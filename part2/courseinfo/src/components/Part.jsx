import PropTypes from 'prop-types';

const Part = ({ part, exercises }) => {
  return (
    <p>{ part } { exercises }</p>
  )
}

Part.propTypes = {
  part: PropTypes.string.isRequired,
  exercises: PropTypes.number.isRequired,
}

export default Part