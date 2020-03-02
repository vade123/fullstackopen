import React from 'react';

const Notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;