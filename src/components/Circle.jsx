import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  circle: state.circle
})

class Circle extends Component {
  componentWillLoad() {
    
  }
  render() {
    return (
      <Container text= { true } textAlign="center" >
        Hello this is a container for circles
      </Container>
    )
  }
};

export default Circle;
