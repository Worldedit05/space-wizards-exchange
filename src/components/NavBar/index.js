import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

import style from './style.css';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  render() {
    const { className } = this.props;
    return (
      <Toolbar className="appBar">
        <ToolbarGroup>
          <ToolbarTitle text="Star Wars Destiny Trader" className="title"/>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <FlatButton label="Login" primary={true} labelPosition="before" icon={<FontIcon className="material-icons">call_to_action</FontIcon>}/>
        </ ToolbarGroup>
      </Toolbar>
    );
  }
}
