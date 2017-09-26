import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';

class MessageDialog extends React.Component {
  handleClose = () => {
    this.props.history.push('/login');
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Email sent"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(MessageDialog);
