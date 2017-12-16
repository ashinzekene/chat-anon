import React, { Component } from "react";
import { Container, Loader, Dimmer, Segment, Grid } from "semantic-ui-react";
import { POLL_PAGE_LOADED, POLL_VOTED } from '../../actions/pollActions' 
import { CHANGE_HEADER, RESET_HEADER } from '../../actions/actionTypes' 
import { connect } from 'react-redux';
import agent from '../../agent'

const mapStateToProps = state => ({
  poll: state.poll
})

const mapDispatchToProps = dispatch => ({
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),
  loadPoll: (payload) => dispatch({ type: POLL_PAGE_LOADED, payload }),
  unload : (payload) => dispatch({ type: RESET_HEADER }),
  vote: (pollId, optionId) => dispatch({ type: POLL_VOTED, payload: agent.Poll.vote(pollId, optionId) })
})

class Poll extends Component {
  state = {
    selected: null,
    isSelected: false
  }
  componentDidMount() {
    this.props.loadPoll(agent.Poll.get(this.props.match.params.id))
  }
  componentDidReceiveProps(nextProp) {
    console.log("next prop", nextProp)
    if (nextProp.poll.question && nextProp.poll !== this.props.poll)
    nextProp.changeHeader({title: nextProp.poll.question, back: true })
  }
  selectOption = (option) => () =>  {
    this.setState({ selected: option.option, isSelected: true })
    this.props.vote(this.props.poll._id, option._id)
    console.log("You selected", option._id)
  }

  render() {
    const { poll } = this.props
    const { isSelected } = this.state
    if (!poll.question) {
      return (
        <Dimmer active page>
          <Loader content="Bringing the poll..." indeterminate size="huge" />
        </Dimmer>
      )
    }
    if (isSelected) {
      return (
        <h1>
          You have Selected { this.state.selected }
        </h1>
      )
    }
    return (
      <Container textAlign="center" color="purple">
        <h4>{ this.props.poll.comment }</h4>
        <Grid>
        { poll.options.map((option, i) => (
          <Grid.Column key={ "col"+i } width={ 8 } mobile={ 16 }>
            <Segment
              color="purple"
              style={ segmentStyle }
              padded
              raised
              content={ option.option }
              onClick={ this.selectOption(option) } 
              key={ i } 
              />
            </Grid.Column>
        )) }
        </Grid>
      </Container>
    );
  }
}

const segmentStyle = {
  margin: "20px",
  pointer: "cursor",
}
// const circleSegment = {
//   height: "200px",
//   margin: "auto",
//   width: "200px",
// } 

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
