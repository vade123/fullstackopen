import { Alert } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  if (props.notification === '') {
    return null;
  }
  return (
    <Alert severity={props.notification.color}>
      {props.notification.text}
    </Alert>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;