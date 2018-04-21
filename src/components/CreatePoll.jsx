import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import { connect } from "react-redux";
import { CIRCLES_REQUESTED, POLL_CREATED, APP_NAME } from "../actions";
import agent from "../agent";

const mapStateToProps = state => ({
  circles: state.circles
})

const mapDispatchToProps = dispatch => ({
  getCircles: payload => dispatch({ type: CIRCLES_REQUESTED, payload }),
  createPoll: payload => dispatch({ type: POLL_CREATED, payload })
})

class CreatePoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formLoading: false,
      question: { value: "" },
      comment: { value: "" },
      option: { value: "" },
      circle: { value: "" },
      options: [
        { value: "" },
        { value: "" }
      ],
      circles: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.removeOption = this.removeOption.bind(this)
    this.addOption = this.addOption.bind(this)
  }

  componentDidMount() {
    this.props.getCircles(agent.Circle.getAll())
    this.props.changeHeader({ title: APP_NAME, back: true })
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: { value, invalid: !e.target.checkValidity() } })
  }

  handleOptionChange(e, { index, value }) {
    let invalid =  !e.target.checkValidity()
    this.setState((prevState) => ({ options: prevState.options.map((val, i) => i === index ? { value, invalid } : val )}))
  }

  removeOption(e, { index }) {
    e.preventDefault()
    if (this.state.options.length > 2)
    this.setState(prevState => ({ options: prevState.options.filter((val, i) => i !== index) }))
  }
  
  addOption(e) {
    e.preventDefault()
    if (this.state.options.length < 4)
    this.setState(prevState => ({ options: [ ...prevState.options, { value: "" }] }))
  }

  handleSubmit(e) {
    let { question, comment, options, circle } = this.state
    if (e.target.checkValidity()) {
      this.setState({ formLoading: true })
      let poll = {
        question: question.value,
        comment: comment.value,
        circle: circle.value,
        options: options.map(option => option.value)
      }
      this.props.createPoll(agent.Poll.create(poll))
    }
  }

  render() {
    let { question, comment, options, circle, formLoading } = this.state
    let { circles } = this.props
    return (
      <Form className="my-form" onSubmit={this.handleSubmit} loading={ formLoading } size="big">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Poll</h1>
          <Form.Input
            label="Question" value={question.value}
            required onChange={this.handleChange}
            minLength={5} error={question.invalid}
            name="question" placeholder='Question' />
          <Message className="form-message" hidden={!question.invalid} content="Question should have more than 5 characters" negative size="tiny" />
          <Form.TextArea
            label="Comments" value={comment.value}
            required onChange={this.handleChange}
            minLength={5} error={comment.invalid}
            name="comment" placeholder='Tell us more' />
          <Message className="form-message" hidden={!comment.invalid} content="Comment should have more than 5 characters" negative size="tiny" />
          <Form.Field
            control="select"
            required name="circle"
            label="Circle"
            onChange={ (e) => this.setState({ circle : { value: e.target.value, invalid: !e.target.checkValidity() } })}
            error={ circle.invalid }
            placeholder='Which of your circles' >
              <option value="">Pick a Circle</option>
            { 
              circles && circles.map((circle, i) => (
                <option key={`circle-${i}`} value={ circle._id }>{ circle.name }</option>
              ))
            }
          </Form.Field>
          <Button floated="right" onClick={ this.addOption } content="Add Option" />
          { options.map((option, i) => (
            <div key={`div-${i}`}>
              <Form.Input
                action={{ index: i, onClick: this.removeOption, icon: 'cancel'}}
                key={ `option ${i}` }
                index={ i }
                label={`Option ${i+1}`} value={option.value}
                required onChange={this.handleOptionChange}
                minLength={3} error={option.invalid}
                name="option" placeholder='Enter your options' />
              < Message className="form-message" hidden={!option.invalid} content="more than 3 characters please" negative size="tiny" />
            </div>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll)