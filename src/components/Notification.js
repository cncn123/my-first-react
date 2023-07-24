const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.type === "info") {
    return <div className="info">{message.msg}</div>;
  } else {
    return <div className="error">{message.msg}</div>;
  }
};
export default Notification;
