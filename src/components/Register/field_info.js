import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import { red600, lightBlue600 } from 'material-ui/styles/colors';

const infoFieldRuleStyle = {
  width: '60%',
  marginLeft: '20%',
  marginBottom: 20,
  textAlign: 'center',
  backgroundColor: lightBlue600,
};

const errorFieldRuleStyle = {
  width: '60%',
  marginLeft: '20%',
  marginBottom: 20,
  textAlign: 'center',
  backgroundColor: red600,
};

export default class FieldInfo extends React.Component {
  render() {
    const infoMessages = ['Fields cannot contain spaces'];
    const errorMessages = [];
    let errorListItems;

    const infoListItems = infoMessages.map((message, index) =>
      <ListItem key={index} primaryText={message} leftIcon={<FontIcon className="material-icons" color={'white'}>info</FontIcon>} style = {{ color: 'white', fontSize: '14px' }}/>,
    );

    if (this.props.data !== null && this.props.data.success === false) {
      errorMessages.push(this.props.data.message);

      errorListItems = errorMessages.map((message, index) =>
        <ListItem key={index} primaryText={message} leftIcon={<FontIcon className="material-icons" color={'white'}>warning</FontIcon>} style = {{ color: 'white', fontSize: '14px' }}/>,
      );

      return (
        <div>
          <Paper style={errorFieldRuleStyle} zDepth={1}>
            <List>
              {errorListItems}
            </List>
          </Paper>
          <Paper style={infoFieldRuleStyle} zDepth={1}>
            <List>
              {infoListItems}
            </List>
          </Paper>
        </div>
      );
    }

    return (
      <Paper style={infoFieldRuleStyle} zDepth={1}>
        <List>
          {infoListItems}
        </List>
      </Paper>
    );
  }
}
