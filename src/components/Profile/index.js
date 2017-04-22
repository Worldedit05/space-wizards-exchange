import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Card from '../ProfileCard';

export default class Profile extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={2} />
          <Col xs>
            <Card />
          </Col>
          <Col xs={0} sm={1} md={2} lg={2} />
        </Row>
      </Grid>
    );
  }
}
