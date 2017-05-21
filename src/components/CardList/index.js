import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Grid, Row, Col } from 'react-flexbox-grid';

const cards = ['luke', 'han', 'rey', 'leia', 'vader'];

/* eslint class-methods-use-this: 0 */
export default class CardList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listItems = cards.map((card) =>
      <ListItem
        primaryText={card}
      />,
    );
    return (
      <Grid fluid>
        <Row>
          <Col xs>
            <List>
              {listItems}
            </List>
          </Col>
        </Row>
      </Grid>
    );
  }
}
