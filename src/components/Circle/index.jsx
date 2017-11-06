import React, { Component } from "react";
import { Container } from "semantic-ui-react";
// import { connect } from 'react-redux'
// import { CIRCLE_PAGE_LOADED, CIRCLE_PAGE_UNLOADED } from '../actions/circleActions'

// const mapStateToProps = state => ({
//   circle: state.circle
// })

// const mapDispatchToProps = dispatch => ({
//   pageLoaded: (payload) => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
//   pageUnloaded: () => dispatch({ type: CIRCLE_PAGE_UNLOADED })
// })

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
