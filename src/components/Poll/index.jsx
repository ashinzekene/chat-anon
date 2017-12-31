import React, { Component } from "react";
import { Container, Loader, Dimmer, Segment, Grid } from "semantic-ui-react";
import { POLL_PAGE_LOADED, POLL_VOTED } from '../../actions' 
import { RESET_HEADER } from '../../actions' 
import { connect } from 'react-redux';
import agent from '../../agent'
import Progress from "semantic-ui-react/dist/commonjs/modules/Progress/Progress";

const mapStateToProps = state => ({
  poll: state.poll
})

const mapDispatchToProps = dispatch => ({
  loadPoll: (payload) => dispatch({ type: POLL_PAGE_LOADED, payload }),
  unload : (payload) => dispatch({ type: RESET_HEADER }),
  vote: (pollId, optionId) => dispatch({ type: POLL_VOTED, payload: agent.Poll.vote(pollId, optionId) })
})

class Poll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      isSelected: false
    }
    this.vote = this.vote.bind(this)
  }
  componentDidMount() {
    this.props.loadPoll(agent.Poll.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProp) {
    // this.props.changeHeader({ title: "APP_NAME", back: true })
    if (nextProp.poll.question && nextProp.poll !== this.props.poll) {
      nextProp.changeHeader({title: nextProp.poll.question, back: true })
    }
  }
  vote = (option) => () =>  {
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
    if (isSelected || poll.hasVoted) {
      return (
        <Stats poll={ poll } />
      )
    }
    return (
      <Container className="main-poll" textAlign="center">
        <h2 style={{ paddingTop: "20px", paddingBottom: "30px" }} >{ this.props.poll.comment }</h2>
        <Grid>
        { poll.options && poll.options.map((option, i) => (
          <Grid.Column key={ "col-"+i } width={ 8 } mobile={ 16 }>
            <Segment
              style={ segmentStyle }
              padded
              raised
              content={ option.option }
              onClick={ this.vote(option) } 
              key={ i } 
              />
            </Grid.Column>
        )) }
        </Grid>
      </Container>
    );
  }
}

const Stats = props => {
  let total = props.poll.options && props.poll.options.reduce((ini, opt) => ini + opt.votes, 0)
  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ paddingTop: "20px", paddingBottom: "30px" }} >{ props.poll.comment }</h2>
      { props.poll.options && props.poll.options.map((option, i) => (
        <Progress key={i} content={ option.option } precision={2} value={ option.votes } progress total={ total } />
      )) }
    </div>
  )
}

const segmentStyle = {
  cursor: "pointer",
}


export default connect(mapStateToProps, mapDispatchToProps)(Poll);
