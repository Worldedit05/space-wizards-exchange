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

    this.state = {
      email: '',
      emailValid: false,
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      verifyPassword: '',
      passwordValid: false,
      formValid: false,
      formErrors: { email: '', password: '', verifyPassword: '', userName: '' },
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
      emailValid: false,
      userName: '',
      userNameValid: false,
      firstName: '',
      firstNameValid: false,
      lastName: '',
      lastNameValid: false,
      password: '',
      verifyPassword: '',
      passwordValid: false,
      formValid: false,
      formErrors: { email: '', password: '', verifyPassword: '', firstName: '', lastName: '', userName: '' },
    });
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    const minPasswordLength = 6;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let lastNameValid = this.state.lastNameValid;
    let firstNameValid = this.state.firstNameValid;
    let userNameValid = this.state.userNameValid;
    let regex = null;

    switch (fieldName) {
      case 'lastName' :
        if (value) {
          lastNameValid = true;
        } else {
          lastNameValid = false;
        }
        fieldValidationErrors.lastName = lastNameValid ? '' : 'This field is required';
        break;
      case 'firstName' :
        if (value) {
          firstNameValid = true;
        } else {
          firstNameValid = false;
        }
        fieldValidationErrors.firstName = firstNameValid ? '' : 'This field is required';
        break;
      case 'userName' :
        if (value) {
          userNameValid = true;
        } else {
          userNameValid = false;
        }
        fieldValidationErrors.userName = userNameValid ? '' : 'This field is required';
        break;
      case 'email':
        regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        emailValid = regex.test(value);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= minPasswordLength
                        && validatePasswords(value, this.state.verifyPassword);

        fieldValidationErrors.password = passwordValid
          ? ''
          : 'Password needs to be at least 6 characters long and match second entry';
        break;
      case 'verifyPassword':
        passwordValid = value.length >= minPasswordLength && value === this.state.password;
        fieldValidationErrors.verifyPassword = passwordValid
          ? ''
          : 'Password needs to be at least 6 characters long and match previous entry';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      lastNameValid,
      firstNameValid,
      userNameValid,
    },
    this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid
                                && this.state.passwordValid
                                && this.state.verifyPassword !== ''
                                && this.state.lastNameValid
                                && this.state.firstNameValid
                                && this.state.userNameValid });
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
                    errorText={this.state.emailValid ? '' : this.state.formErrors.email}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Username"
                    id="text-field-username"
                    name="userName"
                    errorText={this.state.userNameValid ? '' : this.state.formErrors.userName}
                    value={this.state.userName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="First Name"
                    id="text-field-firstname"
                    name="firstName"
                    errorText={this.state.firstNameValid ? '' : this.state.formErrors.firstName}
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Last Name"
                    id="text-field-lastname"
                    name="lastName"
                    errorText={this.state.lastNameValid ? '' : this.state.formErrors.lastName}
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
                    errorText={this.state.passwordValid ? '' : this.state.formErrors.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                  <TextField
                    floatingLabelText="Verify Password"
                    id="text-field-password"
                    name="verifyPassword"
                    value={this.state.verifyPassword}
                    errorText={this.state.passwordValid ? '' : this.state.formErrors.verifyPassword}
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
                      disabled={!this.state.formValid}
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
