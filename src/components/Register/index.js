import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const panelStyle = {
  marginTop: 350,
  height: 'auto',
  width: 450,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  marginTop: 30,
  marginBottom: 30,
};

const dividerStyle = {
  marginTop: 15,
};

export default class Login extends Component {

  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0*/
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>
            <Paper style={panelStyle} zDepth={2} rounded>
            <Col xs={12}>
            <TextField
                  floatingLabelText="Email"
                />
            </Col>
            <Col xs={12}>
            <TextField
                  floatingLabelText="First Name"
                />
            </Col>
            <Col xs={12}>
            <TextField
                  floatingLabelText="Last Name"
                />
            </Col>
            <Col xs={12}>
            <TextField
                  floatingLabelText="Password"
                />
            <TextField
                  floatingLabelText="Password Again"
                />
            </Col>
            <Row center="xs">
              <Col xs={4}>
                <RaisedButton label="Register" style={buttonStyle} primary={true} />
              </Col>
              <Col xs={4}>
                <RaisedButton label="Cancel" style={buttonStyle} primary={false} />
              </Col>
            </Row>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
