import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import SearchBar from '../SearchBar';

import './style.css';

const style = {
  padding: '10%',
  textAlign: 'center',
  // backgroundColor: '#dcdee1',
};

const welcomeText = 'Welcome to Star Wars Destiny Trader. Use the search above to locate willing to trade lists from other users!';

class App extends Component {
  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0*/
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Paper style={style} zDepth={0} rounded>
              <Row>
                <Col xs={12}>
                  <SearchBar />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p>{welcomeText}</p>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
