import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const { type, body } = message;
  const [classUser, setClassUser] = useState('');

  useEffect(() => {
    setClassUser('');
    const timer = setTimeout(() => {
      setClassUser('hide');
    }, 2000);

    return () => clearTimeout(timer);
  }, [body]);


  return <>
    { message.body !== '' && (
      <div className={ `notification ${type} ${classUser}` }>{ body }</div>
    ) }
  </>;
};

Notification.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired
};

export default Notification;
