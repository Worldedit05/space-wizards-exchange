import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const SearchBarPaper = () => (
  <div>
    <Paper style={style} zDepth={2} />
  </div>
);

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
      <SearchBarPaper>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Full width"
          fullWidth={true}
        />
      </SearchBarPaper>
    );
  }
}
