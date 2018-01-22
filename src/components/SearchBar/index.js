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
  };

  handleUpdateInput = (value) => {
    const resultsArry = [];

    if (value === '') {
      return;
    }


    axios.get(`/api/search?q=${value}`).then((response) => {
      response.data.forEach((card) => {
        resultsArry.push(`${card.name} ${card.subtitle ? card.subtitle : ''} - ${card.set_name} #${card.position} - ${card.affiliation_name} - ${toTitleCase(card.faction_code)}`);
      });
      this.setState({
        dataSource: resultsArry,
      });
    });
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
