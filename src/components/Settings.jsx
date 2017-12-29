import React, { Component } from "react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state= {
      formLoading: false,
      username: {},
      first_name: {},
      last_name: {},
      gender: {},
      theme: {},
    }
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: { isValid: e.checkValidity(), value } })
  }
  render() {
    let {username, first_name, last_name, theme, gender, formLoading } = this.state
    return (
      <Form loading={formLoading} className="my-form" style={{ padding: "20px" }} size="huge">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h2 style={{ textAlign: "center" }}>Edit Your Profile</h2>
          <Form.Input error={ !username.isValid } name="username" value={ username.value } label="Username" />
          <Form.Input error={ !first_name.isValid } name="first_name" value={ first_name.value } label="First Name" />
          <Form.Input error={ !last_name.isValid } name="last_name" value={ last_name.value } label="Last Name" />
          <Form.Select error={ !gender.isValid } name="gender" value={ gender.value} label="Gender" options={genderOptions} />
          <Form.Select error={ !theme.isValid } name="theme" value={ theme.value } label="Theme Color" options={colorOptions} />
        </div>
      </Form>
    )
  }
}

const genderOptions = [
  { text: "Male", value: "male", name: "Male"},
  { text: "Female", value: "female", name: "Female"},
  { text: "Others", value: "others", name: "Others"},
]

const colorOptions = [
  { text: 'Default', value: 'default', name: 'default' },
  { text: 'Red', value: 'red', name: 'red' },
  { text: 'Orange', value: 'orange', name: 'orange' },
  { text: 'Yellow', value: 'yellow', name: 'yellow' },
  { text: 'Olive', value: 'olive', name: 'olive' },
  { text: 'Green', value: 'green', name: 'green' },
  { text: 'Teal', value: 'teal', name: 'teal' },
  { text: 'Blue', value: 'blue', name: 'blue' },
  { text: 'Violet', value: 'violet', name: 'violet' },
  { text: 'Purple', value: 'purple', name: 'purple' },
  { text: 'Pink', value: 'pink', name: 'pink' },
  { text: 'Brown', value: 'brown', name: 'brown' },
  { text: 'Grey', value: 'grey', name: 'grey' },
  { text: 'Black', value: 'black', name: 'black' },
]
export default Settings