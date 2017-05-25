import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle } from 'material-ui/Card';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Chip from 'material-ui/Chip';

import CardPanel from '../ProfileCard';
import CardList from '../CardTable';

import SwdCard from '../../js/constructors/swcard';

const luke = new SwdCard('Luke Skywalker', 2, 25, 'legendary', 'AW');
const han = new SwdCard('Han Solo', 1, 30, 'legendary', 'AW');
const rey = new SwdCard('Rey', 3, 45, 'starter', 'AW');

const cards = [luke, han, rey];
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
        <TableRowColumn>x{card.quantity}</TableRowColumn>
        <TableRowColumn>
          <Chip backgroundColor={card.getRarityColor()}>{card.set}{card.number}</Chip>
        </TableRowColumn>
      </TableRow>,
    );
    return listItems;
  }

  render() {
    const style = { marginBottom: '25px' };
    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={3} />
          <Col xs>
            <CardPanel onClick={this.handleClick} />
          </Col>
          <Col xs={0} sm={1} md={2} lg={3} />
        </Row>
        <Row center="xs">
          <Col xs={0} sm={10} md={8} lg={5} >
            <Card style={{ marginTop: '50px', padding: '25px' }}>
              <CardTitle title="Have List" style={style}/>
              <CardList getListItems={this.getListItems} showCheckboxes={false} />
            </Card>
          </Col>
          <Col xs={0} sm={10} md={8} lg={5} >
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
