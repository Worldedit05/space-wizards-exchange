import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';

const toTitleCase = require('../../helpers/title_case');

const style = {
  marginBottom: '20px',
};

export default class SearchBar extends Component {
  state = {
    dataSource: [],
    value: '',
    lastKeypressTimeStamp: 0,
  };

  handleUpdateInput = (value) => {
    const resultsArry = [];

    if (value === '') {
      return;
    }

    document.onkeydown = (event) => {
      if (event.timeStamp - this.state.lastKeypressTimeStamp > 200) {
        // TODO: Need to move this over to Redis
        axios.get(`/api/search?q=${value}`).then((response) => {
          response.data.forEach((card) => {
            resultsArry.push(`${card.data.name} ${card.data.subtitle ? card.data.subtitle : ''} - ${card.data.set_name} #${card.data.position} - ${card.data.affiliation_name} - ${toTitleCase(card.data.faction_code)}`);
          });
          this.setState({
            dataSource: resultsArry,
          });
        });
      }
      this.setState({
        lastKeypressTimeStamp: event.timeStamp,
      });
    };
  };

  handleSelection = (value) => {
    this.setState({ value });
    this.props.onTermSelection(value);
  }

  render() {
    return (
      <AutoComplete
        style={style}
        hintText="Type in a card name"
        dataSource={this.state.dataSource}
        filter={AutoComplete.caseInsensitiveFilter}
        onNewRequest={this.handleSelection}
        onUpdateInput={this.handleUpdateInput}
        floatingLabelText="Card Search"
        fullWidth={true}
      />
    );
  }
}
