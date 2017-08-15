import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const toTitleCase = require('../../helpers/title_case');

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

function validatePasswords(firstPasswordField, secondPasswordField) {
  if (secondPasswordField === '') {
    return true;
  }
  return firstPasswordField === secondPasswordField;
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    // ********************************************************************
    // TODO: collect validation into a single propery on this state object
    // ********************************************************************
    this.state = {
      email: '',
      isEmailValid: false,
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      verifyPassword: '',
      isPasswordValid: false,
      isFormValid: false,
      formErrorMessages: { email: '', password: '', verifyPassword: '', userName: '' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value },
    () => { this.validateField(name, value); });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/account/setup', this.state)
      .then((response) => {
        console.log(response);
      });
  }

  handleReset = (event) => {
    this.setState({
      email: '',
      isEmailValid: false,
      userName: '',
      isUserNameValid: false,
      firstName: '',
      isFirstNameValid: false,
      lastName: '',
      isLastNameValid: false,
      password: '',
      verifyPassword: '',
      isPasswordValid: false,
      isFormValid: false,
      formErrorMessages: { email: '', password: '', verifyPassword: '', firstName: '', lastName: '', userName: '' },
    });
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrorMessages;
    const minPasswordLength = 6;
    let isEmailValid = this.state.isEmailValid;
    let isPasswordValid = this.state.isPasswordValid;
    let isLastNameValid = this.state.isLastNameValid;
    let isFirstNameValid = this.state.isFirstNameValid;
    let isUserNameValid = this.state.isUserNameValid;
    let regex = null;

    switch (fieldName) {
      case 'lastName' :
        if (value) {
          isLastNameValid = true;
        } else {
          isLastNameValid = false;
        }
        fieldValidationErrors.lastName = isLastNameValid ? '' : 'This field is required';
        break;
      case 'firstName' :
        if (value) {
          isFirstNameValid = true;
        } else {
          isFirstNameValid = false;
        }
        fieldValidationErrors.firstName = isFirstNameValid ? '' : 'This field is required';
        break;
      case 'userName' :
        if (value) {
          isUserNameValid = true;
        } else {
          isUserNameValid = false;
        }
        fieldValidationErrors.userName = isUserNameValid ? '' : 'This field is required';
        break;
      case 'email':
        regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        isEmailValid = regex.test(value);
        fieldValidationErrors.email = isEmailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        isPasswordValid = value.length >= minPasswordLength
                        && validatePasswords(value, this.state.verifyPassword);

        fieldValidationErrors.password = isPasswordValid
          ? ''
          : 'Password needs to be at least 6 characters long and match second entry';
        break;
      case 'verifyPassword':
        isPasswordValid = value.length >= minPasswordLength && value === this.state.password;
        fieldValidationErrors.verifyPassword = isPasswordValid
          ? ''
          : 'Password needs to be at least 6 characters long and match previous entry';
        break;
      default:
        break;
    }
    this.setState({
      formErrorMessages: fieldValidationErrors,
      isEmailValid,
      isPasswordValid,
      isLastNameValid,
      isFirstNameValid,
      isUserNameValid,
    },
    this.validateForm);
  }

  validateForm() {
    this.setState({ isFormValid: this.state.isEmailValid
                                && this.state.isPasswordValid
                                && this.state.verifyPassword !== ''
                                && this.state.isLastNameValid
                                && this.state.isFirstNameValid
                                && this.state.isUserNameValid });
    console.log(this.state);
  }

  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0 */
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>
            <Paper style={panelStyle} zDepth={1} rounded>
              <form onSubmit={this.handleSubmit}>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Email"
                    id="text-field-email"
                    name="email"
                    value={this.state.email}
                    errorText={this.state.isEmailValid ? '' : this.state.formErrorMessages.email}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Username"
                    id="text-field-username"
                    name="userName"
                    errorText={this.state.isUserNameValid ? '' : this.state.formErrorMessages.userName}
                    value={this.state.userName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="First Name"
                    id="text-field-firstname"
                    name="firstName"
                    errorText={this.state.isFirstNameValid ? '' : this.state.formErrorMessages.firstName}
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Last Name"
                    id="text-field-lastname"
                    name="lastName"
                    errorText={this.state.isLastNameValid ? '' : this.state.formErrorMessages.lastName}
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Password"
                    id="text-field-password"
                    name="password"
                    value={this.state.password}
                    errorText={this.state.isPasswordValid ? '' : this.state.formErrorMessages.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                  <TextField
                    floatingLabelText="Verify Password"
                    id="text-field-password"
                    name="verifyPassword"
                    value={this.state.verifyPassword}
                    errorText={this.state.isPasswordValid ? '' : this.state.formErrorMessages.verifyPassword}
                    onChange={this.handleChange}
                    type="password"
                  />
                </Col>
                <Row center="xs">
                  <Col xs={4}>
                    <RaisedButton
                      onClick={this.handleSubmit}
                      type="submit"
                      label="Register"
                      style={buttonStyle}
                      disabled={!this.state.isFormValid}
                      primary={true} />
                  </Col>
                  <Col xs={4}>
                    <RaisedButton
                      onClick={this.handleReset}
                      label="Reset"
                      style={buttonStyle}
                      primary={false} />
                  </Col>
                </Row>
              </form>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
