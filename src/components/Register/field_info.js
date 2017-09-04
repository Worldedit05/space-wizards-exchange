import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const fieldRuleStyle = {
  width: '60%',
  marginLeft: '20%',
  marginBottom: 20,
  textAlign: 'center',
  backgroundColor: 'rgb(0, 188, 212)',
};

export default class FieldInfo extends React.Component {
  render() {
    return (
      <Paper style={fieldRuleStyle} zDepth={1}>
        <List>
          <ListItem primaryText="Fields cannot contain spaces" leftIcon={<FontIcon className="material-icons" color={'white'}>info</FontIcon>} style = {{ color: 'white', fontSize: '14px' }}/>
        </List>
      </Paper>
    );
  }
}
