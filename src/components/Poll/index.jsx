import React, { Component } from "react";
import { Container, Item, Loader, Dimmer, Form, Checkbox } from "semantic-ui-react";
import { POLL_PAGE_LOADED } from '../../actions/pollActions' 
import { CHANGE_HEADER, RESET_HEADER } from '../../actions/actionTypes' 
import { connect } from 'react-redux';
import agent from '../../agent'

const mapStateToProps = state => ({
  poll: state.poll
})

const mapDispatchToProps = dispatch => ({
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),
  loadPoll: (payload) => dispatch({ type: POLL_PAGE_LOADED, payload }),
  unload : (payload) => dispatch({ type: RESET_HEADER })
})

class Poll extends Component {
  state = {}
  componentWillMount() {
    this.props.loadPoll(agent.Poll.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProp) {
    console.log("next prop", nextProp)
    if (nextProp.poll.question)
    nextProp.changeHeader(nextProp.poll.question)
  }

  handleChange = (e, { value }) => this.setState({ value })
  
  render() {
    const { poll } = this.props
    if (!poll.question) {
      return (
        <Dimmer active page>
          <Loader content="Bringing the poll..." indeterminate size="huge" />
        </Dimmer>
      )
    }
    return (
      <Container textAlign="center" color="purple">
        { JSON.stringify(this.props.poll) }
        <Form>
        { poll.options.map((option, i) => (
          <Form.Field key={ `field`+i }>
            <Checkbox 
              name="vote" 
              toggle 
              onChange={ this.handleChange }
              checked={ this.state.value === option.option } 
              key={ i } 
              value={ option.option } 
              label={ option.option } />
          </Form.Field>
        )) }
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
