import React, { Component } from 'react';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

import  PollPreview from "./PollPreview";
import Async from '../HOCs/Async'
import { APP_NAME } from '../actions/index';

class PollList extends Component {
  constructor(props) {
    super(props)
    this.selectPoll = this.selectPoll.bind(this)
  }
  selectPoll(poll) {
    return () => this.props.selectPoll(poll)
  }
  componentDidMount(){
    this.props.changeHeader({ title: APP_NAME, back: false })
  }
  
  render() {
    let { polls } = this.props
    if(polls.length === 0) {
      return (
        <h3 style={{ textAlign: "center", paddingTop: "40px" }}>You presently do not have any polls to participate in. You can create one using a circle</h3>
      )
    }
    return (
      <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
        {
          polls.map((poll, ind) => (
            <PollPreview onClick={ this.selectPoll(poll) } key={ind} { ...poll } />
          ))
        }
      </CardGroup>
    )
  }
}

export default Async('polls')(PollList);