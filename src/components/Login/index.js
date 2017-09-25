import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlue600 } from 'material-ui/styles/colors';

const style = {
  marginTop: 300,
  height: 200,
  width: 400,
  textAlign: 'center',
  display: 'inline-block',
  label: {
    text: '#FFF',
  },
};

export default class Login extends Component {
  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0 */
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>
            <Paper style={style} zDepth={2} rounded>
              <Col xs={12}>
                <TextField
                  hintText="johndoe@gmail.com"
                  floatingLabelText="Username/Email"
                />
              </Col>
              <Col xs={12}>
                <TextField
                  hintText="***********"
                  floatingLabelText="Password"
                  type="password"
                />
              </Col>
              <Col xs={12}>
                <RaisedButton label="Login" backgroundColor={lightBlue600} labelColor={style.label.text}/>
              </Col>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
