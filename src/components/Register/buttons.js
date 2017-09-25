import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlue600 } from 'material-ui/styles/colors';

const buttonStyle = {
  marginTop: 30,
  marginBottom: 30,
};

export default class Buttons extends React.Component {
  render() {
    return (
      <Row center="xs">
        <Col xs={4}>
          <RaisedButton
            onClick={this.handleSubmit}
            type="submit"
            label="Register"
            style={buttonStyle}
            backgroundColor={lightBlue600}
            disabled={!this.props.disabled} />
        </Col>
        <Col xs={4}>
          <RaisedButton
            onClick={this.props.reset}
            label="Reset"
            style={buttonStyle}
            primary={false} />
        </Col>
      </Row>
    );
  }
}
