import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 350,
  height: 'auto',
  width: 450,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Login extends Component {

  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0*/
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>
            <Paper style={style} zDepth={2} rounded>
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
            <Col xs={12}>
              <RaisedButton label="Register" primary={true} />
            </Col>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
