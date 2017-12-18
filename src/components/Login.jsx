import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import Link from "react-router-dom/Link";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Redirect from "react-router-dom/Redirect";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
      redirect: "",
    }
  }
  
  onChange = (e, { name, value }) => {
    this.setState({ usernameError: false, passwordError: false })
    this.setState({ [name]: value })
  }
  
  login = () => {
    let { username, password } = this.state
    if (username.length < 4) {
      this.setState({ usernameError: true })
      return
    }
    if (password.length < 4) {
      this.setState({ passwordError: true })
      return
    }
    console.log("Logging...")
    this.props.onLogin({ username, password })
    this.setState({ redirect: <Redirect  to={{
      pathname: '/',
      state: { from: this.props.location }
    }} /> })
  }

  render() {
    let { usernameError, passwordError, redirect } = this.state
    return (
      <Form onSubmit={ this.login } size="big" style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }} >Welcome Back</h1>
          <Form.Input onChange={ this.onChange } error={ usernameError } name="username" label="Username" placeholder='username' />
          <Form.Input onChange={ this.onChange } error={ passwordError } name="password" label="Password" placeholder='password' type="password"/>
          <Form.Button size="big" fluid type='submit'>Get Back In</Form.Button>
          <Message style={{ textAlign: "center" }}>
            <Icon name="signup" />
            <Link to="/signup">Or Sign Up</Link>
          </Message>
          { redirect }
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

export default Login