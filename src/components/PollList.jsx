import React, { Component } from 'react';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

import  PollPreview from "./PollPreview";
import Async from '../HOCs/Async'

class PollList extends Component {
  selectPoll = poll => () => this.props.selectPoll(poll)
  render() {
    return (
      <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
        {
          this.props.polls.map((poll, ind) => (
            <PollPreview onClick={ this.selectPoll(poll) } key={ind} { ...poll } />
          ))
        }
      </CardGroup>
    )
  }
}

export default Async('polls')(PollList);