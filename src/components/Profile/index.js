import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Card from '../ProfileCard';

/*eslint class-methods-use-this: 0 */
export default class Profile extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Edit button has been clicked!');
  }

  render() {
    const { match, location, history } = this.props;
    console.log(location);
    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={2} />
          <Col xs>
            <Card />
          </Col>
          <Col xs={0} sm={1} md={2} lg={2} />
        </Row>
        <Row center="xs">
          <Col xs/>
          <Col xs>
            <FloatingActionButton style={{ margin: '20px' }} onClick={this.handleClick} >
              <ContentAdd />
            </FloatingActionButton>
          </Col>
          <Col xs/>
        </Row>
      </Grid>
    );
  }
}
