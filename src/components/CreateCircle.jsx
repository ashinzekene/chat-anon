import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import { APP_NAME } from "../constants";
import agent from "../agent"

class CreateCircle extends Component {
  constructor(props) {
    super(props)
    this.state ={
      availableUsers: [],
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
  handleChange(e, { name, value }) {
    if (name === "fellows") {
      this.setState({ [name] : { value }})
      return
    }
    this.setState({ [name] : { invalid: !e.target.checkValidity(), value }})
    console.log(this.state)    
  }
  handleSearchChange(e, { searchQuery }) {
    console.log("Getting users --", searchQuery)
    searchQuery.length > 2 && agent.User.search(searchQuery).then(users => {
      let iUsers = users.map(user => ({
        value: user._id,
        name: user.first_name| user._id,
        text: user.username
      }))
      this.setState({ availableUsers: iUsers })
    })
    return
  }
  
  onSubmit(e) {
    console.log(e.target.checkValidity())
    if (e.target.checkValidity()) {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ loading: false }), 1000)
    }
  }

  render() {
    const { name, handle, description, loading, fellows , availableUsers } = this.state
    return (
      <Form onSubmit={ this.onSubmit } size="big" loading={ loading } style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Name  of Circle" error={ name.invalid } name="name" placeholder='Circle Name' />
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Handle" error={ handle.invalid } name="handle" placeholder='handle' />
          <Form.TextArea required onChange={ this.handleChange } minLength="5" label="Description" error={ description.invalid } name="description" placeholder='description'/>
          <Form.Dropdown
            noResultsMessage="User of found"
            onChange={ this.handleChange }
            required fluid multiple
            onSearchChange={ this.handleSearchChange }
            label="Fellows" name="fellows"
            placeholder="Add Fellows"
            search selection options={ availableUsers } />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          { fellows.value && fellows.value.map((user, i) => (
            <Label key={i} as='a' color='blue' image>
              <img key={"img"+i } alt="" src='/assets/images/avatar/small/veronika.jpg' />
              { user }
              <Label.Detail key={"det"+i }>fellow</Label.Detail>
            </Label>
          ))
          }
          <Form.Button fluid size="big" type='submit'>Create Circle</Form.Button>
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

export default CreateCircle