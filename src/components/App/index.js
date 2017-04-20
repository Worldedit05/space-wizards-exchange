import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classnames from 'classnames';

import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    const { className } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={3} md={2} lg={1}>
            Hello, world!
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
