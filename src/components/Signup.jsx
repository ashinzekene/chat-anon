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
    let { username, password, email, terms } = this.state
    if(e.target.checkValidity() && !username.invalid && !email.invalid && !password.invalid && terms) {
      this.setState({ formLoading: true })
      let credentials = {
        username: username.value,
        email: email.value,
        password: password.value,
      }
      this.setState({ formLoading: true })
      this.props.signUp(credentials)
    }
  }

  handleChange(e, { name, value }) {
    let invalid = !e.target.checkValidity()
    if (value.length && (name === "username" || name === "email")) {
      // Set value before asyc call so it does not reset ater the call is made
      this.setState({ [name]: value})
      agent.User.verify({ [name]: value }).then(res => {
        let message = !!res.length ? `${name} already exists` : `${name} must have more than 5 characters`
        invalid = invalid || !!res.length
        this.setState({ [name]: { invalid, message }})
      })
    } else {
      let message = `${name} must have more than 5 characters`
      this.setState({ [name]: { invalid, value, message }})
    }
  }

  render() {
    const { username, password, email, formLoading, redirect, terms } = this.state
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
          <Message className="form-message" size="tiny" hidden={ !username.invalid } content={ username.message } />
          <Form.Input
            onChange={ this.handleChange }
            required minLength={5}
            error={ email.invalid }
            label="Email" name="email"
            placeholder='email' type="email" />
          <Message className="form-message" size="tiny" hidden={ !email.invalid } content={ email.message } />
          <Form.Input
            onChange={ this.handleChange }
            error={ password.invalid }
            required minLength={5}
            label="Password" name="password"
            placeholder='password'
            type="password"/>
          <Message className="form-message" size="tiny" hidden={ !password.invalid } content={ password.message } />
          <Form.Checkbox required name="terms" onChange={ (e, { checked }) => this.setState({ terms: checked }) } label='I agree to the Terms and Conditions' />
          <Message className="form-message" size="tiny" hidden={ terms || !(!email.invalid && !username.invalid && !password.invalid) } content="Hey, accept our terms and conditions" />
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

export default Signup