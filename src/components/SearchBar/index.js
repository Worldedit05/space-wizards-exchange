import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';

const toTitleCase = require('../../../server/helpers/title_case');

const style = {
  marginBottom: '20px',
};
/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class SearchBar extends Component {
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    const resultsArry = [];

    if (value === '') {
      return;
    }

    axios.get(`/search?q=${value}`).then((response) => {
      response.data.forEach((card) => {
        resultsArry.push(`${card.data.name} ${card.data.subtitle ? card.data.subtitle : ''} - #${card.data.position} - ${card.data.set_name} - ${card.data.affiliation_name} - ${toTitleCase(card.data.faction_code)}`);
      });
      this.setState({
        dataSource: resultsArry,
      });
    });
  };

  render() {
    return (
      <AutoComplete
          style={style}
          hintText="Type in a card name"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Card Search"
          fullWidth={true}
        />
    );
  }
}
