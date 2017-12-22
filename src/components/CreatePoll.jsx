import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { APP_NAME } from "../constants";
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import { connect } from "react-redux";
import { MY_CIRCLES_REQUESTED } from "../actions";
import agent from "../agent";
import { POLL_CREATED } from "../actions";

const mapStateToProps = state => ({
  circles: state.circles
})

const mapDispatchToProps = dispatch => ({
  getCircles: payload => dispatch({ type: MY_CIRCLES_REQUESTED, payload }),
  createPoll: payload => dispatch({ type: POLL_CREATED, payload })
})

class CreatePoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: { value: "" },
      comment: { value: "" },
      option : { value: "" },
      circle : { value: "" },
      circles : [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCircles(agent.Circle._getAll())
    this.props.changeHeader({ title: APP_NAME, back: true })
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.circles.length !== this.props.circles.length) {
      let circles = nextProp.circles.map(circle => ({
        name: circle.handle,
        text: circle.name,
        value: circle._id,
      }))
      this.setState({ circles })
    }
  }
  
  handleChange(e, { name, value }) {
    name === "circle" ?
    this.setState({ [name]: { value } }) :
    this.setState({ [name]: { value, invalid: !e.target.checkValidity() } })
  }

  handleSubmit(e) {
    let { question, comment, option, circle } = this.state
    if (e.target.checkValidity()) {
      this.setState({ formLoading: true })
      let poll = {
        question: question.value,
        comment: comment.value,
        option: option.value,
        circle: circle.value,
      }
      console.log(poll)
      setTimeout(() => this.setState({ formLoading: true }), 1000)
      // this.props.createPoll(agent.Poll.create(poll))
    }
  }

  render() {
    let { question, comment, option, circle, circles } = this.state
    return (
      <Form onSubmit={ this.handleSubmit } size="big" style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Poll</h1>
          <Form.Input
            label="Question" value={ question.value }
            required onChange={ this.handleChange }
            minLength={ 5 } error={ question.invalid }
            name="question" placeholder='Question' />
          <Message className="form-message" hidden={ !question.invalid } content="Question should have more than 5 characters" negative size="tiny" />
          <Form.TextArea
            label="Comments" value={ comment.value }
            required onChange={ this.handleChange }
            minLength={ 5 } error={ comment.invalid }
            name="comment" placeholder='Tell us more' />
          <Message className="form-message" hidden={ !comment.invalid } content="Comment should have more than 5 characters" negative size="tiny" />
          <Form.Dropdown
            label="Circle" value={ circle.value }
            onChange={ this.handleChange }
            selection search
            noResultsMessage="you are not in any circle"
            options={ circles || [] } name="circle"
            placeholder='Which of your circles' />
          <Form.Input
            label="Option" value={ option.value }
            required onChange={ this.handleChange }
            minLength={ 5 } error={ option.invalid }
            name="option" placeholder='Which of your circles' />
          <Message className="form-message" hidden={ !option.invalid } content="Option should have more than 5 characters" negative size="tiny" />
          <Button fluid size="big" animated='fade'>
            <Button.Content visible>
              Create Poll
            </Button.Content>
            <Button.Content hidden>
              Let's go
            </Button.Content>
          </Button>
        </div>
      </Form>
    )
  }
}

const formStyle = {
  padding: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifyItems:"center",
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll)