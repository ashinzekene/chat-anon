import React, { Component } from "react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";
import agent from "../agent";
import Message from "semantic-ui-react/dist/commonjs/collections/Message/Message";
import { connect } from "react-redux";
import { EDIT_PROFILE } from "../actions/index";

const mapStateToProps = state => ({
  user: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  editProfile: payload => dispatch({ type: EDIT_PROFILE, payload })
})

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state= {
      formLoading: false,
      username: { value: "" },
      first_name: { value: "" },
      last_name: { value: "" },
      gender: { value: "" },
      theme: { value: "" },
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      let { username, first_name, last_name, gender, theme } = nextProps.user
      this.setState({
        username: username ? { value: username }  : { value: "" },
        first_name: first_name ? { value: first_name }  : { value: "" },
        last_name: last_name ? { value: last_name }  : { value: "" },
        gender: gender ? { value: gender }  : { value: "" },
        theme: theme ? { value: theme }  : { value: "" },
      })
    }
  }
  handleChange = (e, { name, value })  => {
    if (name === "username" && !!value.length) {
      // e.target.checkValidity does not work async hence let us store the value
      let invalid = !e.target.checkValidity()

      // Set value before asyc call so it does not reset ater the call is made
      this.setState({ [name]: value})
      agent.User.verify({ [name]: value }).then(res => {

        // Sets the error message depending on the response from server
        let message = !!res.length ? `${name} already exists` : `${name} must have more than 5 characters`

        // Field in invalid if username exits (!!res.length) or normally (e.target.checkValidity)
        invalid = invalid || !!res.length
        this.setState({ [name]: { invalid, value, message }})
      })
    } else {
      let message = `${name.replace("_", " ")} must have more than 5 characters`
      this.setState({ [name]: { value, message, invalid: e.target.checkValidity && !e.target.checkValidity() } })
    }
  }

  editProfile = (e, f) => {
    let { username, first_name, last_name, gender, theme } = this.state
    let user = {
      username : username.value,
      first_name : first_name.value,
      last_name : last_name.value,
      gender : gender.value,
      theme : theme.value,
    }
    if (e.target.checkValidity()) {
      console.log(user)
      this.setState({ formLoading: true })
      this.props.editProfile(agent.User.editProfile(user))
    } else {
      console.log("Form not valid")
    }
  }
  
  render() {
    let {username, first_name, last_name, theme, gender, formLoading } = this.state
    return (
      <Form onSubmit={ this.editProfile } loading={formLoading} className="my-form" style={{ padding: "20px" }} size="huge">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h2 style={{ textAlign: "center" }}>Edit Your Profile</h2>
          <Form.Input error={ username.invalid } onChange={ this.handleChange } required pattern="^[a-z\d-]+$" minLength={5} name="username" value={ username.value } label="Username" />
          <Message className="form-message" size="tiny" hidden={ !username.invalid } content={ username.message } />
          <Form.Input error={ first_name.invalid } onChange={ this.handleChange } minLength={5} name="first_name" value={ first_name.value } label="First Name" />
          <Message className="form-message" size="tiny" hidden={ !first_name.invalid } content={ first_name.message } />
          <Form.Input error={ last_name.invalid } onChange={ this.handleChange } minLength={5} name="last_name" value={ last_name.value } label="Last Name" />
          <Message className="form-message" size="tiny" hidden={ !last_name.invalid } content={ last_name.message } />
          <Form.Select error={ gender.invalid } onChange={ this.handleChange } name="gender" value={ gender.value} label="Gender" options={genderOptions} />
          <Form.Select error={ theme.invalid } onChange={ this.handleChange } name="theme" value={ theme.value } label="Theme Color" options={colorOptions} />
          <Form.Button content="Edit Profile"/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings)