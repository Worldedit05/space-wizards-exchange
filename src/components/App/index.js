import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Card from '../Card';
import SearchBar from '../SearchBar';

import './style.css';

class App extends Component {
  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0*/
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card />
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <SearchBar />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
