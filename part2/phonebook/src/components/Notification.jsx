const Notification = ({ message }) => {
  return <div className={message.type}>{message.body}</div>;
};

export default Notification;
