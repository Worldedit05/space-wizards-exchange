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
  constructor(props) {
    super(props);
    this.state = {
      userSelection: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.handleTermSelection = this.handleTermSelection.bind(this);
  }

  handleTermSelection(userSelection) {
    console.log(userSelection);
    this.setState({ userSelection });
  }

  render() {
    const { className } = this.props; /* eslint no-unused-vars: 0 */
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={12} md={10} lg={8}>
            <Paper style={style} zDepth={0} rounded>
              <Row>
                <Col xs={12}>
                  <SearchBar onTermSelection={this.handleTermSelection}/>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p>{welcomeText}</p>
                </Col>
              </Row>
              <Row>
                {this.state.userSelection}
              </Row>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
