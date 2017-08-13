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

const welcomeText = 'Welcome to Star Wars Destiny Trader. Use the search above to locate willing to trade lists from other users! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
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
