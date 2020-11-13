import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    color: props.notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  };
  if (props.notification === '') {
    return null;
  }
  return (
    <div className='error' style={style}>
      {props.notification.text}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;