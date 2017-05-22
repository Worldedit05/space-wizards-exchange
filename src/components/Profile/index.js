import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle } from 'material-ui/Card';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import CardPanel from '../ProfileCard';
import CardList from '../CardTable';

const cards = [
  {
    name: 'Luke Skywalker',
    number: 25,
    rarity: 'Legendary',
    set: 'AW',
  },
  {
    name: 'Han Solo',
    number: 30,
    rarity: 'Legendary',
    set: 'AW',
  },
  {
    name: 'Rey',
    number: 45,
    rarity: 'Starter',
    set: 'AW',
  },
];
/* eslint class-methods-use-this: 0 */
export default class Profile extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.getListItems = this.getListItems.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Clicked!');
  }

  getListItems() {
    const listItems = cards.map((card, index) =>
      <TableRow key={index}>
        <TableRowColumn>{card.name}</TableRowColumn>
        <TableRowColumn>{card.rarity}</TableRowColumn>
        <TableRowColumn>{card.set}</TableRowColumn>
        <TableRowColumn>{card.number}</TableRowColumn>
      </TableRow>,
    );
    console.log(listItems);
    return listItems;
  }

  render() {
    const style = { marginBottom: '25px' };
    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={2} />
          <Col xs>
            <CardPanel onClick={this.handleClick} />
          </Col>
          <Col xs={0} sm={1} md={2} lg={2} />
        </Row>
        <Row center="xs">
          <Col xs={0} sm={5} md={4} lg={4} >
            <Card style={{ marginTop: '50px', padding: '25px' }}>
              <CardTitle title="Have List" style={style}/>
              <CardList getListItems={this.getListItems} showCheckboxes={false} />
            </Card>
          </Col>
          <Col xs={0} sm={5} md={4} lg={4} >
            <Card style={{ marginTop: '50px', padding: '25px' }}>
              <CardTitle title="Want List" style={style}/>
              <CardList getListItems={this.getListItems} showCheckboxes={false} />
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
