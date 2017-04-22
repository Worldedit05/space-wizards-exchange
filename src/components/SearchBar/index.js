import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

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
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
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
