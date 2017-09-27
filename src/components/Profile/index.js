import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle } from 'material-ui/Card';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import axios from 'axios';

import CardPanel from '../ProfileCard';
import CardList from '../CardTable';

import SwdCard from '../../js/constructors/swcard';

/* eslint class-methods-use-this: 0 */
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        account: {
          city: null,
          country: null,
          display_name: '',
          email: '',
          first_name: '',
          id: '',
          last_name: '',
          rating: null,
          trade_notes: null,
        },
        cardData: [],
        haveList: [],
        wantList: [],
      },
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.getHaveListItems = this.getHaveListItems.bind(this);
    this.getWantListItems = this.getWantListItems.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`/api/account/${this.props.match.params.username}`).catch((error) => {
      if (error.response.status === 404) {
        this.props.history.push('/404');
      }
    });
    const cardDataResponse = response.data.cardData;
    const haveCardDataList = cardDataResponse.filter((card) => card.willing_to_trade === true);
    const wantCardDataList = cardDataResponse.filter((card) => card.want === true);
    const haveList = [];
    const wantList = [];
    let i;

    /* eslint-disable */
    /*TODO: Make this code better*/
    for (i = 0; i < haveCardDataList.length; i += 1) {
      let singleCardQuery = await axios.get(`/api/cards/${haveCardDataList[i].card_id}`);
      singleCardQuery = singleCardQuery.data;
      haveList.push(
          new SwdCard(singleCardQuery.data.name,
            haveCardDataList[i].quantity,
            singleCardQuery.data.position,
            singleCardQuery.data.rarity_name,
            singleCardQuery.data.set_code
          ));
    }

    for (i = 0; i < wantCardDataList.length; i += 1) {
      let singleCardQuery = await axios.get(`/api/cards/${wantCardDataList[i].card_id}`);
      singleCardQuery = singleCardQuery.data;
      wantList.push(
          new SwdCard(singleCardQuery.data.name,
            wantCardDataList[i].quantity,
            singleCardQuery.data.position,
            singleCardQuery.data.rarity_name,
            singleCardQuery.data.set_code
          ));
    }
    /* eslint-enable */
    const newStateObject = {
      account: response.data.account,
      cardData: response.data.cardData,
      haveList,
      wantList,
    };

    this.setState({
      data: newStateObject,
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log('Clicked!');
  }

  getWantListItems() {
    const wantListItems = this.state.data.wantList.map((card, index) =>
      <TableRow key={index}>
        <TableRowColumn>{card.name}</TableRowColumn>
        <TableRowColumn style={{ width: '22%' }}>x{card.quantity}</TableRowColumn>
        <TableRowColumn style={{ width: '35%' }}>
          <Chip backgroundColor={card.getRarityColor()}>{card.set}{card.number}</Chip>
        </TableRowColumn>
      </TableRow>,
    );
    return wantListItems;
  }

  getHaveListItems() {
    const haveListItems = this.state.data.haveList.map((card, index) =>
      <TableRow key={index}>
        <TableRowColumn >{card.name}</TableRowColumn>
        <TableRowColumn style={{ width: '22%' }}>x{card.quantity}</TableRowColumn>
        <TableRowColumn style={{ width: '35%' }}>
          <Chip backgroundColor={card.getRarityColor()}>{card.set}{card.number}</Chip>
        </TableRowColumn>
      </TableRow>,
    );
    return haveListItems;
  }

  render() {
    const style = { marginBottom: '25px' };
    return (
      <Grid fluid>
        <Row>
          <Col xs={0} sm={1} md={2} lg={3} />
          <Col xs>
            <CardPanel account={this.state.data.account} onClick={this.handleClick} />
          </Col>
          <Col xs={0} sm={1} md={2} lg={3} />
        </Row>
        <Row center="xs">
          <Col xs={0} sm={10} md={8} lg={5} >
            <Card style={{ marginTop: '50px', padding: '25px' }}>
              <CardTitle title="Have List" style={style}/>
              <CardList getListItems={this.getHaveListItems} showCheckboxes={false} />
            </Card>
          </Col>
          <Col xs={0} sm={10} md={8} lg={5} >
            <Card style={{ marginTop: '50px', padding: '25px' }}>
              <CardTitle title="Want List" style={style}/>
              <CardList getListItems={this.getWantListItems} showCheckboxes={false} />
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
