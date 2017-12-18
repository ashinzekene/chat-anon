import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea/TextArea";

class CreatePoll extends Component {
  render() {
    return (
      <Form style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Form.Field>
            <label>Question</label>
            <input placeholder='question' />
          </Form.Field>
          <Form.Field>
            <label>Comments</label>
            <TextArea placeholder='Tell us more' />
          </Form.Field>
          <Button animated='fade'>
            <Button.Content visible>
              Create Poll
            </Button.Content>
            <Button.Content hidden>
              Let's go
            </Button.Content>
          </Button>
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

export default CreatePoll