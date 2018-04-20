import React, { Component } from "react";
import { Form, Label, Icon } from "semantic-ui-react";
import { APP_NAME } from "../../actions";
import agent from "../../agent"
import AddFellows from './AddFellows'
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";

class CreateCircle extends Component {
  constructor(props) {
    super(props)
    this.state ={
      redirect: "",
      availableUsers: [],
      users: [],
      loading: false,
      name: {},
      handle: {},
      description: {},
      fellows: [],
      addedUsers: []
    }
  }
  componentDidMount() {
    this.props.changeHeader({ title: APP_NAME, back: true })
  }
  
  handleChange = (e, { name, value, options }) => {
    if (name === "handle") {
      this.setState({ [name] : { invalid: !e.target.checkValidity(), value: value }})
      return
    }
    this.setState({ [name] : { invalid: !e.target.checkValidity(), value }})
  }

  handleSearchChange = (e, { value }) => {
    value.length > 2 && agent.User.search(value).then(users => {
      let iUsers = users.map(user => ({
        value: user._id,
        name: user.first_name| user._id,
        text: user.username
      }))
      this.setState({ availableUsers: iUsers })
    })
  }

  removeFellow = i => {
    return () => {
      this.setState(prevState => ({
        users: prevState.users.filter((user, ind) => ind !== i)
      }))
    }
  }

  userChange = user => (e, { checked }) => {
    if (checked) {
      this.setState(prevState => ({ fellows: [ user, ...prevState.fellows] }))
    } else {
      this.setState(prevState => ({ fellows: prevState.fellows.filter(({ text }) => text !== user.text ) }))
    }
  }
  
  onSubmit = e => {
    let { name, description, fellows, handle  } = this.state
    if (e.target.checkValidity() && fellows) {
      let result = {
        name: name.value,
        description: description.value,
        fellows: fellows.map(({ text }) => text),
        handle: handle.value
      }
      this.setState({ loading: true })
      this.props.createCircle(result)
    }
  }

  render() {
    const { name, handle, description, loading , availableUsers, redirect, fellows } = this.state
    return (
      <Form className="my-form" onSubmit={ this.onSubmit } size="big" loading={ loading }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Name  of Circle" error={ name.invalid } name="name" placeholder='Circle Name' />
          <Message className="form-message" negative size="tiny" hidden={ !name.invalid } content="Name must be more than 5 characters" />
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Handle" error={ handle.invalid } name="handle" pattern="^[a-z\d-]+$" placeholder='Handle' />
          <Message className="form-message" negative size="tiny" hidden={ !handle.invalid } content="Handle must be more than 5 characters and can only contain a-z, and -" />
          <Form.TextArea required onChange={ this.handleChange } minLength="5" label="Description" error={ description.invalid } name="description" placeholder='Description'/>
          <Message className="form-message" negative size="tiny" hidden={ !description.invalid } content="Description must be more than 5 characters" />
          <Form.Input
            label="Add Fellows"
            fluid multiple required
            onChange={ this.handleSearchChange }
          />
          <AddFellows users={ availableUsers } fellows={ fellows } onChange={ this.userChange }/>
          <Form.Button fluid size="big" type='submit'>Create Circle</Form.Button>
        </div>
        { redirect }
      </Form>
    )
  }
}

export default CreateCircle