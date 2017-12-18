import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import Link from "react-router-dom/Link";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import agent from "../agent";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formLoading: false,
      emailInvalid: false,
      usernameInvalid: false,
      errorMessage: "",
    }
  }
  
  createAccount = () => {
    if (this.formValid()) {
      this.setState({ formLoading: true })
      setTimeout(() => this.setState({ formLoading: false }), 2000)
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.setState({ errorMessage: "" })    
    if (value.length && name === "username") {
      agent.User.verifyUsername({ username: value }).then(res => {
        this.setState({ usernameInvalid: !!res.length })
        console.log(res)
      })
    }
    if (value.length && name === "email") {
      agent.User.verifyMail({ email: value }).then(res => {
        this.setState({ emailInvalid: !!res.length })
        console.log(res)
      })
    }
  }

  formValid() {
    let { 
      username,
      usernameInvalid,
      emailInvalid,
      email,
      password
    } = this.state
    console.log(username, email, password)
    if (usernameInvalid || emailInvalid){
      return false
    }
    if (username.length < 6) {
      this.setState({ errorMessage: "Username should have at least 5 characters" })
      return false
    }
    if (password.length < 6) {
      this.setState({ errorMessage: "Password should have at least 5 characters" })
      return false
    }
    if (email.length < 6) {
      this.setState({ errorMessage: "I don't think that email exists" })
      return false
    }
    return true
  }
  
  render() {
    const { formLoading, emailInvalid, usernameInvalid, errorMessage } = this.state
    return (
      <Form loading={ formLoading } onSubmit={ this.createAccount } size="big" style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }} >Come, Join Us</h1>
          <Form.Input
            onChange={ this.handleChange }
            required
            error={ usernameInvalid }
            label="Username"
            name="username"
            placeholder='username'/>
          <Form.Input
            onChange={ this.handleChange }
            required
            error={ emailInvalid }
            label="Email"
            name="email"
            placeholder='email'type="email" />
          <Form.Input
            onChange={ this.handleChange }
            required
            label="Password"
            name="password"
            placeholder='password'type="password"/>
          { errorMessage && <Message size="mini" negative content={ errorMessage } /> }
          <Form.Checkbox required label='I agree to the Terms and Conditions' />
          <Form.Button fluid disabled={ emailInvalid || usernameInvalid} size="big" type='submit' content="Let's Go"/>
          <Segment basic style={{ textAlign: "center" }}>
            <Icon name="sign in" />
            <Link to="/login">OR LOGIN</Link>
          </Segment>
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

export default Signup