import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';

const toTitleCase = require('../../helpers/title_case');

const style = {
  marginBottom: '20px',
};
/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
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

    axios.get(`/search?q=${value}`).then((response) => {
      response.data.forEach((card) => {
        resultsArry.push(`${card.data.name} ${card.data.subtitle ? card.data.subtitle : ''} - ${card.data.set_name} #${card.data.position} - ${card.data.affiliation_name} - ${toTitleCase(card.data.faction_code)}`);
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
          onNewRequest={this.handleSelection}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Card Search"
          fullWidth={true}
        />
    );
  }
}
