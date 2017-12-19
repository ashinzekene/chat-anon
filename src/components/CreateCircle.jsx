import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import { APP_NAME } from "../constants";

class CreateCircle extends Component {
  constructor(props) {
    super(props)
    this.state ={
      loading: false,
      name: {},
      handle: {},
      description: {},
      fellows: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    this.props.changeHeader({ title: APP_NAME, back: true })
  }
  handleChange(e, { name, value }) {
    if (name === "fellows") {
      this.setState({ [name] : { value: value, invalid: !e.target.checkValidity()}})
      return
    }
    this.setState({ [name] : { value: value, invalid: !e.target.checkValidity()}})
  }

  onSubmit(e) {
    console.log(e.target.checkValidity())
    if (e.target.checkValidity()) {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ loading: false }), 1000)
    }
  }

  render() {
    const { name, handle, description, fellows, loading } = this.state
    return (
      <Form onSubmit={ this.onSubmit } size="big" loading={ loading } style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Name  of Circle" error={ name.invalid } name="name" placeholder='Circle Name' />
          <Form.Input required onChange={ this.handleChange } minLength="5" label="Handle" error={ handle.invalid } name="handle" placeholder='handle' />
          <Form.TextArea required onChange={ this.handleChange } minLength="5" label="Description" error={ description.invalid } name="description" placeholder='description'/>
          <Form.Dropdown required onChange={ this.handleChange } label="Fellows" error={ fellows.invalid } name="fellows" placeholder='Add Fellows' fluid multiple search selection options={[]} />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          { this.props.users && this.props.users.map(user => (
            <Label as='a' color='blue' image>
              <img alt="" src='/assets/images/avatar/small/veronika.jpg' />
              { user.name }
              <Label.Detail>Friend</Label.Detail>
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