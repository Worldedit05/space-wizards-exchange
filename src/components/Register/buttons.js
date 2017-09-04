import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';

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
            disabled={!this.props.disabled}
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
    );
  }
}
