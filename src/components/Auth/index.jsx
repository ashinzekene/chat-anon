import React, { Component } from "react";
import { Form, Checkbox, Button, Message } from "semantic-ui-react";
import Link from "react-router-dom/Link";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";

class Auth extends Component {
  render() {
    return (
      <Form style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h4 style={{ align: "center" }} >{'Sign Up To Vanon' }</h4>
          <Form.Field>
            <label>Username</label>
            <input placeholder='username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='password' type="password"/>
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Sign Up</Button>
          <Message style={{ textAlign: "center" }}>
            <Icon name="sign in" />
            <Link to="/login">Or Login</Link>
          </Message>
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

export default Auth