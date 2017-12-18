import React, { Component } from "react";
import { Form, Checkbox, Button, Dropdown, Label } from "semantic-ui-react";

class CreateCircle extends Component {
  render() {
    return (
      <Form style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h3>Create a Circle</h3>
          <Form.Field>
            <label>Name  of Circle</label>
            <input placeholder='username' />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='password' type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Handle</label>
            <input placeholder='handle' type="url"/>
          </Form.Field>
          <Form.Field>
            <label>Fellows</label>
            <Dropdown placeholder='Add Fellows' fluid multiple search selection options={[]} />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          { this.props.users && this.props.users.map(user => (
            <Label as='a' color='blue' image>
              <img alt="" src='/assets/images/avatar/small/veronika.jpg' />
              { user.name }
              <Label.Detail>Friend</Label.Detail>
            </Label>
          ))
          }
          <Button type='submit'>Create Circle</Button>
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