import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import { NavLink } from 'react-router-dom';

import style from './style.css'; /* eslint no-unused-vars: 0*/

export default class NavBar extends React.Component {

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
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <ToolbarTitle text="Star Wars Destiny Trader" className="title"/>
          </NavLink>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <FlatButton
            href="/login"
            style={{ margin: '0' }}
            label="Login"
            primary={true}
            labelPosition="before"
            icon={<FontIcon className="material-icons">call_to_action</FontIcon>}/>
        </ ToolbarGroup>
      </Toolbar>
    );
  }
}
