import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import agent from '../agent';
import { CIRCLE_LIST_LOADED, CIRCLE_SELECTED } from '../actions/circleActions';
import  CirclePreview from "./CirclePreview";

const mapStateToProps = state => ({
  circles: state.circleList
})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: CIRCLE_LIST_LOADED, payload }),
  onSelect: (circle) => dispatch({ type: CIRCLE_SELECTED, circle }),
})

class CircleList extends Component {
  componentDidMount() {
    agent.Circle._getAll().then(res => {
      this.props.onLoad(res)
    });
  }

  selectPoll = circle => () => this.props.onSelect(circle)
  
  render() {
    if (this.props.circles && this.props.circles.length) {
      return (
        <Container text= { true } >
          {
            this.props.circles.map((circle, ind) => (
              <CirclePreview onClick={ this.selectPoll(circle) } key={ind} { ...circle } />
            ))
          }
        </Container>
      )
    } else {
      return (
        <div>
          <h3>Here you will find your list of circles</h3>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleList);