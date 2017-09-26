import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlue600 } from 'material-ui/styles/colors';
import axios from 'axios';

import FieldInfo from './field_info';
import Buttons from './buttons';
import MessageDialog from './messageDialog';

const toTitleCase = require('../../helpers/title_case');

const panelStyle = {
  marginTop: 350,
  height: 'auto',
  width: 450,
  textAlign: 'center',
  display: 'inline-block',
};

const style = {
  underlineStyle: {
    borderColor: lightBlue600,
  },
  floatingLabelFocusStyle: {
    color: lightBlue600,
  },
};

const dividerStyle = {
  marginTop: 15,
};

const validatePasswords = (firstPasswordField, secondPasswordField) => {
  if (secondPasswordField === '') {
    return true;
  }
  return firstPasswordField === secondPasswordField;
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      verifyPassword: '',
      validation: {
        isEmailValid: false,
        isFirstNameValid: false,
        isLastNameValid: false,
        isPasswordValid: false,
      },
      isFormValid: false,
      formErrorMessages: { email: '', password: '', verifyPassword: '', firstName: '', lastName: '' },
      data: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value.trim();
    const name = target.name;
    this.setState({
      [name]: value },
    () => { this.validateField(name, value); });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/account/setup', this.state)
      .then((response) => {
        if (response.data.success === true) {
          this.setState({
            openDialog: true,
            message: response.data.message,
          });
        }
      });
  }

  handleReset = (event) => {
    event.preventDefault();
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      verifyPassword: '',
      validation: {
        isEmailValid: false,
        isFirstNameValid: false,
        isLastNameValid: false,
        isPasswordValid: false,
      },
      isFormValid: false,
      formErrorMessages: { email: '', password: '', verifyPassword: '', firstName: '', lastName: '' },
      data: null,
    });
  }

  async validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrorMessages;
    const minPasswordLength = 6;
    let isEmailValid = this.state.validation.isEmailValid;
    let isPasswordValid = this.state.validation.isPasswordValid;
    let isLastNameValid = this.state.validation.isLastNameValid;
    let isFirstNameValid = this.state.validation.isFirstNameValid;
    let regex;

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
      validation: {
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
        isPasswordValid,
      },
    },
    this.validateForm);
  }

  validateForm() {
    this.setState({ isFormValid: this.state.validation.isEmailValid
                                && this.state.validation.isPasswordValid
                                && this.state.verifyPassword !== ''
                                && this.state.validation.isLastNameValid
                                && this.state.validation.isFirstNameValid });
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
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                    underlineFocusStyle={style.underlineStyle}
                    id="text-field-email"
                    name="email"
                    value={this.state.email}
                    errorText={this.state.validation.isEmailValid ? '' : this.state.formErrorMessages.email}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="First Name"
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                    underlineFocusStyle={style.underlineStyle}
                    id="text-field-firstname"
                    name="firstName"
                    errorText={this.state.validation.isFirstNameValid ? '' : this.state.formErrorMessages.firstName}
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Last Name"
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                    underlineFocusStyle={style.underlineStyle}
                    id="text-field-lastname"
                    name="lastName"
                    errorText={this.state.validation.isLastNameValid ? '' : this.state.formErrorMessages.lastName}
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <TextField
                    floatingLabelText="Password"
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                    underlineFocusStyle={style.underlineStyle}
                    id="text-field-password"
                    name="password"
                    value={this.state.password}
                    errorText={this.state.validation.isPasswordValid ? '' : this.state.formErrorMessages.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                  <TextField
                    floatingLabelText="Verify Password"
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                    underlineFocusStyle={style.underlineStyle}
                    id="text-field-password"
                    name="verifyPassword"
                    value={this.state.verifyPassword}
                    errorText={this.state.validation.isPasswordValid ? '' : this.state.formErrorMessages.verifyPassword}
                    onChange={this.handleChange}
                    type="password"
                  />
                </Col>
                <Buttons disabled={this.state.isFormValid} reset={this.handleReset}/>
                <FieldInfo data={this.state.data}/>
                <MessageDialog open={this.state.openDialog} message={this.state.message} />
              </form>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
