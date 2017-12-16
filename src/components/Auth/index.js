import React, { Component } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";

class Auth extends Component {
  render() {
    return (
      <Form style={{ padding: "40px" }}>
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
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default Auth