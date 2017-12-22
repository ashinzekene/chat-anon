import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POLL_SELECTED } from '../actions';
import  PollPreview from "./PollPreview";
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

const mapDispatchToProps = dispatch => ({
  selectPoll: (poll) => dispatch({ type: POLL_SELECTED, poll }),
})

class PollList extends Component {
  componentDidMount() {
    this.props.onLoad()
  }
  selectPoll = poll => () => this.props.selectPoll(poll)
  render() {
    if (this.props.polls && this.props.polls.length) {
      return (
        <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
          {
            this.props.polls.map((poll, ind) => (
              <PollPreview onClick={ this.selectPoll(poll) } key={ind} { ...poll } />
            ))
          }
        </CardGroup>
      )
    } else {
      return (
        <div>
          <h3>Here you will find your list of polls</h3>
        </div>
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(PollList);