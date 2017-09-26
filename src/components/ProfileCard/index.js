import React from 'react';
import { Card, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

const style = {
  titleStyle: {
    fontSize: '1.6vw',
  },
  cardTitleStyle: {
    height: '50%',
  },
};

const ProfileCard = (props) => {
  const account = props.account;

  return (
    <Card style={{ marginTop: '50px', paddingTop: '25px' }}>
      <Grid fluid>
        <Row>
          <Col xs={6} sm={4} md={4} lg={4}>
            <CardMedia overlay={
              <CardTitle title={account.display_name}
                onClick={props.onClick}
                style={style.cardTitleStyle}
                titleStyle={style.titleStyle}/>
            }>
              <img src="http://placehold.it/300x300" alt={account.display_name} />
            </ CardMedia>
          </ Col>
          <Col xs>
            <CardText>
              <List>
                <ListItem primaryText="Rating" secondaryText="7 positive trades" leftIcon={<FontIcon className="material-icons">thumb_up</FontIcon>} />
                <ListItem primaryText="Location" secondaryText="Austin, TX" onClick={props.onClick} leftIcon={<FontIcon className="material-icons">place</FontIcon>}/ >
              </List>
            </CardText>
          </ Col>
        </Row>
      </Grid>
      <Divider style={{ marginTop: '25px' }} />
      <CardTitle title="Trade Notes" />
      <CardText onClick={props.onClick}>
        <p>Special card or trade instructions go here</p>
      </CardText>
    </Card>
  );
};

export default ProfileCard;
