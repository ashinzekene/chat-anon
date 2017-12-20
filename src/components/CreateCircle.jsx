import React, { Component } from "react";
import { Form, Label, Icon } from "semantic-ui-react";
import { APP_NAME } from "../constants";
import agent from "../agent"
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import Redirect from "react-router-dom/Redirect";

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
      fellows: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }
  componentDidMount() {
    this.props.changeHeader({ title: APP_NAME, back: true })
  }
  handleChange(e, { name, value, options }) {
    if (name === "fellows") {
      let username = options.find(option => option.value === value[value.length-1]).text
      this.setState(({ users }) => users.push(username))
      this.setState({ [name] : { value }})
      console.log(this.state)
      return
    }
    if (name === "handle") {
      this.setState({ [name] : { invalid: !e.target.checkValidity(), value: value }})
      return
    }
    this.setState({ [name] : { invalid: !e.target.checkValidity(), value }})
  }
  handleSearchChange(e, { searchQuery }) {
    console.log("Getting users --", searchQuery)
    searchQuery.length > 2 && agent.User.search(searchQuery).then(users => {
      let iUsers = users.map(user => ({
        value: user._id,
        name: user.first_name| user._id,
        text: `@${user.username}`
      }))
      this.setState({ availableUsers: iUsers })
    })
    return
  }
  
  onSubmit(e) {
    console.log(e.target.checkValidity())
    if (e.target.checkValidity()) {
      let { name, description, fellows, handle  } = this.state
      let result = {
        name: name.value,
        description: description.value,
        fellows: fellows.value,
        handle: handle.value
      }
      console.log(result)
      this.setState({ loading: true })
      this.props.createCircle(result)
      this.setState({ redirect: <Redirect push  to={{
        pathname: '/circles',
        state: { from: this.props.location }
      }} /> })
    }
  }

  render() {
    const { name, handle, description, loading, users , availableUsers, redirect } = this.state
    return (
      <Form onSubmit={ this.onSubmit } size="big" loading={ loading } style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Name  of Circle" error={ name.invalid } name="name" placeholder='Circle Name' />
          <Message negative size="tiny" style={{ padding: "5px" }} hidden={ !name.invalid } content="Name must be more than 5 characters" />
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Handle" error={ handle.invalid } name="handle" pattern="^[\w\d-]+$" placeholder='handle' />
          <Message negative size="tiny" style={{ padding: "5px" }} hidden={ !handle.invalid } content="Handle must be more than 5 characters and can only contain a-z, A-Z and -" />
          <Form.TextArea required onChange={ this.handleChange } minLength="5" label="Description" error={ description.invalid } name="description" placeholder='description'/>
          <Message negative size="tiny" style={{ padding: "5px" }} hidden={ !description.invalid } content="Description must be more than 5 characters" />
          <Form.Dropdown
            noResultsMessage="Type in a username to add"
            onChange={ this.handleChange }
            fluid multiple
            onSearchChange={ this.handleSearchChange }
            label="Fellows" name="fellows"
            placeholder="Add Fellows"
            search selection options={ availableUsers } />
            <div style={{ padding: "10px 0px"}}>
            { users.map((user, i) => (
              <Label key={i} as='a' color='blue' image>
                <img key={"img"+i } alt="" src='/assets/images/avatar/small/veronika.jpg' />
                { `@${user}` }
                <Label.Detail key={"det"+i }>fellow <Icon name='delete' /></Label.Detail>
              </Label>
              ))
            }
            </div>
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button fluid size="big" type='submit'>Create Circle</Form.Button>
        </div>
        { redirect }
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

export default CreateCircle