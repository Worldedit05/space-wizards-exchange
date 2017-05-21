import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Card from '../ProfileCard';
import CardList from '../CardList';

/* eslint class-methods-use-this: 0 */
export default class Profile extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Clicked!');
  }

  render() {
    const { match, location, history } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={2} />
          <Col xs>
            <Card onClick={this.handleClick} />
          </Col>
          <Col xs={0} sm={1} md={2} lg={2} />
        </Row>
        <Row center="xs">
          <Col xs/>
            <CardList />
          <Col xs/>
        </Row>
      </Grid>
    );
  }
}
