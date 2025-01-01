import PropTypes from 'prop-types';
import Part from './Part';

const Content = ({ info }) => {
  return (
    info.map((part, index) => (
      <Part key={ index } part={ part.title } exercises={ part.exercises } />
    ))
  );
};

Content.propTypes = {
  info: PropTypes.array.isRequired,
};

export default Content;
