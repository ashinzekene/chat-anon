import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import agent from '../../agent';
import { POLL_LIST_LOADED, POLL_SELECTED } from '../../actions/pollActions';
import  PollSegment from "./PollSegment";

const mapStateToProps = state => ({
  polls: state.pollList
})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: POLL_LIST_LOADED, payload }),
})

class PollList extends Component {
  componentDidMount() {
    agent.Poll._getAll().then(res => {
      this.props.onLoad(res)
    });
  }
  render() {
    return (
      <Container text= { true }>
        {
          this.props.polls.map((poll, ind) => (
            <PollSegment key={ind} { ...poll } />
          ))
        }
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollList);