import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import './App';

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    )
  }
}

export default App;