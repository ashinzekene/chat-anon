import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import Link from "react-router-dom/Link";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import agent from "../agent";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Redirect from "react-router-dom/Redirect";

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: "",
      formValid: false,
      formLoading: false,
      password: {},
      email: {},
      username: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.createAccount = this.createAccount.bind(this)
  }
  
  createAccount(e) {
    console.log(e.target.checkValidity())
    let { username, password, email } = this.state
    if(e.target.checkValidity() && !username.invalid && !email.invalid && !password.invalid) {
      this.setState({ formLoading: true })
      let credentials = {
        username: username.value,
        email: email.value,
        password: password.value,
      }
      this.props.signUp(credentials)
      this.setState({ redirect: <Redirect push to={{
        pathname: '/profile',
        state: { from: this.props.location }
      }} /> })
    }
  }

  handleChange(e, { name, value }) {
    let invalid = !e.target.checkValidity()
    if (value.length && (name === "username" || name === "email")) {
      agent.User.verify({ [name]: value }).then(res => {
        let message = !!res.length ? `${name} already exists` : `${name} must have more than 5 characters`
        invalid = invalid || !!res.length
        this.setState({ [name]: { invalid, value, message }})
      })
    } else {
      let message = `${name} must have more than 5 characters`
      this.setState({ [name]: { invalid, value, message }})
    }
  }

  render() {
    const { username, password, email, formLoading, redirect } = this.state
    return (
      <Form loading={ formLoading } onSubmit={ this.createAccount } size="big" style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }} >Come, Join Us</h1>
          <Form.Input
            onChange={ this.handleChange }
            required minLength={5}
            error={ username.invalid }
            label="Username" name="username"
            placeholder='username'/>
          <Message size="tiny" hidden={ !username.invalid } style={ messageStyle } content={ username.message } />
          <Form.Input
            onChange={ this.handleChange }
            required minLength={5}
            error={ email.invalid }
            label="Email" name="email"
            placeholder='email' type="email" />
          <Message size="tiny" hidden={ !email.invalid } style={ messageStyle } content={ email.message } />
          <Form.Input
            onChange={ this.handleChange }
            error={ password.invalid }
            required minLength={5}
            label="Password" name="password"
            placeholder='password'
            type="password"/>
          <Message size="tiny" hidden={ !password.invalid } style={ messageStyle } content={ password.message } />
          <Form.Checkbox required label='I agree to the Terms and Conditions' />
          <Form.Button fluid size="big" type='submit' content="Let's Go"/>
          <Segment basic style={{ textAlign: "center" }}>
            <Icon name="sign in" />
            <Link to="/login">OR LOGIN</Link>
          </Segment>
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

const messageStyle = {
  padding: "5px"
}

export default Signup